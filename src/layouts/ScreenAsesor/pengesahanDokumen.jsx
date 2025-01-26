// import React, { useState, useEffect } from "react";
// import Grid from "@mui/material/Grid";
// import { Card, Select, MenuItem, Button, Typography, CircularProgress } from "@mui/material";
// import VuiBox from "components/VuiBox";
// import VuiTypography from "components/VuiTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Sidenav from "../ScreenAsesor/Sidenav/index";
// import routesSidenavAsesor from "../ScreenAsesor/Sidenav/routes";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchParticipants, fetchDocumentsStatus, downloadDocument } from "store/action/asesorAction";

// import { Redirect, useHistory } from "react-router-dom";
// import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";
// // loader
// import Lottie from "react-lottie";
// import * as loaderData from "../../assets/loader/lottieLego.json"
// import logoUpn from "../../assets/images/LOGO UPNVJ.png"
// import { logOut } from "store/action/userAction";


// function PengesahanDokumen() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [selectedParticipant, setSelectedParticipant] = useState(null);

//   // Redux selectors to get data from the store
//   const participants = useSelector((state) => state.asesorReducers.pesertaUjikomList);
//   const documentStatus = useSelector((state) => state.asesorReducers.documentStatus);
//   // const loading = useSelector((state) => state.asesorReducers.loading);
//   const userLogin = useSelector((state) => state.userReducers.userLogin);
//   const dataAsesor = useSelector((state) => state.userReducers.asesorData)

//   const [loading, setLoading] = useState(true); // State to manage loading status
//   const [controller] = useVisionUIController();
//   const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
//   const [onMouseEnter, setOnMouseEnter] = useState(false);
//   useEffect(() => {
//     // Fetch participants list on page load
//     dispatch(fetchParticipants({ access_token: userLogin.access_token }));
//   }, [dispatch]);

//   const handleParticipantChange = (participant) => {
//     setSelectedParticipant(participant);
//     dispatch(fetchDocumentsStatus(participant.id)); // Fetch document statuses for the selected participant
//   };
//   // loader
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false); // Set loading to false after 2 seconds (2000ms)
//     }, 2000); // Adjust the delay as needed

//     return () => clearTimeout(timer); // Clean up the timeout on component unmount
//   }, []);
//   const handleDownload = (documentId) => {
//     dispatch(downloadDocument(documentId)); // Trigger document download
//   };
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
//   // lotie loader
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: loaderData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };
//   if (loading) {
//     return (
//       <DashboardLayout>
//         <Grid>
//           <VuiBox>
//             <Lottie options={defaultOptions} />
//           </VuiBox>
//         </Grid>
//       </DashboardLayout>
//     );
//   }
//   const signOut = () => {
//     localStorage.clear();
//     dispatch(logOut());
//     history.push("/");
//   };
//   const backToHome = () => {
//     history.push('/dashboard')
//   }


//   if (!dataAsesor?.Asesor?.SkemaUjikom) {
//     return (
//       <DashboardLayout>
//         < Grid container style={{ minHeight: "100vh" }}  >
//           <Grid
//             item
//             xs={2}
//             style={{
//               // backgroundColor: "#1A2035",
//               // color: "#FFFFFF",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <Sidenav color={sidenavColor}
//               brand=""
//               brandName="LSP UPNVJ"
//               routes={routesSidenavAsesor}
//               onMouseEnter={handleOnMouseEnter}
//               onMouseLeave={handleOnMouseLeave} />
//           </Grid>
//           <Grid item xs={10} style={{ padding: "20px" }}>
//             <DashboardNavbar userLogin={userLogin} signOut={signOut} backToHome={backToHome} />
//             <VuiTypography variant="h5" color="error">
//               Anda belum terdaftar pada skema ujikom tertentu.
//             </VuiTypography>
//           </Grid>
//         </Grid>
//       </DashboardLayout>
//     );
//   }


//   return (
//     // <DashboardLayout>
//     <Grid container style={{ minHeight: "100vh" }} >
//       <Grid item xs={2} md={3}>
//         <Sidenav
//           color="primary"
//           brand="LSP UPNVJ"
//           routes={routesSidenavAsesor}
//         />
//       </Grid>
//       {/* {JSON.stringify(participants[0].namaPeserta)} */}
//       <Grid item xs={2} md={9}>
//         <DashboardNavbar userLogin={userLogin} signOut={signOut} backToHome={backToHome} />

