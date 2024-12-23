import React from 'react';

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack, Radio, RadioGroup, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import GradientBorder from "examples/GradientBorder";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import VuiAlert from 'components/VuiAlert';
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// / Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import IconButton from "@mui/material/IconButton";

// import { Radio, RadioGroup } from '@chakra-ui/react'
// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomePeserta from "layouts/dashboard/components/WelcomePeserta";
import WelcomeAsesor from "layouts/dashboard/components/WelcomeAsesor"
import SkemaUjikom from "layouts/dashboard/components/SkemaUjikom";
import ChecklistPeserta from "layouts/dashboard/components/CheklistPeserta";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";
// import TableJadwalUjikom from "./components/TabelJadwalUjikomAll/tableJadwalSkemaUjikom";
import JadwalUjikom from "layouts/pesertaUjikom/jadwalUjikom";

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
import { logOut } from "../../store/action/userAction"
import { simpanAPL02Peserta,  simpanPortfolioPeserta} from "../../store/action/userAction";

import logoUpn from "../../assets/images/LOGO UPNVJ.png"
//loader
import Lottie from "react-lottie";
import * as loaderData from "../../assets/loader/lottieLego.json"
// import TablePilihSkema from "./components/TabelJadwalUjikomAll/tablePilihSkema";

import { listAPL02Asesor, addMUK, destroyMUK } from "../../store/action/userAction"
import { userReducers } from 'store/reducer/userReducer';

function isiPortfolio() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userReducers.userLogin);

  const dataPribadi = useSelector((state) => state.userReducers.dataPribadi)

  const [loading, setLoading] = useState(true); // State to manage loading status

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
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (2000ms)
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, []);

  const backToHome = () => {
    history.push('/dashboard')
  }

  const signOut = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/");
  };

  const [links, setLinks] = useState({
    pasfoto: "",
    identitasPribadi: "",
    buktiPendidikan: "",
    buktiPelatihan: "",
    buktiPengalamanKerja: "",
    portfolio: "",
  });


  const [images, setImages] = useState({});

  // Fungsi untuk mengubah link Google Drive menjadi direct link
  const convertToDirectLink = (link) => {
    const match = link.match(/\/d\/(.+?)\//); // Regex untuk mendapatkan FILE_ID
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return "";
  };

  // Handle input perubahan link
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinks({ ...links, [name]: value });
  };

  // Handle submit untuk menampilkan gambar
  const handleSubmit = (e) => {
    e.preventDefault();
    const convertedImages = {};
    for (const key in links) {
      convertedImages[key] = convertToDirectLink(links[key]);
    }
    setImages(convertedImages);
  };
  const handleSimpan = (e) => {
    e.preventDefault()
    console.log(links, 'asd')
    dispatch( simpanPortfolioPeserta({access_token:userLogin.access_token, links}))
  }


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



  return (
    <DashboardLayout>
      <DashboardNavbar userLogin={userLogin} signOut={signOut} backToHome={backToHome} />


      <Card sx={() => ({
        height: 'auto',
        py: "32px",
      })}>

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
            SUBMIT BUKTI PORTFOLIO ASESI
          </VuiTypography>

          <VuiTypography color="text" variant="button" fontWeight="bold" mb="5px">
            Skema Uji Kompetensi {dataPribadi.SkemaUjikom.namaSkema}
          </VuiTypography>

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

            <form onSubmit={handleSimpan}>
              <Grid container spacing={2}>
                {/* Input for Links */}
                {Object.keys(links).map((key) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <VuiBox mb={2}>
                      <VuiTypography
                        component="label"
                        variant="button"
                        color="white"
                        fontWeight="medium"
                      >
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                      </VuiTypography>
                      <VuiInput
                        type="text"
                        name={key}
                        placeholder={`Paste Google Drive link for ${key}`}
                        value={links[key]}
                        onChange={handleChange}
                        fullWidth
                      />
                    </VuiBox>
                  </Grid>
                ))}

                {/* Submit Button */}
                <Grid item xs={12}>
                  <VuiBox mt={2}>
                    <VuiButton type="submit" color="primary">
                      Tampilkan Gambar
                    </VuiButton>
                  </VuiBox>
                </Grid>
              </Grid>
              {/* Submit Button */}
              <VuiBox mt={2} mb={1}>
                <VuiButton color="primary" type="submit">
                  Simpan Portfolio
                </VuiButton>
              </VuiBox>
              {/* </VuiBox> */}


            </form>

            {/* Display Images */}
            <VuiBox mt={4}>
              <Grid container spacing={2}>
                {Object.keys(images).map((key) => (
                  images[key] && (
                    <Grid item xs={12} sm={6} key={key}>
                      <VuiTypography
                        variant="button"
                        color="white"
                        fontWeight="medium"
                        mb={1}
                      >
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                      </VuiTypography>
                      <VuiBox
                        component="img"
                        src={images[key]}
                        alt={key}
                        width="100%"
                        sx={{ borderRadius: "8px", border: "1px solid #ddd" }}
                      />
                    </Grid>
                  )
                ))}
              </Grid>
            </VuiBox>













</VuiBox>
          </VuiBox>
      </Card>

      <Footer />
    </DashboardLayout>
  );
}

export default isiPortfolio;
