// @mui material components
import Tooltip from "@mui/material/Tooltip";

import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";

// Images
import AdobeXD from "examples/Icons/AdobeXD";
import Atlassian from "examples/Icons/Atlassian";
import Slack from "examples/Icons/Slack";
import Spotify from "examples/Icons/Spotify";
import Jira from "examples/Icons/Jira";
import Invision from "examples/Icons/Invision";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import { SettingsBackupRestoreOutlined } from "@mui/icons-material";
import { all } from "axios";

//loader
import Lottie from "react-lottie";
import * as loaderData from "../../../../assets/loader/lottieLego.json"

export default function data() {
  const allJadwal = useSelector((state) => state.userReducers.allJadwal)
  const loadAllJadwal = useSelector((state) => state.userReducers.loadingJadwalFetch)

  // untuk debug jika tidak ada data
  // const allJadwal = {
  //   findAllJadwal: []
  // }
  // lotie loader
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
 
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
  
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <VuiAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { dark } }) =>
              `${borderWidth[2]} solid ${dark.focus}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {

    columns: [
      { name: "Skema", align: "center" },
      { name: "Tanggal", align: "center" },
      { name: "Sektor", align: "center" },
      { name: "Terdaftar", align: "center" },
      { name: "Aksi", align: "center" },
    ],

    // rows: allJadwal.findAllJadwal.map((jadwal) => {
    //   return {
    //     Skema: (
    //       <VuiTypography color="white" variant="button" fontWeight="medium">
    //         {jadwal.namaSkema}
    //       </VuiTypography>
    //     ),
    //     Tanggal: (
    //       <VuiBox display="flex" alignItems="center">
    //         {jadwal.JadwalUjikoms.map((ujikom) => (
    //           <VuiTypography key={ujikom.id} color="white" variant="button" fontWeight="medium">
    //             {new Date(ujikom.tanggalWaktu).toLocaleDateString()} {/* Format date as needed */}
    //           </VuiTypography>
    //         ))}
    //       </VuiBox>
    //     ),
    //     Sektor: (
    //       <VuiTypography color="white" variant="button" fontWeight="medium">
    //         {jadwal.sektorSkema}
    //       </VuiTypography>
    //     ),
    //     Terdaftar: (
    //       <VuiTypography color="white" variant="button" fontWeight="bold">
    //         {jadwal.PesertaUjikoms.length}
    //       </VuiTypography>
    //     ),
    //     Aksi: (
    //       <VuiBox width="8rem" textAlign="center">
    //         <VuiTypography color="white" variant="button" fontWeight="bold">
    //           View
    //         </VuiTypography>
    //         {/* Add more actions or buttons as needed */}
    //       </VuiBox>
    //     ),
    //   };
    // })
    rows: allJadwal.findAllJadwal.length > 0
      ? allJadwal.findAllJadwal.map((jadwal) => ({
        Skema: (
          <VuiTypography color="white" variant="button" fontWeight="medium">
            {jadwal.namaSkema}
          </VuiTypography>
        ),
        Tanggal: (
          <VuiBox display="flex" alignItems="center">
            {jadwal.JadwalUjikoms.map((ujikom) => (
              <VuiTypography
                key={ujikom.id}
                color="white"
                variant="button"
                fontWeight="medium"
              >
                {new Date(ujikom.tanggalWaktu).toLocaleDateString()}
              </VuiTypography>
            ))}
          </VuiBox>
        ),
        Sektor: (
          <VuiTypography color="white" variant="button" fontWeight="medium">
            {jadwal.sektorSkema}
          </VuiTypography>
        ),
        Terdaftar: (
          <VuiTypography color="white" variant="button" fontWeight="bold">
            {jadwal.PesertaUjikoms.length}
          </VuiTypography>
        ),
        Aksi: (
          <VuiBox width="8rem" textAlign="center">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              View
            </VuiTypography>
          </VuiBox>
        ),
      }))
      : [
        {
          Skema: (
            <VuiTypography color="white" variant="button" fontWeight="medium">
              -
            </VuiTypography>
          ),
          Tanggal: <VuiTypography color="white">-</VuiTypography>,
          Sektor: <VuiTypography color="white">-</VuiTypography>,
          Terdaftar: <VuiTypography color="white">-</VuiTypography>,
          Aksi: <VuiTypography color="white">-</VuiTypography>,
        },
      ],


  };

}