//         <Card>
//           <VuiBox display="flex" alignItems="center" mb="32px">
//             <img
//               alt="Logo LSP UPN Veteran Jakarta"
//               style={{ width: '50px', height: '50px', marginRight: '16px' }}
//               src={logoUpn}
//             />
//             <VuiTypography variant="h4" color="text" fontWeight="bold">
//               Lembaga Sertifikasi Profesi UPN Veteran Jakarta
//             </VuiTypography>

//           </VuiBox>
//           <VuiTypography color="text" variant="button" fontWeight="bold" mb="5px">
//             Dokumen Uji Kompetensi Asesi : Skema Uji Kompetensi {dataAsesor.Asesor.SkemaUjikom.namaSkema}
//           </VuiTypography>
//           <VuiBox>
//             <VuiTypography variant="h5" color="text" fontWeight="bold" mb={2}>
//               Pengesahan Dokumen Uji Kompetensi
//             </VuiTypography>
//             <VuiTypography
//               component="label"
//               variant="button"
//               color="text"
//               fontWeight="medium"
//               mr={4}
//             >
//               Pilih Peserta Ujikom:
//             </VuiTypography>
//             <Select
//               fullWidth
//               value={selectedParticipant || ""}
//               onChange={(e) => handleParticipantChange(e.target.value)}
//               displayEmpty
//               // style={{ marginBottom: "20px" }}
//               sx={{
//                 background: "rgba(0, 0, 50, 0.8)", // Warna latar gelap
//                 color: "white", // Warna teks putih
//                 borderRadius: "8px", // Sudut membulat
//                 border: "1px solid rgba(255, 255, 255, 0.3)", // Garis pembatas lembut
//                 padding: "10px", // Spasi dalam
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   border: "none", // Menghilangkan outline default
//                 },
//                 "& .MuiSvgIcon-root": {
//                   color: "white", // Warna ikon dropdown
//                 },
//                 "&:hover": {
//                   background: "rgba(0, 0, 50, 0.9)", // Warna saat hover
//                 },
//               }}
//             >
//               <MenuItem value="" disabled>
//                 <VuiTypography color="text" variant="caption">
//                   Pilih Peserta yang akan di nilai
//                 </VuiTypography>
//               </MenuItem>
//               {participants.map((participant, index) => (

//                 <MenuItem key={participant.id} value={participant.namaPeserta}>
//                   {participant.namaPeserta}
//                 </MenuItem>
//               ))}
//             </Select>

//             {loading ? (
//               <CircularProgress />
//             ) : (
//               selectedParticipant && (
//                 <div>
//                   <Typography variant="h6" mb={2}>
//                     Status Dokumen Peserta: {selectedParticipant.name}
//                   </Typography>

//                   <ul>
//                     {/* {documentStatus.map((doc) => (
//                         <li key={doc.id} style={{ marginBottom: "10px" }}>
//                           <Typography>
//                             {doc.name}: {doc.status === "uploaded" ? "Sudah diunggah" : "Belum diunggah"}
//                           </Typography>
//                           {doc.status === "uploaded" && (
//                             <Button
//                               variant="contained"
//                               color="primary"
//                               onClick={() => handleDownload(doc.id)}
//                             >
//                               Unduh
//                             </Button>
//                           )}
//                         </li>
//                       ))} */}
//                   </ul>
//                 </div>
//               )
//             )}
//           </VuiBox>
//         </Card>
//       </Grid>
//     </Grid>
//     // </DashboardLayout>
//   );
// }

// export default PengesahanDokumen;
// import React, { useState, useEffect } from "react";
// import Grid from "@mui/material/Grid";
// import { Card, Select, MenuItem, Button, Typography, CircularProgress } from "@mui/material";
// import VuiBox from "components/VuiBox";
// import VuiTypography from "components/VuiTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Sidenav from "../ScreenAsesor/Sidenav/index";
// import routesSidenavAsesor from "../ScreenAsesor/Sidenav/routes";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchParticipants, fetchDocumentsStatus, downloadDocument } from "store/action/asesorAction";

