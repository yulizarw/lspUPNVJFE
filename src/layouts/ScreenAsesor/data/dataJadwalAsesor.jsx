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

export default function data() {
  
  const dataAsesor = useSelector((state) => state.userReducers.asesorData) || {}
  const dataAsesorError = useSelector((state) => state.userReducers.asesorDataError)
  const loadDataAsesor = useSelector((state) => state.userReducers.loadDataAsesor)

  // untuk debug jika tidak ada data
  // const allJadwal = {
  //   findAllJadwal: []
  // }



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
      { name: "Nomor Skema", align: "center" },
      { name: "Sektor Skema", align: "center" },
      { name: "Jenis Skema", align: "center" },
      { name: "Tanggal", align: "center" },
      { name: "Waktu", align: "center" },
    ],
   
    rows: [
      {
        Skema: (
          <VuiTypography color="white" variant="button" fontWeight="medium">
            {dataAsesor.Asesor.SkemaUjikom.namaSkema}
          </VuiTypography>
        ),
        "Nomor Skema": (
          <VuiTypography color="white" variant="button" fontWeight="medium">
            {/* {jadwalPeserta.nomorSkema} */}
            {dataAsesor.Asesor.SkemaUjikom.nomorSkema}
          </VuiTypography>
        ),
        "Sektor Skema": (
          <VuiTypography color="white" variant="button" fontWeight="medium">
            {/* {jadwalPeserta.sektorSkema} */}
            {dataAsesor.Asesor.SkemaUjikom.sektorSkema}
            
          </VuiTypography>
        ),
        "Jenis Skema": (
          <VuiTypography color="white" variant="button" fontWeight="medium">
            {/* {jadwalPeserta.jenisSkema} */}
            {dataAsesor.Asesor.SkemaUjikom.jenisSkema}
          </VuiTypography>
        ),
        Tanggal: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography  color="white" variant="button" fontWeight="medium">
              {new Date(dataAsesor.filterJadwal.tanggalWaktu).toLocaleDateString()} 
              {/* Format date as needed */}
            </VuiTypography>
          </VuiBox>
        ),
        Waktu: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography  color="white" variant="button" fontWeight="medium">
              {new Date(dataAsesor.filterJadwal.tanggalWaktu).toLocaleTimeString()} 
              {/* // Format date as needed */}
            </VuiTypography>
          </VuiBox>
        ),

        // Terdaftar: (
        //   <VuiTypography color="white" variant="button" fontWeight="bold">
        //     {jadwal.PesertaUjikoms.length}
        //   </VuiTypography>
        // ),

      }
    ]
  }
}
