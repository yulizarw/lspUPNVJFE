
import Cookies from "js-cookie";
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
import ChecklistAsesor from "layouts/ScreenAsesor/ChecklistAsesor";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";
import TableJadwalUjikom from "./components/TabelJadwalUjikomAll/tableJadwalSkemaUjikom";
import JadwalUjikom from "layouts/pesertaUjikom/jadwalUjikom";
import TableLengkapiDataDiriAsesor from "layouts/ScreenAsesor/TableLengkapiIsiData"
import TableJadwalAsesor from "layouts/ScreenAsesor/TableJadwalAsesor"
import routesSidenavAsesor from "../ScreenAsesor/Sidenav/routes"

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
import { fetchDataPribadi, fetchJadwalUjikomPeserta, fetchAllJadwal, fetchDataDiriAsesor, logOut, lihatJadwalKompetensiUser, fetchListAPL02Peserta } from "../../store/action/userAction";


//loader
import Lottie from "react-lottie";
import * as loaderData from "../../assets/loader/lottieLego.json"
import TablePilihSkema from "./components/TabelJadwalUjikomAll/tablePilihSkema";
import ReferralTrackingAsesor from "layouts/ScreenAsesor/ReferralTrackingAsesor";
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";


import Sidenav from "../ScreenAsesor/Sidenav/index"
import { getAllMUKList } from "store/action/asesorAction";