// import { useHistory } from "react-router-dom";
// import { useVisionUIController, setMiniSidenav } from "context";
// import Lottie from "react-lottie";
// import * as loaderData from "../../assets/loader/lottieLego.json";
// import logoUpn from "../../assets/images/LOGO UPNVJ.png";
// import { logOut } from "store/action/userAction";

// function PengesahanDokumen() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [selectedParticipant, setSelectedParticipant] = useState(null);

//   // Redux selectors
//   const participants = useSelector((state) => state.asesorReducers.pesertaUjikomList);
//   const documentStatus = useSelector((state) => state.asesorReducers.documentStatus);
//   const userLogin = useSelector((state) => state.userReducers.userLogin);
//   const dataAsesor = useSelector((state) => state.userReducers.asesorData);
//   const dataJadwal = useSelector((state)=> state.userReducers.lihatJadwalUjiUser)
//   const [loading, setLoading] = useState(true);
//   const [controller] = useVisionUIController();
//   const { miniSidenav, sidenavColor } = controller;
//   const [onMouseEnter, setOnMouseEnter] = useState(false);

//   // Fetch participants when the page loads
//   useEffect(() => {
//     dispatch(fetchParticipants({ access_token: userLogin.access_token, dataJadwal }));
//   }, [dispatch, userLogin.access_token]);

