import React from "react";
// import { BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";

import { Route, Switch, useLocation } from "react-router-dom";
// // javascript plugin used to create scrollbars on windows
// import PerfectScrollbar from "perfect-scrollbar";

// // core components
// import AdminNavbar from "../../layouts/dashboard/components/AdminNavbar";
import Footer from "examples/Footer";
// import Sidebar from "../../layouts/dashboard/components/AdminSidebar";
// import FixedPlugin from "../../layouts/dashboard/components/FixedPlugin";
// import BackgroundColorWrapper from "layouts/dashboard/components/BackgroundColorWrapper";

// import ThemeContextWrapper from "../dashboard/components/ThemeWrapper"

import routes from "./Sidenav/routes";

// // import logo from "../../assets/images/LOGO UPNVJ.png";
// import { BackgroundColorContext } from "../../context/BackgroundColorContext";

// var ps;

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomePeserta from "layouts/dashboard/components/WelcomePeserta";
import WelcomeAsesor from "layouts/dashboard/components/WelcomeAsesor"
import SkemaUjikom from "layouts/dashboard/components/SkemaUjikom";
import ChecklistPeserta from "layouts/dashboard/components/CheklistPeserta";
import ChecklistAsesor from "layouts/ScreenAsesor/ChecklistAsesor";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";
import TablePengurusanSkema from "./TabelSkemaUjikom/tablePengurusanSkemaUjikom";
import JadwalUjikom from "layouts/pesertaUjikom/jadwalUjikom";
import TableLengkapiDataDiriAsesor from "layouts/ScreenAsesor/TableLengkapiIsiData"
import TableJadwalAsesor from "layouts/ScreenAsesor/TableJadwalAsesor"
import TablePilihSkema from "layouts/dashboard/components/TabelJadwalUjikomAll/tablePilihSkema";
import ReferralTrackingAsesor from "layouts/ScreenAsesor/ReferralTrackingAsesor";
//component
import CustomFooterAdmin from "../../components/footerAdmin";
import CustomSidebarAdmin from "../../components/sideBarAdmin";
import Sidenav from "../screenAdmin/Sidenav"
// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";

// store
import { logOut, fetchAllJadwal } from "../../store/action/userAction";
import { FetchDataSkemaUjikom } from "store/action/adminAction";

//loader
import Lottie from "react-lottie";
import * as loaderData from "../../assets/loader/lottieLego.json"
import { BsDisplay } from "react-icons/bs";

import logoUpn from "../../assets/images/LOGO UPNVJ.png"


// import DeckGL from '@deck.gl/react';
// import { LineLayer } from '@deck.gl/layers';
//store
// Vision UI Dashboard React contexts
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { addNewSkemaUjikom } from "store/action/adminAction";

