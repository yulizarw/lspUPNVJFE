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
import { logOut } from "../../store/action/userAction";

// Atur workerSrc untuk pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// loader
import Lottie from "react-lottie";
import * as loaderData from "../../assets/loader/lottieLego.json"

import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

import logoUpn from "../../assets/images/LOGO UPNVJ.png"

function UnduhMUK() {
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
  const listMUK = useSelector((state) => state.userReducers.listMUK)

  const [controller] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const [loading, setLoading] = useState(true); // State to manage loading status


  const [formData, setFormData] = useState({
    namaSkema: "",
    file: "",
    fileName: "",
  });


  useEffect(() => {
    if (dataAsesor?.Asesor?.SkemaUjikom?.namaSkema) {
      setFormData((prev) => ({ ...prev, namaSkema: dataAsesor.Asesor.SkemaUjikom.namaSkema }));
      dispatch(getAllMUKList({ access_token: userLogin.access_token, namaSkema: dataAsesor.Asesor.SkemaUjikom.namaSkema }))
    }
    setLoading(false);
  }, [dataAsesor, userLogin])

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
      setError("Please select a file before uploading.");
      return;
    }

    const data = new FormData();
    data.append("namaSkema", formData.namaSkema);
    data.append("file", formData.file);
    data.append("fileName", formData.fileName);

    dispatch(asesorPostMUK({ access_token: userLogin.access_token, formData: data }));
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
    setFormData({ ...formData, fileName: value })
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
            <DocumentChecklist dataUser={dataUser}></DocumentChecklist>
          </VuiBox>
        </Card>
      </Grid>

    </Grid>
  );
}

export default UnduhMUK;


