import React from 'react';

// @mui material components
import Grid from "@mui/material/Grid";

import { Card, LinearProgress, Stack, Radio, RadioGroup, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";

import VuiAlert from 'components/VuiAlert';
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


// import { Radio, RadioGroup } from '@chakra-ui/react'
// Vision UI Dashboard React base styles

import colors from "assets/theme/base/colors";

// store
import { logOut } from "../../store/action/userAction"
import { simpanAPL02Peserta } from "../../store/action/userAction";

import logoUpn from "../../assets/images/LOGO UPNVJ.png"
//loader
import Lottie from "react-lottie";
import * as loaderData from "../../assets/loader/lottieLego.json"

function isiAPL02() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userReducers.userLogin);

  const loadingJadwal = useSelector((state) => state.userReducers.loadingJadwalFetch);

  const loadAllJadwal = useSelector((state) => state.userReducers.loadingJadwalFetch)

  const successPostMUK = useSelector((state) => state.userReducers.statusPostMUK)

  const listAPL02Peserta = useSelector((state) => state.userReducers.listAPL02Peserta)

  const dataPribadi = useSelector((state) => state.userReducers.dataPribadi)
  const [loading, setLoading] = useState(true); // State to manage loading status

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
    // console.log("listAPL02Peserta:", listAPL02Peserta); // Debug initial data
    // Simulate fetching data and setting it to formData.dynamicFields
    setFormData((prevFormData) => ({
      ...prevFormData,
      dynamicFields: listAPL02Peserta, // Populate with mockData
    }));
  }, [listAPL02Peserta]);


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
    dynamicFields: [],
  });


  // Handle changes for namaSkema

  // Update a specific dynamic field
  const handleDynamicFieldChange = (index, key, value) => {
    setFormData((prevFormData) => {
      const updatedFields = [...prevFormData.dynamicFields];
      updatedFields[index][key] = value;
      // console.log(updatedFields,'debug')
      return { ...prevFormData, dynamicFields: updatedFields };
    });
  };
  // Handle form submission
  const handleSubmit = (e) => {

    dispatch(simpanAPL02Peserta({ access_token: userLogin.access_token, formData: formData.dynamicFields }))
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
          {JSON.stringify(listAPL02Peserta)}
          {JSON.stringify(dataPribadi)}
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
          <VuiTypography color="text" variant="button" fontWeight="bold" mb="5px">
            FORM APL-02 : FORMULIR ASESMEN MANDIRI PESERTA
          </VuiTypography>
          <form role="form" component="role" onSubmit={handleSubmit} >
            <VuiTypography color="text" variant="button" fontWeight="bold" mb="5px">
              Materi Uji Kompetensi : Skema Uji Kompetensi {dataPribadi.SkemaUjikom.namaSkema}
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
                  value={dataPribadi.SkemaUjikom.namaSkema}
                  // onChange={handleNamaSkemaChange}
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
                            disabled
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
                            disabled
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
                            disabled
                          />
                        </div>
                        <div>
                          <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                            Kompetensi:
                          </VuiTypography>
                          <select
                            style={{
                              width: "100%",
                              padding: "8px",
                              borderRadius: "4px",
                              border: "1px solid #ccc",
                            }}
                            value={field.fieldValue || ""}
                            onChange={(e) => handleDynamicFieldChange(index, "fieldValue", e.target.value)}
                          >
                            <option value="">Pilih Status</option>
                            <option value="Kompeten">Kompeten</option>
                            <option value="Tidak Kompeten">Tidak Kompeten</option>
                          </select>
                        </div>
                      </div>


                    )
                  }))}


              </VuiBox>


              {/* Submit Button */}
              <VuiBox mt={2} mb={1}>
                <VuiButton color="primary" type="submit">
                  Simpan APL 02
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

export default isiAPL02;