//   const handleParticipantChange = (participantId) => {
//     const participant = participants.find((p) => p.id === participantId);
//     setSelectedParticipant(participant);
//     // dispatch(fetchDocumentsStatus(participant.id)); // Fetch document statuses
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleDownload = (documentId) => {
//     dispatch(downloadDocument(documentId)); // Trigger document download
//   };

//   const handleOnMouseEnter = () => {
//     if (miniSidenav && !onMouseEnter) {
//       setMiniSidenav(dispatch, false);
//       setOnMouseEnter(true);
//     }
//   };

//   const handleOnMouseLeave = () => {
//     if (onMouseEnter) {
//       setMiniSidenav(dispatch, true);
//       setOnMouseEnter(false);
//     }
//   };

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: loaderData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <Grid>
//           <VuiBox>
//             <Lottie options={defaultOptions} />
//           </VuiBox>
//         </Grid>
//       </DashboardLayout>
//     );
//   }

//   const signOut = () => {
//     localStorage.clear();
//     dispatch(logOut());
//     history.push("/");
//   };

//   const backToHome = () => {
//     history.push("/dashboard");
//   };

//   if (!dataAsesor?.Asesor?.SkemaUjikom) {
//     return (
//       <DashboardLayout>
//         <Grid container style={{ minHeight: "100vh" }}>
//           <Grid
//             item
//             xs={2}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <Sidenav
//               color={sidenavColor}
//               brand=""
//               brandName="LSP UPNVJ"
//               routes={routesSidenavAsesor}
//               onMouseEnter={handleOnMouseEnter}
//               onMouseLeave={handleOnMouseLeave}
//             />
//           </Grid>
//           <Grid item xs={10} style={{ padding: "20px" }}>
//             <DashboardNavbar userLogin={userLogin} signOut={signOut} backToHome={backToHome} />
//             <VuiTypography variant="h5" color="error">
//               Anda belum terdaftar pada skema ujikom tertentu.
//             </VuiTypography>
//           </Grid>
//         </Grid>
//       </DashboardLayout>
//     );
//   }


//   const renderDocumentStatus = (participant) => {

//     const documents = [
//       { name: "FR.APL.01. Permohonan Sertifikasi Kompetensi", status: participant.apl01 },
//       { name: "FR.APL.02. Asesmen Mandiri", status:participant.apl02 },
//       { name: "Portofolio Peserta" },
//       { name: "FR.MAPA.01. Merencanakan Aktivitas dan Proses Asesmen" },
//       { name: "FR.AK.01. Persetujuan Asesmen dan Kerahasiaan" },
//       { name: "SKEMA Sertifikasi + Standar Kompetensi Kerja" },
//       { name: "FR. MAPA.02-Peta Instrumen Asesmen Hasil Pendekatan Asesmen dan Perencanaan Asesmen" },
//       { name: "FR.AK.01. Persetujuan Asesmen dan Kerahasiaan" },
//       { name: "FR.AK.04 Banding Asesmen" },
//       { name: "FR.IA.01 Ceklis Observasi Aktivitas di Tempat Kerja atau Tempat Kerja Simulasi" },
//       { name: "FR.IA.02 Tugas Praktik Demonstrasi" },
//       { name: "FR.IA.03 Pertanyaan untuk Mendukung Observasi" },
//       { name: "FR.IA.04 Penjelasan Singkat Proyek Terkait Pekerjaan/Kegiatan Terstruktur Lainnya" },
//       { name: "FR.IA.05 Pertanyaan Tertulis Pilihan ganda+Kunci Jawaban dan Lembar Jawab" },
//       { name: "FR.IA.06 Pertanyaan Tertulis Esai+Kunci Jawaban dan Lembar Jawab" },
//       { name: "FR.IA.07 Pertanyaan Lisan" },
//       { name: "FR.IA.08 Ceklis Verifikasi Portofolio" },
//       { name: "FR.IA.09 Pertanyaan Wawancara" },
//       { name: "FR.IA.10 Klarifikasi Bukti Pihak Ketiga" },
//       { name: "FR.IA.11 Ceklis Meninjau Materi Uji Kompetensi" },
//       { name: "FR.AK.02 Formulir Rekaman Asesmen Kompetensi" },
//       { name: "FR.AK.03 Umpan Balik dan Catatan Asesmen" },
//       { name: "FR.AK.05 Laporan Asesmen" },
//       { name: "FR.AK.06 Meninjau Proses Asesmen" },
//     ];


//     return (
//       <ul>
//         {documents.map((doc, index) => (
//           <li key={index}>
//             <Typography>
//               {doc.name}: {doc.status || "Belum diunggah"}
//             </Typography>
//             {doc.status && doc.status !== "Pending" && (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleDownload(participant.id, doc.name)}
//               >
//                 Unduh {doc.name}
//               </Button>
//             )}
//           </li>
//         ))}
//       </ul>
//     );
//   };


//   return (
//     <Grid container style={{ minHeight: "100vh" }}>
//       <Grid item xs={2}
//         style={{
//           // backgroundColor: "#1A2035",
//           // color: "#FFFFFF",
//           display: "flex",
//           flexDirection: "column"
//         }}>
//         <Sidenav color="primary" brand="LSP UPNVJ" routes={routesSidenavAsesor} />
//       </Grid>
//       <Grid item xs={10} style={{ padding: "20px" }}>
//         <DashboardNavbar userLogin={userLogin} signOut={signOut} backToHome={backToHome} />
//         <Card>
//           {JSON.stringify(dataJadwal)}
//           {JSON.stringify(participants)}
//           <VuiBox display="flex" alignItems="center" mb="32px">
//             <img
//               alt="Logo LSP UPN Veteran Jakarta"
//               style={{ width: "50px", height: "50px", marginRight: "16px" }}
//               src={logoUpn}
//             />
//             <VuiTypography variant="h4" color="text" fontWeight="bold">
//               Lembaga Sertifikasi Profesi UPN Veteran Jakarta
//             </VuiTypography>
//           </VuiBox>
//           <VuiTypography color="text" variant="button" fontWeight="bold" mb="5px">
//             Dokumen Uji Kompetensi Asesi: Skema Uji Kompetensi {dataAsesor.Asesor.SkemaUjikom.namaSkema}
//           </VuiTypography>
//           <VuiBox>
//             <VuiTypography variant="h5" color="text" fontWeight="bold" mb={2}>
//               Pengesahan Dokumen Uji Kompetensi
//             </VuiTypography>


//             <VuiBox display="flex" alignItems="center" mb={2}>
//               <div class="flex items-center space-x-4 mr-4 " >


//                 <VuiTypography component="label" variant="button" color="text" fontWeight="medium" mr={4}>
//                   Pilih Jadwal Ujikom:
//                 </VuiTypography>
//                 <Select
//                   fullWidth
//                   value={selectedParticipant ? selectedParticipant.id : ""}
//                   onChange={(e) => handleParticipantChange(e.target.value)}
//                   displayEmpty
//                   sx={{
//                     background: "rgba(0, 0, 50, 0.8)",
//                     color: "white",
//                     borderRadius: "8px",
//                     border: "1px solid rgba(255, 255, 255, 0.3)",
//                     padding: "10px",
//                     "& .MuiOutlinedInput-notchedOutline": {
//                       border: "none",
//                     },
//                     "& .MuiSvgIcon-root": {
//                       color: "white",
//                     },
//                     "&:hover": {
//                       background: "rgba(0, 0, 50, 0.9)",
//                     },
//                   }}
//                 >
//                   <MenuItem value="" disabled>
//                     <VuiTypography color="text" variant="caption">
//                       Pilih Jadwal Ujikom yang ingin dinilai / disahkan
//                     </VuiTypography>
//                   </MenuItem>
//                   {/* {dataJadwal
//                   // .filter((participant) => participant.jadwalUjikomId === dataJadwal.id)
//                   .map((jadwal) => (
//                     <MenuItem key={jadwal.id} value={jadwal.id} >
//                       {jadwal.tanggalWaktu}
//                     </MenuItem>
//                   ))} */}
//                 </Select>
//               </div>
//             </VuiBox>


//             <VuiBox display="flex" alignItems="center" mb={2}>
//               <div class="flex items-center space-x-4 mr-4 " >


//                 <VuiTypography component="label" variant="button" color="text" fontWeight="medium" mr={4}>
//                   Pilih Peserta Ujikom:
//                 </VuiTypography>
//                 <Select
//                   fullWidth
//                   value={selectedParticipant ? selectedParticipant.id : ""}
//                   onChange={(e) => handleParticipantChange(e.target.value)}
//                   displayEmpty
//                   sx={{
//                     background: "rgba(0, 0, 50, 0.8)",
//                     color: "white",
//                     borderRadius: "8px",
//                     border: "1px solid rgba(255, 255, 255, 0.3)",
//                     padding: "10px",
//                     "& .MuiOutlinedInput-notchedOutline": {
//                       border: "none",
//                     },
//                     "& .MuiSvgIcon-root": {
//                       color: "white",
//                     },
//                     "&:hover": {
//                       background: "rgba(0, 0, 50, 0.9)",
//                     },
//                   }}
//                 >
//                   <MenuItem value="" disabled>
//                     <VuiTypography color="text" variant="caption">
//                       Pilih Peserta yang akan dinilai
//                     </VuiTypography>
//                   </MenuItem>
//                   {participants
//                   .filter((participant) => participant.jadwalUjikomId === dataJadwal.id)
//                   .map((participant) => (
//                     <MenuItem key={participant.id} value={participant.id} >
//                       {participant.namaPeserta}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </div>
//             </VuiBox>
//             {selectedParticipant && (
//               <div>
//                 <VuiTypography variant="h6" color="text" style={{ marginTop: '1rem' }}>
//                   Status Dokumen Peserta: {selectedParticipant.namaPeserta}
//                 </VuiTypography>

//                 <ul>
//                   {/* {documentStatus.map((doc) => (
//                     <li key={doc.id} style={{ marginBottom: "10px" }}>
//                       <Typography>
//                         {doc.name}: {doc.status === "uploaded" ? "Sudah diunggah" : "Belum diunggah"}
//                       </Typography>
//                       {doc.status === "uploaded" && (
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           onClick={() => handleDownload(doc.id)}
//                         >
//                           Unduh
//                         </Button>
//                       )}
//                     </li>
//                   ))} */}
//                 </ul>
//               </div>
//             )}


//             {selectedParticipant && (
//               <VuiBox mt={4}>
//                 <Typography variant="h6" mb={2}>
//                   Status Dokumen untuk {selectedParticipant.namaPeserta}
//                 </Typography>
//                 {renderDocumentStatus(selectedParticipant)}
//               </VuiBox>
//             )}
//           </VuiBox>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// }

// export default PengesahanDokumen;


import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Card, Select, MenuItem, Button, Typography, CircularProgress } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Sidenav from "../ScreenAsesor/Sidenav/index";
import routesSidenavAsesor from "../ScreenAsesor/Sidenav/routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchParticipants, downloadDocument } from "store/action/asesorAction";
import { useHistory } from "react-router-dom";
import { useVisionUIController, setMiniSidenav } from "context";
import logoUpn from "../../assets/images/LOGO UPNVJ.png";
import { logOut } from "store/action/userAction";

