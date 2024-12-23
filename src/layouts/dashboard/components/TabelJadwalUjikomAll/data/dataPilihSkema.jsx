import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import Lottie from "react-lottie";
import * as loaderData from "../../../../../assets/loader/lottieLego.json";
import { pilihSkemaUjikom } from "store/action/userAction";

export default function data() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userReducers.userLogin);
  const allJadwal = useSelector((state) => state.userReducers.allJadwal);
  const allJadwalError = useSelector((state) => state.userReducers.allJadwalError);
  const loadAllJadwal = useSelector((state) => state.userReducers.loadingJadwalFetch);

  const handleSelectJadwal = (jadwal) => {
    const access_token = userLogin.access_token;
    dispatch(pilihSkemaUjikom({ access_token, jadwal }));
     history.push('/')
  };

  // Lottie loader config
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Show loading animation if data is still being loaded
  if (loadAllJadwal) {
    return (
      <VuiBox>
        <Lottie options={defaultOptions} />
      </VuiBox>
    );
  }

  const columns = [
    { name: "Skema", align: "center" },
    { name: "Tanggal", align: "center" },
    { name: "Sektor", align: "center" },
    { name: "Terdaftar", align: "center" },
    { name: "Aksi", align: "center" },
  ];

  const rows =
    allJadwal.findAllJadwal.length > 0
      ? allJadwal.findAllJadwal.map((jadwal, index) => ({
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
              <VuiTypography
                onClick={() => handleSelectJadwal(jadwal)}
                component="a"
                variant="button"
                color="white"
                fontWeight="bold"
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
                Pilih
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
        ];

  return { columns, rows };
}
