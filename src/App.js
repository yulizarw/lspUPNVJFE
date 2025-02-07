

// import { useState, useEffect, useMemo } from "react";

// // react-router components
// import { BrowserRouter as Router, Route, Switch, Redirect, useLocation, Link } from "react-router-dom";


// import { Provider, useSelector } from "react-redux"
// import store from "./store/index"

// // route guard
// import LoginProtectedRoute from "components/routeGuard/LoginProtectedRoute";
// import ProtectedRoute from "components/routeGuard/ProtectedRoute";

// // @mui material components
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

// // Vision UI Dashboard React components
// import VuiBox from "components/VuiBox";
// // Vision UI Dashboard React components
// import VuiButton from "components/VuiButton";


// // Vision UI Dashboard React example components
import Sidenav from "examples/Sidenav";
// import Configurator from "examples/Configurator";

// // Vision UI Dashboard React themes
// import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// // RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

// // Vision UI Dashboard React routes screen
// import routes from "routes";
// import Dashboard from "../src/layouts/dashboard/index";
// import SignIn from "./layouts/authentication/sign-in/index"
// import SignUp from "./layouts/authentication/sign-up/index"
// import JadwalUjikom from "layouts/pesertaUjikom/jadwalUjikom";
// import isiDataDiriPeserta from "layouts/pesertaUjikom/isiDataDiriPeserta"
// import isiAPL01 from "layouts/pesertaUjikom/isiAPL01";


// // Vision UI Dashboard React contexts
// import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";


// export default function App() {
//   const [controller, dispatch] = useVisionUIController();
//   const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
//   const [onMouseEnter, setOnMouseEnter] = useState(false);
//   const [rtlCache, setRtlCache] = useState(null);
//   const { pathname } = useLocation();

//   // set untuk cek login
//   const [authLogin, setAuthLogin] = useState(false);
//   const loginFunction = () => {
//     setAuthLogin(true);
//   };

//   // Cache for the rtl
//   useMemo(() => {
//     const cacheRtl = createCache({
//       key: "rtl",
//       stylisPlugins: [rtlPlugin],
//     });

//     setRtlCache(cacheRtl);
//   }, []);

//   // Open sidenav when mouse enter on mini sidenav
//   const handleOnMouseEnter = () => {
//     if (miniSidenav && !onMouseEnter) {
//       setMiniSidenav(dispatch, false);
//       setOnMouseEnter(true);
//     }
//   };

//   // Close sidenav when mouse leave mini sidenav
//   const handleOnMouseLeave = () => {
//     if (onMouseEnter) {
//       setMiniSidenav(dispatch, true);
//       setOnMouseEnter(false);
//     }
//   };

//   // Change the openConfigurator state
//   const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

//   // Setting the dir attribute for the body element
//   useEffect(() => {
//     document.body.setAttribute("dir", direction);
//   }, [direction]);

//   // Setting page scroll to 0 when changing the route
//   useEffect(() => {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//   }, [pathname]);

//   // const getRoutes = (allRoutes) =>
//   //   allRoutes.map((route) => {
//   //     if (route.collapse) {
//   //       return getRoutes(route.collapse);
//   //     }

//   //     if (route.route) {
//   //       return <Route exact path={route.route} component={route.component} key={route.key} />;
//   //     }

//   //     return null;
//   //   });

//   const configsButton = (
//     <VuiBox
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       width="3.5rem"
//       height="3.5rem"
//       bgColor="info"
//       shadow="sm"
//       borderRadius="50%"
//       position="fixed"
//       right="2rem"
//       bottom="2rem"
//       zIndex={99}
//       color="white"
//       sx={{ cursor: "pointer" }}
//       onClick={handleConfiguratorOpen}
//     >
//       <Icon fontSize="default" color="inherit">
//         settings
//       </Icon>
//     </VuiBox>
//   );
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {/* {layout === "dashboard" && (
//         <>
//           <Sidenav
//             color={sidenavColor}
//             brand=""
//             brandName="LSP UPN VJ"
//             routes={routes}
//             onMouseEnter={handleOnMouseEnter}
//             onMouseLeave={handleOnMouseLeave}
//           />
//           <Configurator />
//           {configsButton}
//         </>
//       )} */}
//       {/* {layout === "vr" && <Configurator />} */}
//       <Router>
//         <Provider store={store}>
//           <Switch>
//             {/* {getRoutes(routes)} */}
//             <Route path="/sign-up" component={SignUp} />
//             <LoginProtectedRoute exact path="/" authLogin={authLogin}>
//               <SignIn loginFunction={loginFunction} />
//             </LoginProtectedRoute>