import DocumentAsesi from "./component/DocumentAsesi";

function PengesahanDokumen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedJadwal, setSelectedJadwal] = useState(null); // State untuk jadwal yang dipilih
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  // Redux selectors
  const participants = useSelector((state) => state.asesorReducers.pesertaUjikomList);
  const userLogin = useSelector((state) => state.userReducers.userLogin);
  const dataJadwal = useSelector((state) => state.userReducers.allJadwal);
  const [controller] = useVisionUIController();
  const { miniSidenav, sidenavColor } = controller;
  const documentStatus = useSelector((state) => state.asesorReducers.documentStatus);
  useEffect(() => {
    dispatch(fetchParticipants({ access_token: userLogin.access_token, dataJadwal }));
  }, [dispatch, userLogin.access_token]);

  const handleJadwalChange = (jadwalId) => {
    setSelectedJadwal(jadwalId);
    setSelectedParticipant(null); // Reset peserta saat jadwal berubah
  };

  const handleParticipantChange = (participantId) => {
    const participant = participants.find((p) => p.id === participantId);
    setSelectedParticipant(participant);
  };

  const signOut = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/");
  };

  const backToHome = () => {
    history.push("/dashboard");
  };

  const renderDocumentStatus = (participant) => {

    const documents = [
      { name: "FR.APL.01. Permohonan Sertifikasi Kompetensi", status: participant.apl01 },
      { name: "FR.APL.02. Asesmen Mandiri", status: participant.apl02 },
      { name: "Portofolio Peserta" },
      { name: "FR.MAPA.01. Merencanakan Aktivitas dan Proses Asesmen" },
      { name: "FR.AK.01. Persetujuan Asesmen dan Kerahasiaan" },
      { name: "SKEMA Sertifikasi + Standar Kompetensi Kerja" },
      { name: "FR. MAPA.02-Peta Instrumen Asesmen Hasil Pendekatan Asesmen dan Perencanaan Asesmen" },
      { name: "FR.AK.01. Persetujuan Asesmen dan Kerahasiaan" },
      { name: "FR.AK.04 Banding Asesmen" },
      { name: "FR.IA.01 Ceklis Observasi Aktivitas di Tempat Kerja atau Tempat Kerja Simulasi" },
      { name: "FR.IA.02 Tugas Praktik Demonstrasi" },
      { name: "FR.IA.03 Pertanyaan untuk Mendukung Observasi" },
      { name: "FR.IA.04 Penjelasan Singkat Proyek Terkait Pekerjaan/Kegiatan Terstruktur Lainnya" },
      { name: "FR.IA.05 Pertanyaan Tertulis Pilihan ganda+Kunci Jawaban dan Lembar Jawab" },
      { name: "FR.IA.06 Pertanyaan Tertulis Esai+Kunci Jawaban dan Lembar Jawab" },
      { name: "FR.IA.07 Pertanyaan Lisan" },
      { name: "FR.IA.08 Ceklis Verifikasi Portofolio" },
      { name: "FR.IA.09 Pertanyaan Wawancara" },
      { name: "FR.IA.10 Klarifikasi Bukti Pihak Ketiga" },
      { name: "FR.IA.11 Ceklis Meninjau Materi Uji Kompetensi" },
      { name: "FR.AK.02 Formulir Rekaman Asesmen Kompetensi" },
      { name: "FR.AK.03 Umpan Balik dan Catatan Asesmen" },
      { name: "FR.AK.05 Laporan Asesmen" },
      { name: "FR.AK.06 Meninjau Proses Asesmen" },
    ]
    return (
      <ul>
        {documents.map((doc, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {/* <Typography>
              {doc.name}: {doc.status ? "Sudah diunggah" : "Belum diunggah"}
            </Typography>
            {doc.status && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDownload(doc.name)} // Ganti `doc.name` dengan ID yang sesuai
              >
                Unduh
              </Button>
            )} */}
          <DocumentAsesi doc={doc}></DocumentAsesi>
          </li>
        ))}
      </ul>
    );

  }
  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid item xs={2} style={{ display: "flex", flexDirection: "column" }}>
        <Sidenav color="primary" brand="LSP UPNVJ" routes={routesSidenavAsesor} />
      </Grid>
      <Grid item xs={10} style={{ padding: "20px" }}>
        <DashboardNavbar userLogin={userLogin} signOut={signOut} backToHome={backToHome} />
        <Card>
          <VuiBox display="flex" alignItems="center" mb="32px">
            <img
              alt="Logo LSP UPN Veteran Jakarta"
              style={{ width: "50px", height: "50px", marginRight: "16px" }}
              src={logoUpn}
            />
            <VuiTypography variant="h4" color="text" fontWeight="bold">
              Lembaga Sertifikasi Profesi UPN Veteran Jakarta
            </VuiTypography>
          </VuiBox>
          <VuiTypography color="text" variant="button" fontWeight="bold" mb="5px">
            Dokumen Uji Kompetensi Asesi: Skema Uji Kompetensi
          </VuiTypography>
          <VuiBox>
            <VuiBox display="flex" alignItems="center" mb={2}>
              <VuiTypography component="label" variant="button" color="text" fontWeight="medium" mr={4}>
                Pilih Jadwal Ujikom:
              </VuiTypography>
              <Select
                fullWidth
                value={selectedJadwal || ""}
                onChange={(e) => handleJadwalChange(e.target.value)}
                displayEmpty
                sx={{
                  background: "rgba(0, 0, 50, 0.8)",
                  color: "white",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  padding: "10px",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "& .MuiSvgIcon-root": { color: "white" },
                  "&:hover": { background: "rgba(0, 0, 50, 0.9)" },
                }}
              >
                <MenuItem value="" disabled>
                  Pilih Jadwal Ujikom yang ingin dinilai / disahkan
                </MenuItem>
                {dataJadwal.findAllJadwal.map((jadwal) => {
                  if (jadwal.JadwalUjikoms.length > 0 && jadwal.JadwalUjikoms[0].tanggalWaktu) {
                    // Format tanggal menjadi human-readable
                    const tanggalWaktu = new Date(jadwal.JadwalUjikoms[0].tanggalWaktu).toLocaleString("id-ID", {
                      weekday: "long", // Menampilkan nama hari
                      day: "numeric", // Menampilkan tanggal
                      month: "long", // Menampilkan nama bulan
                      year: "numeric", // Menampilkan tahun
                      hour: "2-digit", // Menampilkan jam
                      minute: "2-digit", // Menampilkan menit
                    });

                    return (
                      <MenuItem key={jadwal.id} value={jadwal.id}>
                        {tanggalWaktu}
                      </MenuItem>
                    );
                  }
                  return null; // Jika tidak ada tanggal, jangan tampilkan apa-apa
                })}

              </Select>
            </VuiBox>

            {selectedJadwal && (
              <VuiBox display="flex" alignItems="center" mb={2}>
                <VuiTypography component="label" variant="button" color="text" fontWeight="medium" mr={4}>
                  Pilih Peserta Ujikom:
                </VuiTypography>
                <Select
                  fullWidth
                  value={selectedParticipant ? selectedParticipant.id : ""}
                  onChange={(e) => handleParticipantChange(e.target.value)}
                  displayEmpty
                  sx={{
                    background: "rgba(0, 0, 50, 0.8)",
                    color: "white",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    padding: "10px",
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "& .MuiSvgIcon-root": { color: "white" },
                    "&:hover": { background: "rgba(0, 0, 50, 0.9)" },
                  }}
                >
                  <MenuItem value="" disabled>
                    Pilih Peserta yang akan dinilai
                  </MenuItem>
                  {participants
                    .filter((participant) => participant.jadwalUjikomId === selectedJadwal)
                    .map((participant) => (
                      <MenuItem key={participant.id} value={participant.id}>
                        {participant.namaPeserta}
                      </MenuItem>
                    ))}
                </Select>
              </VuiBox>
            )}

            {selectedParticipant && (
              <div>
                <VuiTypography variant="h6" color="text" style={{ marginTop: '1rem' }}>
                  Status Dokumen Peserta: {selectedParticipant.namaPeserta}
                </VuiTypography>

                <ul>
                 
                </ul>
              </div>
            )}


            {selectedParticipant && (
              <VuiBox mt={4}>
                <Typography variant="h6" mb={2}>
                  Status Dokumen untuk {selectedParticipant.namaPeserta}
                </Typography>
                {renderDocumentStatus(selectedParticipant)}
              </VuiBox>
            )}
          </VuiBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PengesahanDokumen;
