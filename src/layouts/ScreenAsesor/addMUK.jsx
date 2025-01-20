import React, { useState, useEffect } from "react";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack"; // Untuk preview PDF
import { Document, Page, pdfjs } from 'react-pdf';
import VuiBox from "components/VuiBox";
import Grid from "@mui/material/Grid";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Sidenav from "../ScreenAsesor/Sidenav/index"
import routesSidenavAsesor from "../ScreenAsesor/Sidenav/routes"
import Footer from "examples/Footer";
import DocumentChecklist from "./component/DocumentChecklist";

import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Card from "components/Card";
import {
  Card, LinearProgress, Stack, CardContent,
  Button,
  Typography, CircularProgress,
} from "@mui/material";
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";
import FileCard from "./fileCard"
import { asesorPostMUK, getAllMUKList } from "store/action/asesorAction";
import { logOut } from "../../store/action/userAction";

// Atur workerSrc untuk pdf.js
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// loader

import Lottie from "react-lottie";
import * as loaderData from "../../assets/loader/lottieLego.json"
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";




import logoUpn from "../../assets/images/LOGO UPNVJ.png"
function AsesorUploadMUK() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState(null);

  const dataAsesor = useSelector((state) => state.userReducers.asesorData)
  const userLogin = useSelector((state) => state.userReducers.userLogin);
  const statusPost = useSelector((state) => state.asesorReducers.postMUK)
  const errorPost = useSelector((state) => state.asesorReducers.errorPostMUK)
  const listMUK = useSelector((state) => state.asesorReducers.listMUK)

  const [controller] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const [loading, setLoading] = useState(true); // State to manage loading status


  const [formData, setFormData] = useState({
    namaSkema: dataAsesor.Asesor.SkemaUjikom.namaSkema,
    file: "",
    fileName: "",
  });
  // Create a FormData instance
  const data = new FormData();
  data.append("namaSkema", formData.namaSkema); // Tambahkan namaSkema
  data.append("file", formData.file); // Tambahkan file
  data.append("fileName", formData.fileName)

  useEffect(() => {
    console.log("Nama Skema:", dataAsesor.Asesor.SkemaUjikom.namaSkema);
    console.log("Access Token:", userLogin.access_token);
    dispatch(getAllMUKList({ access_token: userLogin.access_token, namaSkema: dataAsesor.Asesor.SkemaUjikom.namaSkema }))

  }, [])
  // loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (2000ms)
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, []);

  useEffect(() => {
    if (statusPost !== "") {
      console.log(statusPost, 'statius')
      // alert ("File uploaded successfully!");

    } if (errorPost !== "") {
      console.log(errorPost)
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
    setFormData({ ...formData, file })
    if (file) {
      setSelectedFile(file);
      setError(null);
      if (file.type === "application/pdf") {
        setFilePreview(URL.createObjectURL(file));
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword"
      ) {
        setFilePreview(null); // Word preview handling (optional)
      } else {
        setError("Only PDF or Word documents are supported.");
        setSelectedFile(null);
      }
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file before uploading.");
      return;
    }
    dispatch(asesorPostMUK({ access_token: userLogin.access_token, formData: data }))
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
    console.log(value)
    setFormData({ ...formData, fileName: value })
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
          routes={routesSidenavAsesor}
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
            Materi Uji Kompetensi : Skema Uji Kompetensi {dataAsesor.Asesor.SkemaUjikom.namaSkema}
          </VuiTypography>
          <VuiBox px={3} py={2}>
            <DocumentChecklist></DocumentChecklist>
            {/* <div>
              <VuiTypography>File Gallery</VuiTypography>
              <div className="gallery-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {listMUK.file.map((file) => (
                  <FileCard key={file.id} file={file} access_token={userLogin.access_token} />
                ))}
              </div>
            </div> */}
            


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
                  // sx={{
                  //   background: "rgba(255, 255, 255, 0.1)",
                  //   color: "white",
                  //   borderRadius: "8px",
                  //   "& .MuiOutlinedInput-notchedOutline": {
                  //     borderColor: "rgba(255, 255, 255, 0.3)",
                  //   },
                  //   "&:hover .MuiOutlinedInput-notchedOutline": {
                  //     borderColor: "white",
                  //   },
                  //   "& .MuiSvgIcon-root": {
                  //     color: "white",
                  //   },
                  // }}

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
                  <MenuItem value="FR.APL.01. Permohonan Sertifikasi Kompetensi">
                    FR.APL-01 Permohonan Sertifikasi Kompetensi
                  </MenuItem>
                  <MenuItem value="FR.APL.02. Asesmen Mandiri">FR.APL-02 Asesmen Mandiri</MenuItem>
                  <MenuItem value="Portofolio Peserta">Portofolio Peserta</MenuItem>
                  <MenuItem value="FR.MAPA.01. Merencanakan Aktivitas dan Proses Asesmen">FR. MAPA.01 Merencanakan Aktivitas dan Proses Asesmen</MenuItem>
                  <MenuItem value="SKEMA Sertifikasi + Standar Kompetensi Kerja">SKEMA Sertifikasi + Standar Kompetensi Kerja</MenuItem>
                  <MenuItem value="FR. MAPA.02-Peta Instrumen Asesmen Hasil Pendekatan Asesmen dan Perencanaan Asesmen">FR. MAPA.02-Peta Instrumen Asesmen Hasil Pendekatan Asesmen dan Perencanaan Asesmen</MenuItem>
                  <MenuItem value="FR.AK.01. Persetujuan Asesmen dan Kerahasiaan">FR.AK.01 Persetujuan Asesmen dan Kerahasiaan</MenuItem>
                  <MenuItem value="FR.AK.04 Banding Asesmen">FR.AK.04 Banding Asesmen</MenuItem>
                  <MenuItem disabled>B. PERANGKAT ASESMEN</MenuItem>
                  <MenuItem value="FR.IA.01 Ceklis Observasi Aktivitas di Tempat Kerja atau Tempat Kerja Simulasi">FR.IA.01 Ceklis Observasi Aktivitas di Tempat Kerja atau Tempat Kerja Simulasi</MenuItem>
                  <MenuItem value="FR.IA.02 Tugas Praktik Demonstrasi">FR.IA.02 Tugas Praktik Demonstrasi</MenuItem>
                  <MenuItem value="FR.IA.03 Pertanyaan untuk Mendukung Observasi">FR.IA.03 Pertanyaan untuk Mendukung Observasi</MenuItem>
                  <MenuItem value="FR.IA.04 Penjelasan Singkat Proyek Terkait Pekerjaan/Kegiatan Terstruktur Lainnya">FR.IA.04 Penjelasan Singkat Proyek Terkait Pekerjaan/Kegiatan Terstruktur Lainnya</MenuItem>
                  <MenuItem value="FR.IA.05 Pertanyaan Tertulis Pilihan ganda+Kunci Jawaban dan Lembar Jawab">FR.IA.05 Pertanyaan Tertulis Pilihan ganda+Kunci Jawaban dan Lembar Jawab</MenuItem>
                  <MenuItem value="FR.IA.06 Pertanyaan Tertulis Esai+Kunci Jawaban dan Lembar Jawab">
                    FR.IA.06 Pertanyaan Tertulis Esai+Kunci Jawaban dan Lembar Jawab
                  </MenuItem>
                  <MenuItem value="FR.IA.07 Pertanyaan Lisan">FR.IA.07 Pertanyaan Lisan</MenuItem>
                  <MenuItem value="FR.IA.08 Ceklis Verifikasi Portofolio">FR.IA.08 Ceklis Verifikasi Portofolio</MenuItem>

                  <MenuItem value="FR.IA.09 Pertanyaan Wawancara">FR.IA.09 Pertanyaan Wawancara</MenuItem>
                  <MenuItem value="FR.IA.10 Klarifikasi Bukti Pihak Ketiga">FR.IA.10 Klarifikasi Bukti Pihak Ketiga</MenuItem>
                  <MenuItem value="FR.IA.11 Ceklis Meninjau Materi Uji Kompetensi">FR.IA.11 Ceklis Meninjau Materi Uji Kompetensi</MenuItem>
                  <MenuItem disabled>C. Keputusan</MenuItem>
                  <MenuItem value="FR.AK.02 Formulir Rekaman Asesmen Kompetensi">FR.AK.02 Formulir Rekaman Asesmen Kompetensi</MenuItem>
                  <MenuItem value="FR.AK.03 Umpan Balik dan Catatan Asesmen">FR.AK.03 Umpan Balik dan Catatan Asesmen</MenuItem>
                  <MenuItem disabled>D. Laporan</MenuItem>
                  <MenuItem value="FR.AK.05 Laporan Asesmen">FR.AK.05 Laporan Asesmen</MenuItem>
                  <MenuItem value="FR.AK.06 Meninjau Proses Asesmen">FR.AK.06 Meninjau Proses Asesmen</MenuItem>

                </Select>
              </div>
            </VuiBox>




            <VuiBox mt={2}>
              <VuiButton variant="contained" color="info" onClick={handleFileUpload}>
                Upload File
              </VuiButton>
            </VuiBox>

            {/* <VuiBox mt={4}>
              {filePreview ? (
                <div>
                  <VuiTypography color="white" fontWeight="medium">
                    File Preview:
                  </VuiTypography>
                  <Document file={filePreview} onLoadError={console.error}>
                    <Page pageNumber={1} />
                  </Document>
                </div>
              ) : (
                selectedFile && (
                  <VuiTypography color="white" fontWeight="medium">
                    File preview not available for Word documents.
                  </VuiTypography>
                )
              )}
            </VuiBox> */}
            {/* <VuiBox mt={4} style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px", maxWidth: "600px", overflow: "hidden", maxHeight: "500px", overflowY: "auto", }}>

              {filePreview ? (
                <div>
                  <VuiTypography color="white" fontWeight="medium">
                    File Preview:
                  </VuiTypography>
                  <Document
                    file={filePreview}
                    onLoadError={console.error}
                    style={{ display: "block", backgroundColor: "#ffffff" }}
                  >
                    <Page pageNumber={10} />
                  </Document>
                </div>
              ) : (
                selectedFile && (
                  <VuiTypography color="white" fontWeight="medium">
                    File preview not available for Word documents.
                  </VuiTypography>
                )
              )}
            </VuiBox> */}
          </VuiBox>
        </Card>
      </Grid>

    </Grid>
  );
}

export default AsesorUploadMUK;


