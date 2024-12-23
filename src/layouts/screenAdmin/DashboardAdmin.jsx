import React from "react";
import { BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "../../layouts/dashboard/components/AdminNavbar";
import Footer from "../../layouts/dashboard/components/FooterAdminNew";
import Sidebar from "../../layouts/dashboard/components/AdminSidebar";
import FixedPlugin from "../../layouts/dashboard/components/FixedPlugin";
import BackgroundColorWrapper from "layouts/dashboard/components/BackgroundColorWrapper";

import ThemeContextWrapper from "../dashboard/components/ThemeWrapper"

import routes from "routes.js";

// import logo from "../../assets/images/LOGO UPNVJ.png";
import { BackgroundColorContext } from "../../context/BackgroundColorContext";

var ps;

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
// import TableJadwalUjikom from "./components/TabelJadwalUjikomAll/tableJadwalSkemaUjikom";
// import JadwalUjikom from "layouts/pesertaUjikom/jadwalUjikom";
// import TableLengkapiDataDiriAsesor from "./layouts/ScreenAsesor/TableLengkapiIsiData"
// import TableJadwalAsesor from "layouts/ScreenAsesor/TableJadwalAsesor"
// import TablePilihSkema from "./components/TabelJadwalUjikomAll/tablePilihSkema";
import ReferralTrackingAsesor from "layouts/ScreenAsesor/ReferralTrackingAsesor";
//component
import CustomFooterAdmin from "../../components/footerAdmin";
import CustomSidebarAdmin from "../../components/sideBarAdmin";
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


// import DeckGL from '@deck.gl/react';
// import { LineLayer } from '@deck.gl/layers';
  //store


function DashboardAdmin() {
  const history = useHistory()
  const dispatch = useDispatch()
  const signOut = () => {
    localStorage.clear();
    history.push("/");
    dispatch(logOut());
  };


  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <ThemeContextWrapper>
    <BackgroundColorWrapper>
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <Sidebar
              routes={routes}
              // logo={{
              //   outterLink: "https://www.creative-tim.com/",
              //   text: "Creative Tim",
              //   imgSrc: logo,
              // }}
              toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef} data={color}>
              <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Router>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Link to="/admin/dashboard" replace />}
                />
              </Router>
              {
                // we don't want the Footer to be rendered on map page
                location.pathname === "/admin/maps" ? null : <Footer fluid />
              }
            </div>
          </div>
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  </BackgroundColorWrapper>
  </ThemeContextWrapper>
  );
  // return (
  //   <>
  //   a
  //   </>
    // <>
    //   <div className="hold-transition sidebar-mini layout-fixed">
    //     <div className="wrapper">
    //       <CustomSidebarAdmin signOut={signOut} />
    //       <div className="content-wrapper">
    //         <section className="content-header">
    //           <div className="container-fluid">
    //             <div className="row mb-2">
    //               <div className="col-sm-12">

    //                 {/* content */}
    //                 <div className="card">
    //                   <div className="card-header">
    //                     <p className="display-4">Selamat Datang </p>
    //                     <p className="display-5">Di Sistem Informasi Desa Pabean Udik</p>
    //                   </div>

    //                   <div className="row">
    //                     <div className="col-3 mt-3 card-body">

    //                       {/* <ul data-widget="treeview">
    //                         <li><a href="#">One Level</a></li>
    //                         <li class="nav-item">
    //                           <a class="nav-link" href="#">Multilevel</a>
    //                           <ul class="nav-treeview">
    //                             <li><a href="#">Level 2</a></li>
    //                           </ul>
    //                         </li>
    //                       </ul> */}
    //                       {/* <DeckGL
    //                         initialViewState={INITIAL_VIEW_STATE}
    //                         controller={true}
    //                         layers={layers} /> */}


    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </section>
    //       </div>
    //       <CustomFooterAdmin />
    //     </div>
    //   </div>
    // </>
  // )
}

export default DashboardAdmin