function ManageSkemaUjikom() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userReducers.userLogin);
  const dataUser = useSelector((state) => state.userReducers.dataPribadi) || {};
  const findInfoSkema = useSelector((state) => state.userReducers.allJadwal)
  const loadingInfoSkema = useSelector((state) => state.userReducers.loadingJadwalFetch)

  const [loading, setLoading] = useState(true); // State to manage loading status

  const [controller] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);


  // lotie loader
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (userLogin?.access_token) {
      // dispatch (FetchDataSkemaUjikom (userLogin.access_token))
      // dispatch(fetchAllJadwal(userLogin.access_token))
    }
  }, [userLogin])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (2000ms)
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, []);

  const backToHome = () => {
    history.push('/dashboard-admin')
  }
  const signOut = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/");
  };

  if (loadingInfoSkema) {
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

  const [dynamicFields, setDynamicFields] = useState([]);

  // Tambah field baru
  const addDynamicField = () => {
    setDynamicFields([
      ...dynamicFields,
      {
        namaSkema: "",
        nomorSkema: "",
        sektorSkema: "",
        jenisSkema: "",
        // kodeUnitKompetensi: "",
      },
    ]);
  };

  // Hapus field
  const removeDynamicField = (index) => {
    setDynamicFields(dynamicFields.filter((_, i) => i !== index));
  };

  // Update field tertentu
  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...dynamicFields];
    updatedFields[index][field] = value;
    setDynamicFields(updatedFields);
  };

  // Simpan data (misalnya, kirim ke backend)
  const handleSave = () => {
    console.log("Data Skema:", dynamicFields);
    // Dispatch action atau kirim ke backend
    dispatch(addNewSkemaUjikom ({access_token: userLogin.access_token, dynamicFields}))
  };


  return (
    <Grid container style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
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
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave} />
      </Grid>

      {/* Main Content */}
      <Grid item xs={10} style={{ padding: "20px" }}>
        <DashboardNavbar userLogin={userLogin} signOut={signOut} />
        <VuiBox py={3}>

          <VuiBox py={0} mb={3}>
            <Grid container spacing="18px">
              <Grid item xs={12} lg={8} xl={5} spacing={3}>
                {/* {JSON.stringify(findInfoSkema)} */}


              </Grid>

              <Grid item xs={12} lg={8} xl={7}>


              </Grid>
            </Grid>
          </VuiBox>
          <Grid mb={3} container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
            <Grid item xs={12} md={6} lg={8}>
              <TablePengurusanSkema
                // jadwalPeserta={jadwalPeserta}
                allJadwal={findInfoSkema}
                // allJadwalError={allJadwalError}
                loadAllJadwal={loadingInfoSkema}
                dataUser={dataUser}
              />
            </Grid>
            {/* {userLogin?.role === 'Peserta Ujikom' && dataUser} */}

            <Grid item xs={12} md={6} lg={4}>


            </Grid>
          </Grid>
        </VuiBox>

        <VuiBox py={3} sx={{
          "& th": {
            borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
              `${borderWidth[1]} solid ${grey[700]}`,
          },
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                `${borderWidth[1]} solid ${grey[700]}`,
            },
          },
        }}>
          <VuiBox display="flex" alignItems="center" mb="32px">
            <VuiBox py={3} sx={{
              "& th": {
                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                  `${borderWidth[1]} solid ${grey[700]}`,
              },
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              },
            }}>

              <VuiBox py={3}>
                <VuiBox mb={2}>
                  <VuiButton color="info" onClick={addDynamicField}>
                    Tambah Skema Baru
                  </VuiButton>
                </VuiBox>

                {dynamicFields.map((field, index) => (
                  <VuiBox key={index} mb={2} style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <VuiTypography component="label" variant="button" color="white" fontWeight="medium">Nama Skema</VuiTypography>
                        <VuiInput
                          placeholder="Nama Skema"
                          value={field.namaSkema}
                          onChange={(e) => handleFieldChange(index, "namaSkema", e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <VuiTypography component="label" variant="button" color="white" fontWeight="medium">Nomor Skema</VuiTypography>
                        <VuiInput
                          placeholder="Nomor Skema"
                          value={field.nomorSkema}
                          onChange={(e) => handleFieldChange(index, "nomorSkema", e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <VuiTypography component="label" variant="button" color="white" fontWeight="medium">Sektor Skema</VuiTypography>
                        <VuiInput
                          placeholder="Sektor Skema"
                          value={field.sektorSkema}
                          onChange={(e) => handleFieldChange(index, "sektorSkema", e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <VuiTypography component="label" variant="button" color="white" fontWeight="medium">Jenis Skema</VuiTypography>
                        <VuiInput
                          placeholder="Jenis Skema"
                          value={field.jenisSkema}
                          onChange={(e) => handleFieldChange(index, "jenisSkema", e.target.value)}
                        />
                      </Grid>
                      {/* <Grid item xs={12}>
                      <VuiTypography component="label" variant="button" color="white" fontWeight="medium">Nama Skema</VuiTypography>
                        <VuiInput
                          placeholder="Kode Unit Kompetensi"
                          value={field.kodeUnitKompetensi}
                          onChange={(e) => handleFieldChange(index, "kodeUnitKompetensi", e.target.value)}
                        />
                      </Grid> */}
                      <Grid item xs={12} style={{ textAlign: "right" }}>
                        <VuiButton color="error" onClick={() => removeDynamicField(index)}>
                          Hapus
                        </VuiButton>
                      </Grid>
                    </Grid>
                  </VuiBox>
                ))}

                {dynamicFields.length > 0 && (
                  <VuiBox mt={3}>
                    <VuiButton color="success" onClick={handleSave}>
                      Simpan Semua Skema
                    </VuiButton>
                  </VuiBox>
                )}
              </VuiBox>
            </VuiBox>
          </VuiBox>

        </VuiBox>
        <Footer />
      </Grid>
    </Grid>


  )
}

export default ManageSkemaUjikom

