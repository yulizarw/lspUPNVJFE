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
import { fetchParticipants, fetchDocumentsStatus, downloadDocument } from "store/action/asesorAction";

function PengesahanDokumen() {
  const dispatch = useDispatch();
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  // Redux selectors to get data from the store
  const participants = useSelector((state) => state.asesorReducers.participants);
  const documentStatus = useSelector((state) => state.asesorReducers.documentStatus);
  const loading = useSelector((state) => state.asesorReducers.loading);

  useEffect(() => {
    // Fetch participants list on page load
    dispatch(fetchParticipants());
  }, [dispatch]);

  const handleParticipantChange = (participant) => {
    setSelectedParticipant(participant);
    dispatch(fetchDocumentsStatus(participant.id)); // Fetch document statuses for the selected participant
  };

  const handleDownload = (documentId) => {
    dispatch(downloadDocument(documentId)); // Trigger document download
  };

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Sidenav
            color="primary"
            brand="LSP UPNVJ"
            routes={routesSidenavAsesor}
          />
        </Grid>

        <Grid item xs={12} md={9}>
          <DashboardNavbar />

          <Card>
            <VuiBox px={3} py={2}>
              <VuiTypography variant="h4" color="primary" fontWeight="bold" mb={2}>
                Pengesahan Dokumen Uji Kompetensi
              </VuiTypography>

              <Typography variant="h6">Pilih Peserta Ujikom:</Typography>
              <Select
                fullWidth
                value={selectedParticipant || ""}
                onChange={(e) => handleParticipantChange(e.target.value)}
                displayEmpty
                style={{ marginBottom: "20px" }}
              >
                <MenuItem value="" disabled>Pilih Peserta</MenuItem>
                {participants.map((participant) => (
                  <MenuItem key={participant.id} value={participant}>
                    {participant.name}
                  </MenuItem>
                ))}
              </Select>

              {loading ? (
                <CircularProgress />
              ) : (
                selectedParticipant && (
                  <div>
                    <Typography variant="h6" mb={2}>
                      Status Dokumen Peserta: {selectedParticipant.name}
                    </Typography>

                    <ul>
                      {documentStatus.map((doc) => (
                        <li key={doc.id} style={{ marginBottom: "10px" }}>
                          <Typography>
                            {doc.name}: {doc.status === "uploaded" ? "Sudah diunggah" : "Belum diunggah"}
                          </Typography>
                          {doc.status === "uploaded" && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleDownload(doc.id)}
                            >
                              Unduh
                            </Button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </VuiBox>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default PengesahanDokumen;
