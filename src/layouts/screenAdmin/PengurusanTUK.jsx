

// export default PengurusanTUK
import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { addTUKAction } from "../../store/action/adminAction";
import { Card, CardContent, Typography, TextField, Button, Grid, IconButton, Alert } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { logOut } from "../../store/action/userAction";
// import VisionUILayout from "examples/LayoutContainers/VisionUILayout"; // Import Layout Vision UI
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Sidenav from "./Sidenav/index"
import routesSidenavAdmin from "./Sidenav/routes"

// styling
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";

import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";

const PengurusanTUK = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const userLogin = useSelector((state) => state.userReducers.userLogin);
  const [controller] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const [formData, setFormData] = useState({
    namaTUK: "",
    lokasiTUK: "",
    lat: "",
    long: "",
  });

  const [files, setFiles] = useState({
    sptVerifikasiTUK: null,
    rekamanVerifikasi: null,
    skPenetapanTUK: null,
  });

  const signOut = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/");
  };
  const backToHome = () => {
    history.push('/dashboard')
  }

  const [alertMessage, setAlertMessage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleRemoveFile = (name) => {
    setFiles({ ...files, [name]: null });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // const data = new FormData();

    // Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    // Object.keys(files).forEach((key) => {
    //   if (files[key]) data.append(key, files[key]);
    // });

    // dispatch(addTUKAction({access_token:userLogin.access_token, data}))
    e.preventDefault();
    const data = new FormData();

    // Append text fields
    Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
    });

    // Append files if available
    Object.keys(files).forEach((key) => {
        if (files[key]) {
            data.append(key, files[key]);
        }
    });

    // Dispatch action to Redux
    dispatch(addTUKAction({access_token:userLogin.access_token, data}));
    history.push('/')
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
    // <DashboardLayout>
    < Grid container style={{ minHeight: "100vh" }}  >
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
          routes={routesSidenavAdmin}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave} />
      </Grid>
      <Grid item xs={10} style={{ padding: "20px" }}>
        <DashboardNavbar userLogin={userLogin} signOut={signOut} backToHome={backToHome} />
        <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 3 }}>
          <CardContent>
            <VuiTypography variant="h5" color="white" gutterBottom sx={{ color: "text" }}>
              Tambah TUK
            </VuiTypography>

            {alertMessage && (
              <Alert severity={alertMessage.type} sx={{ mb: 2 }}>
                {alertMessage.text}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    placeholder="Nama TUK"
                    type="text"
                    label="Nama TUK"
                    name="namaTUK"
                    value={formData.namaTUK}
                    onChange={handleInputChange}
                    required
                    size="small"
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px", // Membuat sudut lebih halus
                        backgroundColor: "white", // Pastikan background tetap kontras
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "14px", // Mengecilkan ukuran teks label
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "10px 12px", // Mengurangi padding dalam input
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    placeholder="Lokasi TUK"
                    size="small"
                    label="Lokasi TUK"
                    name="lokasiTUK"
                    value={formData.lokasiTUK}
                    onChange={handleInputChange}
                    required
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px", // Membuat sudut lebih halus
                        backgroundColor: "white", // Pastikan background tetap kontras
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "14px", // Mengecilkan ukuran teks label
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "10px 12px", // Mengurangi padding dalam input
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Latitude"
                    name="lat"
                    value={formData.lat}
                    onChange={handleInputChange}
                    required
                    size="small"
                    placeholder="Latitude"
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px", // Membuat sudut lebih halus
                        backgroundColor: "white", // Pastikan background tetap kontras
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "14px", // Mengecilkan ukuran teks label
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "10px 12px", // Mengurangi padding dalam input
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Longitude"
                    name="long"
                    value={formData.long}
                    onChange={handleInputChange}
                    required
                    size="small"
                    placeholder="Longitude"
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px", // Membuat sudut lebih halus
                        backgroundColor: "white", // Pastikan background tetap kontras
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "14px", // Mengecilkan ukuran teks label
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "10px 12px", // Mengurangi padding dalam input
                      },
                    }}
                  />
                </Grid>

                {["sptVerifikasiTUK", "rekamanVerifikasi", "skPenetapanTUK"].map((fileKey, index) => (
                  <Grid item xs={12} key={index}>
                   
                    <label htmlFor={fileKey}>
                      <VuiTypography>
                        {fileKey}
                      </VuiTypography>
                      <input
                        type="file"
                        name={fileKey}
                        id={fileKey}
                        style={{ display: "none" , color:"white"}}
                        onChange={handleFileChange}
                      />
                      <Button
                        variant="contained"
                        component="span"
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                        sx={{ mt: 2 }}
                      >
                        {files[fileKey] ? "Ganti File" : "Upload File"}
                      </Button>
                    </label>

                    {/* Tampilkan nama file atau placeholder */}
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                      <Typography variant="body2" noWrap sx={{ maxWidth: "80%" }}>
                        {files[fileKey]?.name || "Belum ada file"}
                      </Typography>
                      {files[fileKey] && (
                        <IconButton onClick={() => handleRemoveFile(fileKey)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                ))}


                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    Tambah TUK
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    // </DashboardLayout>
  );
};

export default PengurusanTUK;
