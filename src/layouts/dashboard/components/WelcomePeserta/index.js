import React, { Component, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link, Redirect } from "react-router-dom";
import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import gif from "../../../../assets/images/signUppic.jpg"




const WelcomePeserta = (props) => {
  const { userLogin, dataUser, lihatJadwalKompetensi, isiDataDiriPeserta, pilihSkemaKompetensi } = props
  console.log(dataUser, 'Datauser')
  return (
    <Card sx={() => ({
      height: "340px",
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
          {dataUser.id && dataUser.skemaUjikomId !== null && dataUser.jadwalUjikomId !== null ? (
            <>
              <VuiBox display="flex" flexDirection="column">
                <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
                  Selamat Datang Kembali,
                </VuiTypography>
                <VuiBox display="flex" alignItems="center" justifyContent="space-between">

                  {userLogin.photo && (
                    <VuiBox
                      component="img"
                      src={userLogin.photo}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = gif;
                      }}
                      sx={{
                        width: "7rem", // Size of the image
                        height: "7rem",
                        borderRadius: "20%", // Makes the image circular
                        objectFit: "cover", // Ensures the image covers the container without distortion
                        marginBottom: "16px", // Adds some space between the image and the text below
                        alignItems: "center",
                      }}
                    />
                  )}
                  {/* Status Kompetensi */}
                  {/* <VuiBox display="flex" alignItems="center" mt={1}>
                    
                    {dataUser.statusKompetensi === "Kompeten" ? (
                      <>
                        <Icon sx={{ color: "green", fontSize: 24, marginRight: "8px" }}>check_circle</Icon>
                        <VuiTypography color="green" variant="h6">Kompeten</VuiTypography>
                      </>
                    ) : dataUser.statusKompetensi === "Tidak Kompeten" ? (
                      <>
                        <Icon sx={{ color: "red", fontSize: 24, marginRight: "8px" }}>cancel</Icon>
                        <VuiTypography color="red" variant="h6">Tidak Kompeten</VuiTypography>
                      </>
                    ) : (
                      <>
                        <Icon sx={{ color: "gray", fontSize: 24, marginRight: "8px" }}>info</Icon>
                        <VuiTypography color="gray" variant="h6">Bukan Periode Penilaian</VuiTypography>
                      </>
                    )}
                  </VuiBox> */}
                  <VuiBox display="flex" flexDirection="column">
                    <VuiTypography color="white" variant="button" fontWeight="regular" mb="4px">
                      Hasil Uji Kompetensi Anda:
                    </VuiTypography>
                    <VuiBox display="flex" alignItems="center">
                      {dataUser.statusKompetensi === "Kompeten" ? (
                        <>
                          <Icon sx={{ color: "green", fontSize: 24, marginRight: "8px" }}>check_circle</Icon>
                          <VuiTypography color="success" variant="h6" fontWeight="regular" mb="auto">Kompeten</VuiTypography>
                        </>
                      ) : dataUser.statusKompetensi === "Tidak Kompeten" ? (
                        <>
                          <Icon sx={{ color: "red", fontSize: 24, marginRight: "8px" }}>cancel</Icon>
                          <VuiTypography color="error" variant="h6" fontWeight="regular" mb="auto">Tidak Kompeten</VuiTypography>
                        </>
                      ) : (
                        <>
                          <Icon sx={{ color: "gray", fontSize: 24, marginRight: "8px" }}>info</Icon>
                          <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">Bukan Periode Penilaian</VuiTypography>
                        </>
                      )}
                    </VuiBox>
                  </VuiBox>
                </VuiBox>
                <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
                  {dataUser.namaPeserta}
                </VuiTypography>

                <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
                  Anda telah terdaftar pada Skema Uji Kompetensi
                  <br /> {dataUser.SkemaUjikom.namaSkema}
                </VuiTypography>
              </VuiBox>
              <VuiTypography
                component="a"
                onClick={lihatJadwalKompetensi}
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
                Lihat Jadwal Uji Kompetensi Anda
                <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
              </VuiTypography>
            </>
          ) : dataUser.skemaUjikomId === null ? (
            <>
              <VuiBox display="flex" flexDirection="column">
                <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
                  Selamat Datang Kembali,
                </VuiTypography>
                {userLogin.photo && (
                  <VuiBox
                    component="img"
                    src={userLogin.photo}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = gif;
                    }}
                    sx={{
                      width: "7rem", // Size of the image
                      height: "7rem",
                      borderRadius: "20%", // Makes the image circular
                      objectFit: "cover", // Ensures the image covers the container without distortion
                      marginBottom: "16px", // Adds some space between the image and the text below
                      alignItems: "center",
                    }}
                  />
                )}
                <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
                  {userLogin.userName}
                </VuiTypography>
                <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
                  Anda belum memilih Skema Uji Kompetensi.
                  <br /> Silakan pilih skema ujian untuk melanjutkan.
                </VuiTypography>
              </VuiBox>
              <VuiTypography
                onClick={pilihSkemaKompetensi}
                component="a"
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
                Pilih Skema Uji Kompetensi
                <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
              </VuiTypography>
            </>
          ) : dataUser.jadwalUjikomId === null ? (<>
            <VuiBox display="flex" flexDirection="column">
              <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
                Selamat Datang Kembali,
              </VuiTypography>
              {userLogin.photo && (
                <VuiBox
                  component="img"
                  src={userLogin.photo}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = gif;
                  }}
                  sx={{
                    width: "7rem", // Size of the image
                    height: "7rem",
                    borderRadius: "20%", // Makes the image circular
                    objectFit: "cover", // Ensures the image covers the container without distortion
                    marginBottom: "16px", // Adds some space between the image and the text below
                    alignItems: "center",
                  }}
                />
              )}
              <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
                {userLogin.userName}
              </VuiTypography>
              <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
                Anda telah terdaftar pada Skema Uji Kompetensi
                <br /> {dataUser.SkemaUjikom.namaSkema}
              </VuiTypography>
            </VuiBox>
            <VuiTypography
              component="a"
              // onClick={pilihSkemaKompetensi}
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
              Admin sedang melakukan plotting jadwal, mohon ditunggu . . .
              <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
            </VuiTypography>
          </>) : (
            <>
              <VuiBox display="flex" flexDirection="column">
                <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
                  Selamat Datang Kembali,
                </VuiTypography>
                {userLogin.photo && (
                  <VuiBox
                    component="img"
                    src={userLogin.photo}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = gif;
                    }}
                    sx={{
                      width: "7rem", // Size of the image
                      height: "7rem",
                      borderRadius: "20%", // Makes the image circular
                      objectFit: "cover", // Ensures the image covers the container without distortion
                      marginBottom: "16px", // Adds some space between the image and the text below
                      alignItems: "center",
                    }}
                  />
                )}
                <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
                  {userLogin.userName}
                </VuiTypography>
                <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
                  Anda belum terdaftar sebagai peserta ujikom
                  <br /> Silakan isi data sebagai Peserta Ujikom terlebih dahulu
                </VuiTypography>
              </VuiBox>
              <VuiTypography
                component="a"
                onClick={isiDataDiriPeserta}
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
                Isi kelengkapan data diri Anda
                <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
              </VuiTypography>
            </>
          )}


        </>

      </VuiBox>
    </Card >
  );
};

export default WelcomePeserta;

