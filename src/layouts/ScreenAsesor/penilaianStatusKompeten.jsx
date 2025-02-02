
import React, { useState, useEffect } from "react";
import { Card, Select, Grid, Pagination, MenuItem, Button, Typography, CircularProgress, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Sidenav from "../ScreenAsesor/Sidenav/index";
import routesSidenavAsesor from "../ScreenAsesor/Sidenav/routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchParticipants, updateCompetencyStatus } from "store/action/asesorAction"; // Action untuk update status kompetensi
import { useHistory } from "react-router-dom";
import { useVisionUIController, setMiniSidenav } from "context";
import logoUpn from "../../assets/images/LOGO UPNVJ.png";
import { logOut } from "store/action/userAction";
// import { Select, MenuItem, Card, Grid, Typography, Pagination } from "@mui/material";
import Table from "../../examples/Tables/Table/index"; 

import DocumentAsesi from "./component/DocumentAsesi";

function PenilaianStatusKompeten() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedJadwal, setSelectedJadwal] = useState(null); // State untuk jadwal yang dipilih
  const [kompetensiStatus, setKompetensiStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Items per page

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

   // Handle the page change in the pagination
   const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };


  const columns = [
    { name: "Nama Peserta", align: "left" },
    { name: "Status Kompetensi", align: "center" }, // Optional column to show competency status
  ];

  const filteredParticipants = participants.filter(
    (participant) => participant.jadwalUjikomId === selectedJadwal
  );
  
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  
  // Data yang akan ditampilkan pada tabel (pagination berdasarkan hasil filter)
  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleKompetensiChange = (participantId, status) => {
    setKompetensiStatus((prev) => ({
      ...prev,
      [participantId]: status,
    }));
  
    // Simpan status ke backend
    dispatch(updateCompetencyStatus({ participantId, status, access_token: userLogin.access_token }));
  };
  
  // Define rows untuk tabel berdasarkan paginatedParticipants
  const rows = paginatedParticipants.map((participant) => ({
    "Nama Peserta": participant.namaPeserta,
    "Status Kompetensi": (
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        {/* {kompetensiStatus[participant.id] ? ( */}
        {participant.statusKompetensi ? (
          // Tampilkan status jika sudah dinilai
          <Typography variant="body2" style={{ fontWeight: "bold", color: kompetensiStatus[participant.id] === "Kompeten" ? "green" : "red" }}>
            {participant.statusKompetensi}
          </Typography>
        ) : (
          // Tampilkan tombol jika belum dinilai
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleKompetensiChange(participant.id, "Kompeten")}
            >
              Kompeten
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleKompetensiChange(participant.id, "Tidak Kompeten")}
            >
              Tidak Kompeten
            </Button>
          </>
        )}
      </div>
    ),
  }));

  const signOut = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/");
  };

  const backToHome = () => {
    history.push("/dashboard");
  };

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
           
          {/* Select Jadwal */}
          <VuiBox display="flex" alignItems="center" mb={2}>
            <VuiTypography component="label" variant="button" color="text" fontWeight="medium" mr={4}>
              Pilih Jadwal Ujikom:
            </VuiTypography>
            <Select
              fullWidth
              value={selectedJadwal || ""}
              onChange={(e) => setSelectedJadwal(e.target.value)}
              displayEmpty
              sx={{ background: "rgba(0, 0, 50, 0.8)", color: "white", borderRadius: "8px" }}
            >
              <MenuItem value="" disabled>Pilih Jadwal Ujikom</MenuItem>
              {dataJadwal.findAllJadwal.map((jadwal) => {
                  if (jadwal.JadwalUjikoms.length > 0 && jadwal.JadwalUjikoms[0].tanggalWaktu) {
                    const tanggalWaktu = new Date(jadwal.JadwalUjikoms[0].tanggalWaktu).toLocaleString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <MenuItem key={jadwal.id} value={jadwal.id}>
                        {tanggalWaktu}
                      </MenuItem>
                    );
                  }
                  return null;
                })}
            </Select>
          </VuiBox>

          {/* Show Table after Selecting Jadwal */}
          {selectedJadwal && filteredParticipants.length > 0 && (
  <>
    <Table columns={columns} rows={rows} />
    <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#1976d2",
          },
          "& .Mui-selected": {
            backgroundColor: "#1976d2",
            color: "#fff",
          },
        }}
      />
    </div>
  </>
)}
          </VuiBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PenilaianStatusKompeten;
