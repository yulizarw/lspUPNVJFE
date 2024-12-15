import React from 'react';
//  lalu logic untuk peserta ngambil apl02dynamic karena akan hubungan ke hapus
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack, Radio, RadioGroup, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import GradientBorder from "examples/GradientBorder";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import VuiAlert from 'components/VuiAlert';
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// / Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import IconButton from "@mui/material/IconButton";

// import { Radio, RadioGroup } from '@chakra-ui/react'
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
// import TableJadwalUjikom from "./components/TabelJadwalUjikomAll/tableJadwalSkemaUjikom";
import JadwalUjikom from "layouts/pesertaUjikom/jadwalUjikom";

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
import { logOut } from "../../store/action/userAction"
import { fetchDataPribadi, fetchJadwalUjikomPeserta, fetchAllJadwal } from "../../store/action/userAction";

import logoUpn from "../../assets/images/LOGO UPNVJ.png"
//loader
import Lottie from "react-lottie";
import * as loaderData from "../../assets/loader/lottieLego.json"
// import TablePilihSkema from "./components/TabelJadwalUjikomAll/tablePilihSkema";

import { listAPL02Asesor, addMUK, destroyMUK } from "../../store/action/userAction"

function IsiKUK() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userReducers.userLogin);
  const dataUser = useSelector((state) => state.userReducers.dataPribadi);
  const dataAsesor = useSelector((state) => state.userReducers.asesorData)
  const jadwalPeserta = useSelector((state) => state.userReducers.jadwalPesertaUjikom);
  const jadwalPesertaError = useSelector((state) => state.userReducers.jadwalPesertaError);
  const loadingJadwal = useSelector((state) => state.userReducers.loadingJadwalFetch);
  const allJadwal = useSelector((state) => state.userReducers.allJadwal)
  const allJadwalError = useSelector((state) => state.userReducers.allJadwalError)
  const loadAllJadwal = useSelector((state) => state.userReducers.loadingJadwalFetch)
  const statusPilihSkemaPeserta = useSelector((state) => state.userReducers.statusPilihSkemaPeserta)
  const listAPL02 = useSelector((state) => state.userReducers.listAPL02Asesor)
  const successPostMUK = useSelector((state) => state.userReducers.statusPostMUK)
  const statusErrorPostMUK = useSelector((state) => state.userReducers.errorPostMUK)
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [isToggled, setIsToggled] = useState(false);
  const [pilihSkema, setPilihan] = useState(false)

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
    dispatch(listAPL02Asesor(userLogin.access_token))
  }, [userLogin])

  useEffect(() => {
    if (successPostMUK === true) {
      history.push('/')
    }
    // else {
    //   return (
    //     <VuiAlert color="error" dismissible onClose={() => setShowErrorAlert(false)}>
    //       {/* {statusErrorPostMUK.message || successPostMUK } */}
    //       {successPostMUK}
    //     </VuiAlert>

    //   )

    // }
  }, [successPostMUK, history])

  useEffect(() => {
    // Simulate fetching data and setting it to formData.dynamicFields
    setFormData((prevFormData) => ({
      ...prevFormData,
      dynamicFields: listAPL02, // Populate with mockData
    }));
  }, [listAPL02]);
  // Show alert on error
  useEffect(() => {
    if (statusErrorPostMUK) {
      setShowErrorAlert(true);
      // Optionally hide the alert after a few seconds
      const timer = setTimeout(() => setShowErrorAlert(false), 5000); // Hide after 5 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [statusErrorPostMUK]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (2000ms)
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, []);


  const [value, setValue] = React.useState('1');
  const { gradients } = colors;
  const { cardContent } = gradients;


  const backToHome = () => {
    history.push('/dashboard')
  }

  const signOut = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/");
  };

  // dynamic field
  // Single useState for all form data, including dynamic fields
  const [formData, setFormData] = useState({
    namaSkema: dataAsesor.Asesor.SkemaUjikom.namaSkema,
    dynamicFields: [],
  });

  // generic handle change input all
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };
  // Handle changes for namaSkema
  const handleNamaSkemaChange = (e) => {
    setFormData({ ...formData, namaSkema: e.target.value });
  };

  // Add a new dynamic field
  const addDynamicField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dynamicFields: [
        ...prevFormData.dynamicFields,
        { unitKompetensiId: "", fieldName: "", fieldQuestion: "", fieldValue: "Pending", isSaved: false },
      ],
    }));
  };

  // Remove a dynamic field
  const removeDynamicField = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dynamicFields: prevFormData.dynamicFields.filter((_, i) => i !== index),
    }));
    const passingPayload = formData.dynamicFields[index].id
    dispatch(destroyMUK({ access_token: userLogin.access_token, passingPayload }))
  };

  // Update a specific dynamic field
  const handleDynamicFieldChange = (index, key, value) => {
    setFormData((prevFormData) => {
      const updatedFields = [...prevFormData.dynamicFields];
      updatedFields[index][key] = value;
      return { ...prevFormData, dynamicFields: updatedFields };
    });
  };

  // Update a specific dynamic field and save to backend
  const handleSaveDynamicField = ({ index, isExisting }) => {
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   dynamicFields: [
    //     ...prevFormData.dynamicFields,
    //     { unitKompetensiId: "", fieldName: "", fieldQuestion: "", fieldValue: "Pending", isSaved: true },
    //   ],
    // }));

    // Perbarui status field menjadi disimpan
    setFormData((prevFormData) => {
      const updatedFields = [...prevFormData.dynamicFields];
      updatedFields[index].isSaved = true;
      return { ...prevFormData, dynamicFields: updatedFields };
    });
    dispatch(addMUK({ access_token: userLogin.access_token, formData, listAPL02, isExisting }))

  };


  // Handle form submission
  const handleSubmit = (e) => {
    // e.preventDefault(); agar dia ngerefresh page jadi gk pwa tapi udah di save di cek access token berkala di dashboard
    // Submit the formData object to the backend
    dispatch(addMUK({ access_token: userLogin.access_token, formData, listAPL02 }))
  };
  // end

  const [showErrorAlert, setShowErrorAlert] = useState(false);
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

  return (
    <DashboardLayout>
      <DashboardNavbar userLogin={userLogin} signOut={signOut} backToHome={backToHome} />

      {showErrorAlert && (
        <VuiAlert color="error" dismissible onClose={() => setShowErrorAlert(false)}>
          {/* {statusErrorPostMUK.message || successPostMUK } */}
          {successPostMUK}
        </VuiAlert>
      )}
      <Card sx={() => ({
        height: 'auto',
        py: "32px",
        // backgroundImage: `url(${userLogin.photo})`,
        // backgroundSize: "20%",
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "top",
        // backgroundPosition: "top right",  // Center the image at the top
        // display: "flex",
        // flexDirection: "column",

        // justifyContent: "flex-start",   // Ensure the content starts at the top
      })}>

        <VuiBox py={3} sx={{
          "& th": {
            borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
              `${borderWidth[1]} solid ${grey[700]}`,
          },
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                `${borderWidth[1]} solid ${grey[700]}`,
            },
          },
        }}>

          <VuiBox display="flex" alignItems="center" mb="32px">
            <img
              alt="Logo LSP UPN Veteran Jakarta"
              style={{ width: '50px', height: '50px', marginRight: '16px' }}
              src={logoUpn}
            />
            <VuiTypography variant="h4" color="white" fontWeight="bold">
              Lembaga Sertifikasi Profesi UPN Veteran Jakarta
            </VuiTypography>

          </VuiBox>
          <form role="form" component="role" onSubmit={handleSubmit} >
            <VuiTypography color="text" variant="button" fontWeight="bold" mb="5px">
              Materi Uji Kompetensi : Skema Uji Kompetensi {dataAsesor.Asesor.SkemaUjikom.namaSkema}
            </VuiTypography>

            <VuiBox py={3} sx={{
              "& th": {
                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                  `${borderWidth[1]} solid ${grey[700]}`,
              },
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              },
            }}>


              {/* Input for namaSkema */}
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Nama Skema:
                </VuiTypography>
                <VuiInput
                  type="text"
                  value={formData.namaSkema}
                  onChange={handleNamaSkemaChange}
                  placeholder="Enter Nama Skema"
                  disabled
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                />
              </VuiBox>

              {/* Dynamic Fields */}
              <VuiBox mb={1} ml={0.5}>

                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Materi Uji Kompetensi (MUK)
                </VuiTypography>

                {formData.dynamicFields.length === 0 ? (
                  <VuiTypography color="text" variant="button" mt={2} sx={{ mt: 2, display: "block" }}>
                    Tidak ada data Materi Uji Kompetensi. Tambahkan materi baru menggunakan tombol di bawah.
                  </VuiTypography>
                )
                  : (formData.dynamicFields.map((field, index) => {
                    // Cek apakah unitKompetensiId sudah ada di database
                    const isExisting = listAPL02.some((item) => item.unitKompetensiId === field.unitKompetensiId);


                    return (
                      <div key={index} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
                        <div>
                          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                            Nomor KUK:
                          </VuiTypography>
                          <VuiInput
                            type="input"
                            value={field.unitKompetensiId}
                            onChange={(e) =>
                              handleDynamicFieldChange(index, "unitKompetensiId", e.target.value)
                            }
                            placeholder="Enter Unit Kompetensi ID"
                            required
                          />
                        </div>
                        <div>
                          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                            Elemen Kompetensi :
                          </VuiTypography>
                          <VuiInput
                            type="text"
                            value={field.fieldName}
                            onChange={(e) => handleDynamicFieldChange(index, "fieldName", e.target.value)}
                            placeholder="Enter Field Name"
                            required
                          />
                        </div>
                        <div>

                          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                            Pertanyaan Unit Kompetensi :
                          </VuiTypography>
                          <VuiInput
                            type="text"
                            value={field.fieldQuestion}
                            onChange={(e) =>
                              handleDynamicFieldChange(index, "fieldQuestion", e.target.value)
                            }
                            placeholder="Enter Field Question"
                            required
                          />
                        </div>
                        {/* <div>
                      <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                        Elemen Kompetensi :
                      </VuiTypography>
                      <VuiInput
                        type="text"
                        value={field.fieldValue}
                        onChange={(e) => handleDynamicFieldChange(index, "fieldValue", e.target.value)}
                        placeholder="Enter Field Value"
                        disabled
                      />
                    </div> */}

                        {/* Tombol Simpan hanya jika tidak ada di database */}
                        {!field.isSaved && !isExisting && (
                          <VuiBox mt={2} mb={1}>
                            <VuiButton
                              color="success"
                              type="button"
                              onClick={() => handleSaveDynamicField({ index, isExisting })}
                            >
                              Simpan Materi Uji Ini
                            </VuiButton>
                          </VuiBox>
                        )}

                        <VuiBox mt={2} mb={1}>
                          <VuiButton color="error" type="button" onClick={() => removeDynamicField(index)}>
                            Hapus Materi Uji Ini
                          </VuiButton>
                        </VuiBox>
                      </div>
                    )
                  }))}

                <VuiBox mt={2} mb={1}>
                  <VuiButton color="info" type="button" onClick={addDynamicField}>
                    Tambah Materi Uji
                  </VuiButton>
                </VuiBox>
              </VuiBox>

              {/* Submit Button */}
              <VuiBox mt={2} mb={1}>
                <VuiButton color="primary" type="submit">
                  Simpan MUK
                </VuiButton>
              </VuiBox>
            </VuiBox>

          </form>





        </VuiBox>
      </Card>

      <Footer />
    </DashboardLayout>
  );
}

export default IsiKUK;


