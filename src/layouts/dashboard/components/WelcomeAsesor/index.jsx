import React, { Component, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link, Redirect } from "react-router-dom";
import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import gif from "../../../../assets/images/signUppic.jpg"

import { position } from "stylis";
//loader
import Lottie from "react-lottie";
import * as loaderData from "../../../../assets/loader/lottieLego.json"

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";

const WelcomeAsesor = (props) => {
  const { userLogin, lengkapiDataDiriAsesor, lihatJadwalKompetensiAsesor } = props
  const dataAsesor = useSelector((state) => state.userReducers.asesorData) 

  // mengubah nama variabel karena data backend diganti biar ada jadwal di include dalam data
  // const dataAsesor = dataAsesor1.Asesor


 
  // lotie loader
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };



  // if (!dataAsesor?.Asesor.SkemaUjikom?.namaSkema && !localStorage.getItem("namaSkema")) {
  //   return (
  //     <DashboardLayout>
  //       <Grid>
  //         <VuiBox>
  //           <Lottie options={defaultOptions} />
  //         </VuiBox>
  //       </Grid>
  //     </DashboardLayout>
  //   );
  // }
  return (
    <Card sx={() => ({
      height: "100%",
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

      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between" >

        <>
       
          {dataAsesor !== null ? (
            <>
              <VuiBox
                display="flex"
                flexDirection="column">
                <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
                  Selamat Datang Asesor,
                </VuiTypography>
                {userLogin.photo && (
                  <VuiBox
                    component="img"
                    src={userLogin.photo}
                    onError={(e) => { e.target.onerror = null; e.target.src = gif }}
                    sx={{
                      width: "7rem",  // Size of the image
                      height: "7rem",
                      borderRadius: "20%",  // Makes the image circular
                      objectFit: "cover",   // Ensures the image covers the container without distortion
                      marginBottom: "16px",  // Adds some space between the image and the text below
                      alignItems: "center",
                      // objectFit:"center"

                    }}
                  />
                )
                }
                <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
                  {dataAsesor.Asesor.namaAsesor}
                </VuiTypography>

                <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
                  Anda telah terdaftar sebagai Asesor Skema Uji Kompetensi :
                  {/* <br />{dataAsesor.SkemaUjikom.namaSkema || localStorage.getItem('namaSkema')} */}
                  {dataAsesor?.Asesor?.SkemaUjikom?.namaSkema ? (
                    <div>{dataAsesor.Asesor.SkemaUjikom.namaSkema}</div>
                  ) : (
                    <div>Loading...</div>
                  )}
                </VuiTypography>
              </VuiBox>

  
              {dataAsesor?.Asesor?.jadwalSkemaUjikomId !== null ? (
              
                  <VuiTypography
                    component="a"
                    onClick={lihatJadwalKompetensiAsesor}
                    // href="/jadwal-ujikom"
                    variant="button"
                    color="white"
                    fontWeight="regular"
                    sx={{
                      mr: "5px",
                      display: "inline-flex",
                      alignItems: "center",
                      cursor: "pointer",

                      "& .material-icons-round": {
                        fontSize: "1.125rem",
                        transform: `translate(2px, -0.5px)`,
                        transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                      },

                      "&:hover .material-icons-round, &:focus  .material-icons-round": {
                        transform: `translate(6px, -0.5px)`,
                      },
                    }}
                  >
                    Lihat Jadwal Pengujian Sertifikasi Kompetensi Anda
                    <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
                  </VuiTypography>
        
              ) : (
                <VuiTypography
                  component="a"
                  // onClick={lihatJadwalKompetensi}
                  // href="/jadwal-ujikom"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  sx={{
                    mr: "5px",
                    display: "inline-flex",
                    alignItems: "center",
                    cursor: "pointer",

                    "& .material-icons-round": {
                      fontSize: "1.125rem",
                      transform: `translate(2px, -0.5px)`,
                      transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                    },

                    "&:hover .material-icons-round, &:focus  .material-icons-round": {
                      transform: `translate(6px, -0.5px)`,
                    },
                  }}
                >
                  Anda Belum dijadwalkan untuk melakukan Pengujian Kompetensi
                  <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
                </VuiTypography>
              )}

            </>
          ) : (
            <>
              <VuiBox display="flex"
                flexDirection="column"

              >
                <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
                  Selamat Datang Asesor,
                </VuiTypography>
                {userLogin.photo && (
                  <VuiBox
                    component="img"
                    src={userLogin.photo}
                    onError={(e) => { e.target.onerror = null; e.target.src = gif }}
                    sx={{
                      width: "7rem",  // Size of the image
                      height: "7rem",
                      borderRadius: "20%",  // Makes the image circular
                      objectFit: "cover",   // Ensures the image covers the container without distortion
                      marginBottom: "16px",  // Adds some space between the image and the text below
                      alignItems: "center",
                      // objectFit:"center"
                    }}
                  />
                )}
                <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
                  {userLogin.userName}
                </VuiTypography>
                <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
                  Anda belum Melengkapi data diri Asesor
                  <br /> Silahkan lengkapi data diri Asesor anda disini
                </VuiTypography>
              </VuiBox>
              <VuiTypography
                component="a"
                onClick={lengkapiDataDiriAsesor}
                variant="button"
                color="white"
                fontWeight="regular"
                sx={{
                  mr: "5px",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",

                  "& .material-icons-round": {
                    fontSize: "1.125rem",
                    transform: `translate(2px, -0.5px)`,
                    transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                  },

                  "&:hover .material-icons-round, &:focus  .material-icons-round": {
                    transform: `translate(6px, -0.5px)`,
                  },
                }}
              >
                Isi kelengkapan data diri anda
                <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
              </VuiTypography>
            </>
          )}

        </>

      </VuiBox>
    </Card >
  );
};

export default WelcomeAsesor;
