

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

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
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
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";
import TableJadwalUjikom from "./components/TabelJadwalUjikomAll/tableJadwalSkemaUjikom";
import JadwalUjikom from "layouts/pesertaUjikom/jadwalUjikom";
import TableLengkapiDataDiriAsesor from "layouts/ScreenAsesor/TableLengkapiIsiData"
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
import { fetchDataPribadi, fetchJadwalUjikomPeserta, fetchAllJadwal, fetchDataDiriAsesor, logOut } from "../../store/action/userAction";


//loader
import Lottie from "react-lottie";
import * as loaderData from "../../assets/loader/lottieLego.json"
import TablePilihSkema from "./components/TabelJadwalUjikomAll/tablePilihSkema";

function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userReducers.userLogin);
  const dataUser = useSelector((state) => state.userReducers.dataPribadi);
  const jadwalPeserta = useSelector((state) => state.userReducers.jadwalPesertaUjikom);
  const jadwalPesertaError = useSelector((state) => state.userReducers.jadwalPesertaError);
  const loadingJadwal = useSelector((state) => state.userReducers.loadingJadwalFetch);
  const allJadwal = useSelector((state) => state.userReducers.allJadwal)
  const allJadwalError = useSelector((state) => state.userReducers.allJadwalError)
  const loadAllJadwal = useSelector((state) => state.userReducers.loadingJadwalFetch)
  const statusPilihSkemaPeserta = useSelector((state) => state.userReducers.statusPilihSkemaPeserta)

  const dataAsesor = useSelector((state) => state.userReducers.asesorData)
  const dataAsesorError = useSelector((state) => state.userReducers.asesorDataError)
  const loadDataAsesor = useSelector((state) => state.userReducers.loadDataAsesor)

  const [loading, setLoading] = useState(true); // State to manage loading status
  const [isToggled, setIsToggled] = useState(false);
  const [pilihSkema, setPilihan] = useState(false)
  const [lengkapiDataAsesorToggle, setToggleAsesor] = useState(false)

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

  useEffect(() => {
    dispatch(fetchDataPribadi(userLogin.access_token))
    dispatch(fetchAllJadwal(userLogin.access_token))
    dispatch(fetchJadwalUjikomPeserta(userLogin.access_token))
    dispatch(fetchDataDiriAsesor(userLogin.access_token))
  }, [userLogin])

  useEffect(() => {
    if (statusPilihSkemaPeserta === true) {
      setPilihan((prevState) => !prevState)
    }
  }, [statusPilihSkemaPeserta])

  const backToHome = () => {
    history.push('/dashboard')
  }

  const lihatJadwalKompetensi = () => {
    setIsToggled((prevState) => !prevState)
  }

  const lengkapiDataDiriAsesor = () => {
    setToggleAsesor((prevState) => !prevState)
    // console.log(lengkapiDataAsesorToggle,'togle asesordiri')
  }

  const isiDataDiriPeserta = () => {
    history.push("/isi-data-diri")

  }

  const signOut = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/");
  };
  if (loadingJadwal) {
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
  if (loadAllJadwal) {
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

  if (loadDataAsesor) {
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
  const pilihSkemaKompetensi = () => {
    setPilihan((prevState) => !prevState)
  }

  const onClickChecklistPesertaAPL01 = () => {
    history.push('/isi-apl-01')
  }

  return (
    <DashboardLayout>
      <DashboardNavbar userLogin={userLogin} signOut={signOut} backToHome={backToHome} />
      <VuiBox py={3}>

        <VuiBox py={0} mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={8} xl={5} spacing={3}>
              {userLogin.role === 'Peserta Ujikom' ?
                (
                  <WelcomePeserta userLogin={userLogin} dataUser={dataUser} lihatJadwalKompetensi={lihatJadwalKompetensi} isiDataDiriPeserta={isiDataDiriPeserta} pilihSkemaKompetensi={pilihSkemaKompetensi} />
                ) :

                (<WelcomeAsesor userLogin={userLogin} dataUser={dataUser} lihatJadwalKompetensi={lihatJadwalKompetensi} dataAsesor={dataAsesor} lengkapiDataDiriAsesor={lengkapiDataDiriAsesor} />)

              }

            </Grid>
            {/* <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate />
            </Grid> */}
            <Grid item xs={12} lg={8} xl={7}>
              {/* detil TUK */}
              <ReferralTracking dataUser={dataUser} allJadwal={allJadwal} jadwalPeserta={jadwalPeserta} />
            </Grid>
          </Grid>
        </VuiBox>
        <Grid mb={3} container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          {/* <Grid item xs={12} md={6} lg={8}>
           

            {userLogin.role === 'Peserta Ujikom' ? (
              isToggled === false ? (
                <TableJadwalUjikom
                  jadwalPeserta={jadwalPeserta}
                  allJadwal={allJadwal}
                  allJadwalError={allJadwalError}
                  loadAllJadwal={loadAllJadwal}
                />
              ) : (
                <JadwalUjikom />
              )
            ) : userLogin.role === 'Admin' ? (
              <SkemaUjikom
                jadwalPeserta={jadwalPeserta}
                allJadwal={allJadwal}
                allJadwalError={allJadwalError}
                loadAllJadwal={loadAllJadwal}
              />
            ) : (<SkemaUjikom
              jadwalPeserta={jadwalPeserta}
              allJadwal={allJadwal}
              allJadwalError={allJadwalError}
              loadAllJadwal={loadAllJadwal}
            />)}
          </Grid> */}
          <Grid item xs={12} md={6} lg={8}>
            {pilihSkema == true ? (
              <TablePilihSkema allJadwal={allJadwal} />
            ) : userLogin.role === 'Peserta Ujikom' ? (
              isToggled === false ? (
                <TableJadwalUjikom
                  jadwalPeserta={jadwalPeserta}
                  allJadwal={allJadwal}
                  allJadwalError={allJadwalError}
                  loadAllJadwal={loadAllJadwal}
                  dataUser={dataUser}
                />
              ) : (
                <JadwalUjikom />
              )
            ) : null
            // : userLogin.role === 'Admin' ? (
            //   <SkemaUjikom
            //     jadwalPeserta={jadwalPeserta}
            //     allJadwal={allJadwal}
            //     allJadwalError={allJadwalError}
            //     loadAllJadwal={loadAllJadwal}
            //   />
            // )
            //  : (

            //   <TableJadwalUjikom
            //     jadwalPeserta={jadwalPeserta}
            //     allJadwal={allJadwal}
            //     allJadwalError={allJadwalError}
            //     loadAllJadwal={loadAllJadwal}
            //     dataUser={dataUser}
            //   />
            // )
            }

            { userLogin.role =='Asesor' && dataAsesor !== null ? (
              <TableJadwalUjikom
                jadwalPeserta={jadwalPeserta}
                allJadwal={allJadwal}
                allJadwalError={allJadwalError}
                loadAllJadwal={loadAllJadwal}
                dataUser={dataUser}
              />
            )
              : (
                <TableLengkapiDataDiriAsesor allJadwal={allJadwal} userLogin = {userLogin} />
              )}
          </Grid>


          <Grid item xs={12} md={6} lg={4}>
            {userLogin.role === 'Peserta Ujikom' ?
              (<ChecklistPeserta dataUser={dataUser} onClickChecklistPesertaAPL01={onClickChecklistPesertaAPL01} />) :
              (<ChecklistPeserta />)
            }

          </Grid>
        </Grid>

      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