//             <ProtectedRoute
//               path="/dashboard"
//               authLogin={authLogin}
//               component={Dashboard}
//             />

//             {/* peserta */}
//             <ProtectedRoute
//               path="/jadwal-ujikom"
//               authLogin={authLogin}
//               component={JadwalUjikom}
//             />
//             <ProtectedRoute
//               path="/isi-data-diri"
//               authLogin={authLogin}
//               component={isiDataDiriPeserta}
//             />
//             <ProtectedRoute
//               path="/isi-APL-01"
//               authLogin={authLogin}
//               component={isiAPL01}
//             />
//           </Switch>
//         </Provider>
//       </Router>
//     </ThemeProvider>
//   )

//   // return direction === "rtl" ? (
//   //   <CacheProvider value={rtlCache}>
//   //     <ThemeProvider theme={themeRTL}>
//   //       <CssBaseline />
//   //       {layout === "dashboard" && (
//   //         <>
//   //           <Sidenav
//   //             color={sidenavColor}
//   //             brand=""
//   //             brandName="VISION UI FREE"
//   //             routes={routes}
//   //             onMouseEnter={handleOnMouseEnter}
//   //             onMouseLeave={handleOnMouseLeave}
//   //           />
//   //           <Configurator />
//   //           {configsButton}
//   //         </>
//   //       )}
//   //       {layout === "vr" && <Configurator />}
//   //       <Switch>
//   //         {getRoutes(routes)}
//   //         <Redirect from="*" to="/dashboard" />
//   //       </Switch>
//   //     </ThemeProvider>
//   //   </CacheProvider>
//   // ) : (
//   //   <ThemeProvider theme={theme}>
//   //     <CssBaseline />
//   //     {layout === "dashboard" && (
//   //       <>
//   //         <Sidenav
//   //           color={sidenavColor}
//   //           brand=""
//   //           brandName="VISION UI FREE"
//   //           routes={routes}
//   //           onMouseEnter={handleOnMouseEnter}
//   //           onMouseLeave={handleOnMouseLeave}
//   //         />
//   //         <Configurator />
//   //         {configsButton}
//   //       </>
//   //     )}
//   //     {layout === "vr" && <Configurator />}
//   //     <Switch>
//   //       {getRoutes(routes)}
//   //       <Redirect from="*" to="/dashboard" />
//   //     </Switch>
//   //   </ThemeProvider>
//   // );
// }
import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

// Components & Layouts
import LoginProtectedRoute from "components/routeGuard/LoginProtectedRoute";
import ProtectedRoute from "components/routeGuard/ProtectedRoute";
import Dashboard from "../src/layouts/dashboard/index";
import SignIn from "./layouts/authentication/sign-in/index";
import SignUp from "./layouts/authentication/sign-up/index";
import JadwalUjikom from "layouts/pesertaUjikom/jadwalUjikom";
import isiDataDiriPeserta from "layouts/pesertaUjikom/isiDataDiriPeserta";
import isiAPL01 from "layouts/pesertaUjikom/isiAPL01";
import IsiKUK from "layouts/ScreenAsesor/IsiKUK";
import isiAPL02 from "layouts/pesertaUjikom/isiAPL02";
import isiPortfolio from "layouts/pesertaUjikom/isiPortfolio";
import DashboardAdmin from "layouts/screenAdmin/DashboardAdmin";
import ManageSkemaUjikom from "layouts/screenAdmin/ManageSkemaUjikom";
import AsesorUploadMUK from "layouts/ScreenAsesor/addMUK";
import PengesahanDokumen from "layouts/ScreenAsesor/pengesahanDokumen";
import PenilaianStatusKompeten from "layouts/ScreenAsesor/penilaianStatusKompeten";
import  UnduhKUK  from "layouts/pesertaUjikom/UnduhMUK";
import UnggahDokumen from "layouts/pesertaUjikom/UnggahDokumen";
import PengurusanTUK from "layouts/screenAdmin/PengurusanTUK";
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { jwtDecode } from "jwt-decode";

