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

        <DocumentAsesi participant={participant} ></DocumentAsesi>
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