function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userReducers.userLogin);
  const dataUser = useSelector((state) => state.userReducers.dataPribadi) || {};
  const jadwalPeserta = useSelector((state) => state.userReducers.jadwalPesertaUjikom) || {};
  const jadwalPesertaError = useSelector((state) => state.userReducers.jadwalPesertaError);
  const loadingJadwal = useSelector((state) => state.userReducers.loadingJadwalFetch);
  const allJadwal = useSelector((state) => state.userReducers.allJadwal) || {}
  const allJadwalError = useSelector((state) => state.userReducers.allJadwalError)
  const loadAllJadwal = useSelector((state) => state.userReducers.loadingJadwalFetch)
  const statusPilihSkemaPeserta = useSelector((state) => state.userReducers.statusPilihSkemaPeserta)

  const dataAsesor = useSelector((state) => state.userReducers.asesorData)
  const dataAsesorError = useSelector((state) => state.userReducers.asesorDataError)
  const loadDataAsesor = useSelector((state) => state.userReducers.loadDataAsesor)

  const jadwalUjiUser = useSelector((state) => state.userReducers.lihatJadwalUjiUser)

  const [loading, setLoading] = useState(true); // State to manage loading status
  const [isToggled, setIsToggled] = useState(false);
  const [isToggledJadwalAsesor, setIsToggledJadwalAsesor] = useState(false);
  const [pilihSkema, setPilihan] = useState(false)
  const [lengkapiDataAsesorToggle, setToggleAsesor] = useState(false)
  const [forceRender, setForceRender] = useState(false);
  const [controller] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  // get data cookies
  // const userLogin = JSON.parse(Cookies.get('userLogin'))
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
    console.log("dataUser updated:", dataUser); // Debugging untuk memastikan perubahan
  }, [dataUser]);


  useEffect(() => {
    if (userLogin?.access_token) {
      dispatch(fetchDataPribadi(userLogin.access_token));
      dispatch(fetchAllJadwal(userLogin.access_token));
      dispatch(fetchJadwalUjikomPeserta(userLogin.access_token));
      dispatch(fetchDataDiriAsesor(userLogin.access_token));
      dispatch(lihatJadwalKompetensiUser(userLogin.access_token))
      dispatch(fetchListAPL02Peserta({ access_token: userLogin.access_token }))
      // dispatch(getAllMUKList({ access_token: userLogin.access_token, namaSkema: dataAsesor.Asesor.SkemaUjikom.namaSkema }))
    }
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


  const lihatJadwalKompetensiAsesor = () => {
    console.log(dataAsesor)
    setIsToggledJadwalAsesor((prevstate) => !prevstate)
  }

  const lengkapiDataDiriAsesor = () => {
    setToggleAsesor((prevState) => !prevState)

  }

  const isiDataDiriPeserta = () => {
    history.push("/isi-data-diri")

  }

  const signOut = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/");
  };

  if (loading || loadingJadwal || loadAllJadwal || loadDataAsesor) {
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
    setPilihan((prevState) => !prevState);

  }

  const onClickChecklistPesertaAPL01 = () => {
    history.push('/isi-apl-01')
  }

  const onClickChecklistPesertaAPL02 = () => {
    history.push('/pengisian-apl02')
  }
  const onClickChecklistPortfolio = () => {
    history.push('/pengisian-portfolio')
  }





  const renderTableContent = () => {
    if (userLogin?.role === "Peserta Ujikom" && isToggled === false && pilihSkema === true && dataUser.skemaUjikomId == null) {
      return <TablePilihSkema allJadwal={allJadwal} />;
    }

    if (userLogin?.role === "Peserta Ujikom" && isToggled === false) {
      return (
        <TableJadwalUjikom
          jadwalPeserta={jadwalPeserta}
          allJadwal={allJadwal}
          allJadwalError={allJadwalError}
          loadAllJadwal={loadAllJadwal}
          dataUser={dataUser}
        />
      );
    }

    if (userLogin?.role === "Peserta Ujikom" && isToggled === true) {
      return <JadwalUjikom />;
    }

    if (userLogin?.role === 'Asesor' && dataAsesor == null) {
      return <TableLengkapiDataDiriAsesor
        allJadwal={allJadwal}
        userLogin={userLogin}
      />
    }

    if (isToggledJadwalAsesor === false) {
      return <TableJadwalUjikom
        jadwalPeserta={dataAsesor}
        allJadwal={allJadwal}
        allJadwalError={allJadwalError}
        loadAllJadwal={loadAllJadwal}
        dataUser={dataUser}
        dataAsesor={dataAsesor}
      />
    } else {
      return <TableJadwalAsesor></TableJadwalAsesor>
    }


    return null;
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
  return (
    <Grid container >
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
      <Grid item xs={10} style={{ padding: "20px" }}>
        <DashboardNavbar userLogin={userLogin} signOut={signOut} backToHome={backToHome} />

        <VuiBox py={0} mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={8} xl={5} spacing={3}>

              {userLogin.role === 'Peserta Ujikom' ?
                (
                  <WelcomePeserta key={forceRender} userLogin={userLogin} dataUser={dataUser} lihatJadwalKompetensi={lihatJadwalKompetensi} isiDataDiriPeserta={isiDataDiriPeserta} pilihSkemaKompetensi={pilihSkemaKompetensi} />
                ) :

                (<WelcomeAsesor userLogin={userLogin} dataUser={dataUser} lihatJadwalKompetensiAsesor={lihatJadwalKompetensiAsesor} dataAsesor={dataAsesor} lengkapiDataDiriAsesor={lengkapiDataDiriAsesor} />)
              }

            </Grid>

            <Grid item xs={12} lg={8} xl={7}>
              {/* detil TUK */}
              {userLogin.role == "Peserta Ujikom" ? (
                <ReferralTracking dataUser={dataUser} allJadwal={allJadwal} jadwalPeserta={jadwalPeserta} jadwalUjiUser={jadwalUjiUser} />
              )
                : userLogin.role == "Asesor" ? (<ReferralTrackingAsesor allJadwal={allJadwal} dataAsesor={dataAsesor} dataUser={dataUser} jadwalUjiUser={jadwalUjiUser} />) :
                  (<ReferralTracking dataUser={dataUser} allJadwal={allJadwal} jadwalPeserta={jadwalPeserta} jadwalUjiUser={jadwalUjiUser} />)

              }

            </Grid>
          </Grid>
        </VuiBox>
        <Grid mb={3} container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            {renderTableContent()}
          </Grid>
          {/* {userLogin?.role === 'Peserta Ujikom' && dataUser} */}

          <Grid item xs={12} md={6} lg={4}>
            {userLogin.role === 'Peserta Ujikom' || userLogin.role === 'Admin' ?
              (<ChecklistPeserta
                dataUser={dataUser}
                onClickChecklistPesertaAPL01={onClickChecklistPesertaAPL01}
                jadwalUjiUser={jadwalUjiUser}
                onClickChecklistPesertaAPL02={onClickChecklistPesertaAPL02}
                onClickChecklistPortfolio={onClickChecklistPortfolio} />) :
              (<ChecklistAsesor dataAsesor={dataAsesor} jadwalUjiUser={jadwalUjiUser} />)
            }

          </Grid>
        </Grid>

      </Grid>
    </Grid>
  );
}

export default Dashboard;