// Vision UI Dashboard React components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Vision UI Dashboard React themes
import theme from "assets/theme";
import "leaflet/dist/leaflet.css";
// Route guard hooks

import Cookies from "js-cookie";




export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { pathname } = useLocation();
  const a = 'a'
  const [authLogin, setAuthLogin] = useState(false);
  // const [userRole, setUserRole] = useState(null); // State untuk menyimpan role user

  // Cek jika ada access_token di localStorage saat pertama kali load aplikasi
  useEffect(() => {
    const token = localStorage.getItem("access_token"); // atau sessionStorage.getItem("access_token")
    // const token = Cookies.get("access_token")
    if (token) {
      setAuthLogin(!!token); // Jika token ada, berarti sudah login
    }
  }, []);
  const loginFunction = () => {
    setAuthLogin(true);
  };
  // Fungsi logout
 
  const logoutFunction = () => {
    localStorage.removeItem("access_token");
    setAuthLogin(false);
    // setUserRole(null);
  };


  return (
    <ThemeProvider theme={theme}>
     <CssBaseline />
      
      <Router>
        <Provider store={store}>
          <Switch>
            <Route path="/sign-up" component={SignUp} />
            <LoginProtectedRoute exact path="/" authLogin={authLogin}>
              <SignIn loginFunction={loginFunction} />
            </LoginProtectedRoute>

            <ProtectedRoute
              path="/dashboard"
              authLogin={authLogin}
              // role={userRole}
              // allowedRoles={["Asesor", "Peserta Ujikom"]}
              component={Dashboard}
            />

            <ProtectedRoute
              path="/dashboard-admin"
              authLogin={authLogin}
              // role={userRole}
              // allowedRoles={["Admin"]}
              component={DashboardAdmin}
            />

            {/* Routes for other pages */}
            <ProtectedRoute
              path="/skema-ujikom"
              authLogin={authLogin}
              // role={userRole}
              // allowedRoles={["Admin"]}
              component={ManageSkemaUjikom}
            />
            <ProtectedRoute
              path="/jadwal-ujikom"
              authLogin={authLogin}
              component={JadwalUjikom}
            />
            <ProtectedRoute
              path="/isi-data-diri"
              authLogin={authLogin}
              component={isiDataDiriPeserta}
            />
            <ProtectedRoute
              path="/isi-APL-01"
              authLogin={authLogin}
              component={isiAPL01}
            />
            <ProtectedRoute
              path="/materi-uji-kompetensi"
              authLogin={authLogin}
              component={IsiKUK}
            />
            <ProtectedRoute
              path="/pengisian-apl02"
              authLogin={authLogin}
              component={isiAPL02}
            />
            <ProtectedRoute
              path="/pengisian-portfolio"
              authLogin={authLogin}
              component={isiPortfolio}
            />
            <ProtectedRoute
              path="/asesor-upload-MUK"
              authLogin={authLogin}
              component={AsesorUploadMUK}
            />
            <ProtectedRoute
              path="/asesor-pengesahan-dokumen"
              authLogin={authLogin}
              component={PengesahanDokumen}
            />
            <ProtectedRoute
              path="/penilaian-kompetensi"
              authLogin={authLogin}
              component={PenilaianStatusKompeten}
            />
            <ProtectedRoute
              path="/unduh-muk"
              authLogin={authLogin}
              component={UnduhKUK}
            />
            <ProtectedRoute
              path="/unggah-dokumen"
              authLogin={authLogin}
              component={UnggahDokumen}
            />
            <ProtectedRoute
              path="/pengurusan-tuk"
              authLogin={authLogin}
              component={PengurusanTUK}
            />


            {/* Redirect if route doesn't match */}
            <Redirect from="*" to="/" />
          </Switch>
        </Provider>
      </Router>
    </ThemeProvider>
  );
}
