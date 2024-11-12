/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import GradientBorder from "examples/GradientBorder";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
// / Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import IconButton from "@mui/material/IconButton";



// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";
import VuiAlert from "components/VuiAlert";


// Dashboard layout components
import WelcomePeserta from "layouts/dashboard/components/WelcomePeserta";
import WelcomeAsesor from "layouts/dashboard/components/WelcomeAsesor"
import SkemaUjikom from "layouts/dashboard/components/SkemaUjikom";
import ChecklistPeserta from "layouts/dashboard/components/CheklistPeserta";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";
import JadwalUjikom from "layouts/pesertaUjikom/jadwalUjikom";
import TableJadwalUjikom from "layouts/dashboard/components/TabelJadwalUjikomAll/tableJadwalSkemaUjikom";

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
import { inputDataPeserta, logOut } from "../../store/action/userAction"
import { verifikasiAlamatAction } from "../../store/action/userAction";


//loader
import Lottie from "react-lottie";
import * as loaderData from "../../assets/loader/lottieLego.json"

function isiDataDiriPeserta() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userReducers.userLogin);
  const loadingJadwal = useSelector((state) => state.userReducers.loadingJadwalFetch);
  const lat = useSelector((state) => state.userReducers.latPeserta);
  const long = useSelector((state) => state.userReducers.longPeserta)
  const errorVerifikasiAlamat = useSelector((state) => state.userReducers.errorVerifikasiAlamat)
  const statusInputData = useSelector((state)=> state.userReducers.statusInputData)
  const statusGagalInput = useSelector ((state)=> state.userReducers.statusGagalInput)


  // lotie loader
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  const { gradients } = colors;
  const { cardContent } = gradients;

  const [isToggled, setIsToggled] = useState(false);

  const [alamatSuccess, setAlamatSuccess] = useState(false);
  if (long && lat) {
    const toggleSnackbar = () => setAlamatInput(!alamatSuccess);
  }


  const [formInput, setFormInput] = useState({
    namaPeserta: "",
    lat: 0,
    long: 0,
  });

  const [alamatInput, setAlamatInput] = useState({
    alamat: ""
  })
  const namaInput = (input) => {
    const namaLengkap = formInput.namaPeserta;
    setFormInput({ ...formInput, namaPeserta: input.target.value });
  };

  useEffect(() => {
    if (lat && long) {
      setFormInput({
        ...formInput,
        lat: lat,
        long: long
      });
    }
  }, [lat, long]);

  useEffect(() => {
    if (statusInputData === "Pendataan Peserta Berhasil") {
      // Redirect to the dashboard on success
      history.push("/dashboard"); // Adjust the path as necessary
    }
  }, [statusInputData, history]);

  const alamatChange = (input) => {
    setAlamatInput({ ...alamatInput, alamat: input.target.value })
  }


  const verifikasiAlamat = (e) => {
    e.preventDefault()
    dispatch(verifikasiAlamatAction(alamatInput.alamat))
  }
  const signOut = () => {
    localStorage.clear();
    history.push("/");
    dispatch(logOut());
  };

  const onSubmit = (e) => {
    e.preventDefault()
    const access_token = userLogin.access_token
    console.log(access_token,'token')
    dispatch(inputDataPeserta({access_token, formInput}))
    console.log(formInput)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar userLogin={userLogin} signOut={signOut} />
      {lat !== 0 && long !== 0 ? (
        <VuiAlert>Alamat Anda Berhasil di Verifikasi</VuiAlert>
      ) : null}
      {errorVerifikasiAlamat && lat == 0 && long == 0 ? (
        <VuiAlert>Alamat Anda Tidak Berhasil di Verifikasi</VuiAlert>
      ) : null}
      <VuiBox py={3}>
        <VuiBox
          component="form"
          role="form"
          borderRadius="inherit"
          p="45px"
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.focus,
          })}
          onSubmit={onSubmit}
        >


          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Nama Lengkap
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                placeholder="Nama lengkap tanpa gelar"
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
                onChange={namaInput}
              />
            </GradientBorder>
          </VuiBox>


          {lat == 0 && long == 0 ? (
            <>
              <VuiBox mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Masukkan Alamat Lengkap / Domisili anda saat ini
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="100%"
                  borderRadius={borders.borderRadius.lg}
                  padding="1px"
                  backgroundImage={radialGradient(
                    palette.gradients.borderLight.main,
                    palette.gradients.borderLight.state,
                    palette.gradients.borderLight.angle
                  )}
                >
                  <VuiInput
                    type="input"
                    placeholder="domisili saat ini dengan format: jalan, kota/kabupaten, kode pos"
                    sx={({ typography: { size } }) => ({
                      fontSize: size.sm,
                    })}
                    onChange={alamatChange}
                  />
                </GradientBorder>
              </VuiBox>
              <VuiButton variant="outlined" color="info" onClick={verifikasiAlamat}>
                Validasi Data
              </VuiButton>

            </>

          ) : null}


          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" fullWidth type="submit">
              Simpan Perubahan Data
            </VuiButton>
          </VuiBox>
          {/* <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Sudah Punya Akun?{" "}
              <VuiTypography
                component={Link}
                to="/"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Simpan Perubahan Data
              </VuiTypography>
            </VuiTypography>
          </VuiBox> */}
        </VuiBox>


      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default isiDataDiriPeserta;
