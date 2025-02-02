import React, { useState, useEffect } from "react";

import { Document, Page, pdfjs } from 'react-pdf';
import VuiBox from "components/VuiBox";
import Grid from "@mui/material/Grid";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Sidenav from "./Sidenav/index"
import routesSidenavPeserta from "./Sidenav/routes"

// import DocumentChecklist from "./component/DocumentChecklist";
import DocumentChecklist from "./component/DocumentChecklist"
import DocumentAsesi from "./component/DocumentAsesi";

import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import Card from "components/Card";
import {
  Card, LinearProgress, Stack, CardContent,
  Button,
  Typography, CircularProgress,
} from "@mui/material";
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";

import FileCard from "layouts/ScreenAsesor/fileCard";
import { asesorPostMUK, getAllMUKList } from "store/action/asesorAction";
import {getFileAsesi, asesiPostFile, downloadFileAsesi} from "store/action/pesertaAction"
import { logOut } from "../../store/action/userAction";

// Atur workerSrc untuk pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// loader
import Lottie from "react-lottie";
import * as loaderData from "../../assets/loader/lottieLego.json"

import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

import logoUpn from "../../assets/images/LOGO UPNVJ.png"


function UnggahDokumen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState(null);

  const dataAsesor = useSelector((state) => state.userReducers.asesorData)
   const dataUser = useSelector((state) => state.userReducers.dataPribadi) || {};
  const userLogin = useSelector((state) => state.userReducers.userLogin);
  const statusPost = useSelector((state) => state.asesorReducers.postMUK)
  const errorPost = useSelector((state) => state.asesorReducers.errorPostMUK)
  const listMUK = useSelector((state) => state.asesorReducers.listMUK)

  const [controller] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const [loading, setLoading] = useState(true); // State to manage loading status


  const [formData, setFormData] = useState({
    // namaSkema: "",
    file: "",
    dokumen: "",
  });

  const [aliasFileName, setAlias] = useState({
    name:""
  })

  useEffect(() => {
    if (dataUser?.SkemaUjikom?.namaSkema) {
      setFormData((prev) => ({ ...prev, namaSkema: dataUser.SkemaUjikom.namaSkema }));
      // dispatch(getFileAsesi({ access_token: userLogin.access_token, namaSkema: dataUser.SkemaUjikom.namaSkema }))
    }
    setLoading(false);
  }, [dataUser, userLogin])

  // loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (2000ms)
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, []);

  useEffect(() => {
    if (statusPost !== "") {
      alert("File uploaded successfully!");
    } if (errorPost !== "") {
      setError("Failed to upload the file. Please try again.")
    }
  }, [statusPost, errorPost])

  const signOut = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/");
  };
  const backToHome = () => {
    history.push('/dashboard')
  }
  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
    if (file) {
      setSelectedFile(file);
      setError(null);
      if (file.type === "application/pdf") {
        setFilePreview(URL.createObjectURL(file));
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword"
      ) {
        setFilePreview(null);
      } else {
        setError("Only PDF or Word documents are supported.");
        setSelectedFile(null);
      }
    }
  };


  // Handle file upload
  const handleFileUpload = () => {
    if (!selectedFile) {
      setError("Harap mengunggah file sebelum melanjutkan.");
      return;
    }
    if (!formData.dokumen) {
      setError("Harap memilih nama dokumen sebelum mengunggah.");
      return;
    }
  
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("dokumen", formData.dokumen);
  
    setError(null); // Reset error sebelum memulai upload
    dispatch(asesiPostFile({ access_token: userLogin.access_token, formData: data }))
    history.push('/')
  };



  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // lotie loader
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  if (loading) {
    return (
      <DashboardLayout>
        <Grid>
          <VuiBox>
            <Lottie options={defaultOptions} />
          </VuiBox>
        </Grid>
      </DashboardLayout>
    );
  }

  const handleSelectChange = (value) => {
    console.log(value,'tes')
    setFormData({ ...formData, dokumen: value })
  }

    const handleDownload = (item) => {
      // console.log(item)
      dispatch(downloadFileAsesi({ access_token: userLogin.access_token, item }))
  
    }
  if (!dataUser?.SkemaUjikom?.namaSkema) {
    return (
      <DashboardLayout>
        < Grid container style={{ minHeight: "100vh" }}  >
          <Grid
            item
            xs={2}
            style={{
              // backgroundColor: "#1A2035",
              // color: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Sidenav color={sidenavColor}
              brand=""
              brandName="LSP UPNVJ"
              routes={routesSidenavPeserta}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave} />
          </Grid>
          <Grid item xs={10} style={{ padding: "20px" }}>
            <DashboardNavbar userLogin={userLogin} signOut={signOut} backToHome={backToHome} />
            <VuiTypography variant="h5" color="error">
              Anda belum terdaftar pada skema ujikom tertentu.
            </VuiTypography>
          </Grid>
        </Grid>
      </DashboardLayout>
    );
  }




  return (
    <Grid container style={{ minHeight: "100vh" }}  >
      <Grid
        item
        xs={2}
        style={{
          // backgroundColor: "#1A2035",
          // color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Sidenav color={sidenavColor}
          brand=""
          brandName="LSP UPNVJ"
          routes={routesSidenavPeserta}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave} />
      </Grid>
      {/* <VuiBox py={3}>
       */}
      <Grid item xs={10} style={{ padding: "20px" }}>
        <DashboardNavbar userLogin={userLogin} signOut={signOut} backToHome={backToHome} />

        <Card>

          <VuiBox display="flex" alignItems="center" mb="32px">
            <img
              alt="Logo LSP UPN Veteran Jakarta"
              style={{ width: '50px', height: '50px', marginRight: '16px' }}
              src={logoUpn}
            />
            <VuiTypography variant="h4" color="white" fontWeight="bold">
              Lembaga Sertifikasi Profesi UPN Veteran Jakarta
            </VuiTypography>

          </VuiBox>

          <VuiTypography color="text" variant="button" fontWeight="bold" mb="5px">
            {!dataUser?.SkemaUjikom?.namaSkema
              ? "Anda Belum Terdaftar pada Skema Ujikom Tertentu"
              : `Materi Uji Kompetensi: Skema Uji Kompetensi ${dataUser.SkemaUjikom.namaSkema}`}
          </VuiTypography>

          <VuiBox px={3} py={2}>
           
            <DocumentAsesi participant={dataUser} handleDownload={handleDownload}/>

            <VuiTypography variant="h4" color="white" fontWeight="bold">
              Upload Dokumen MUK
            </VuiTypography>
            <VuiBox mt={2}>
              <VuiInput
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              {error && (
                <VuiTypography color="error" fontWeight="medium" mt={2}>
                  {error}
                </VuiTypography>
              )}
            </VuiBox>

            <VuiBox display="flex" alignItems="center" mb={2}>
              <div class="flex items-center space-x-4 mr-4 " >
                {/* Label */}
                <VuiTypography
                  component="label"
                  variant="button"
                  color="white"
                  fontWeight="medium"
                  mr={4}
                >
                  Nama Dokumen :
                </VuiTypography>

                {/* Dropdown */}
                <Select
                  name="namaDokumen"
                  fullWidth
                  sx={{
                    background: "rgba(0, 0, 50, 0.8)", // Warna latar gelap
                    color: "white", // Warna teks putih
                    borderRadius: "8px", // Sudut membulat
                    border: "1px solid rgba(255, 255, 255, 0.3)", // Garis pembatas lembut
                    padding: "10px", // Spasi dalam
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Menghilangkan outline default
                    },
                    "& .MuiSvgIcon-root": {
                      color: "white", // Warna ikon dropdown
                    },
                    "&:hover": {
                      background: "rgba(0, 0, 50, 0.9)", // Warna saat hover
                    },
                  }}
                  displayEmpty
                  defaultValue=""
                  onChange={(e) => handleSelectChange(e.target.value)}
                >
                  <MenuItem value="" disabled>
                    <VuiTypography color="text" variant="caption">
                      Pilih Dokumen yang akan di Upload
                    </VuiTypography>
                  </MenuItem>

                  {/* Options */}

                  <MenuItem disabled>A. Pelaksanaan Asesmen</MenuItem>
                  <MenuItem value="apl01">
                    FR.APL-01 Permohonan Sertifikasi Kompetensi
                  </MenuItem>
                  <MenuItem value="apl02">FR.APL-02 Asesmen Mandiri</MenuItem>
                  <MenuItem value="portofolioAsesi">Portofolio Peserta</MenuItem>
                  <MenuItem value="mapa01">FR. MAPA.01 Merencanakan Aktivitas dan Proses Asesmen</MenuItem>
                  {/* <MenuItem value="frak01">SKEMA Sertifikasi + Standar Kompetensi Kerja</MenuItem> */}
                  <MenuItem value="mapa02">FR. MAPA.02-Peta Instrumen Asesmen Hasil Pendekatan Asesmen dan Perencanaan Asesmen</MenuItem>
                  <MenuItem value="frak01">FR.AK.01 Persetujuan Asesmen dan Kerahasiaan</MenuItem>
                  <MenuItem value="frak04">FR.AK.04 Banding Asesmen</MenuItem>
                  <MenuItem disabled>B. PERANGKAT ASESMEN</MenuItem>
                  <MenuItem value="fria01">FR.IA.01 Ceklis Observasi Aktivitas di Tempat Kerja atau Tempat Kerja Simulasi</MenuItem>
                  <MenuItem value="fria02">FR.IA.02 Tugas Praktik Demonstrasi</MenuItem>
                  <MenuItem value="fria03">FR.IA.03 Pertanyaan untuk Mendukung Observasi</MenuItem>
                  <MenuItem value="fria04a">FR.IA.04A. Penjelasan Singkat Proyek -L-T DIT</MenuItem>
                  <MenuItem value="fria04b">FR.IA.04B. Penilaian Proyek Singkat L-T DIT</MenuItem>
                  <MenuItem value="fria05">FR.IA.05 Pertanyaan Tertulis Pilihan ganda+Kunci Jawaban dan Lembar Jawab</MenuItem>
                  <MenuItem value="fria06">
                    FR.IA.06 Pertanyaan Tertulis Esai+Kunci Jawaban dan Lembar Jawab
                  </MenuItem>
                  <MenuItem value="fria07">FR.IA.07 Pertanyaan Lisan</MenuItem>
                  <MenuItem value="fria08">FR.IA.08 Ceklis Verifikasi Portofolio</MenuItem>

                  <MenuItem value="fria09">FR.IA.09 Pertanyaan Wawancara</MenuItem>
                  <MenuItem value="fria10">FR.IA.10 Klarifikasi Bukti Pihak Ketiga</MenuItem>
                  <MenuItem value="fria11">FR.IA.11 Ceklis Meninjau Materi Uji Kompetensi</MenuItem>
                  <MenuItem disabled>C. Keputusan</MenuItem>
                  <MenuItem value="frak02">FR.AK.02 Formulir Rekaman Asesmen Kompetensi</MenuItem>
                  <MenuItem value="frak03">FR.AK.03 Umpan Balik dan Catatan Asesmen</MenuItem>
                  <MenuItem disabled>D. Laporan</MenuItem>
                  <MenuItem value="frak05">FR.AK.05 Laporan Asesmen</MenuItem>
                  <MenuItem value="frak06">FR.AK.06 Meninjau Proses Asesmen</MenuItem>

                </Select>
              </div>
            </VuiBox>

            <VuiBox mt={2}>
              <VuiButton variant="contained" color="info" onClick={handleFileUpload}>
                Upload File
              </VuiButton>
            </VuiBox>

          </VuiBox>
        </Card>
      </Grid>

    </Grid>
  );
}

export default UnggahDokumen;


