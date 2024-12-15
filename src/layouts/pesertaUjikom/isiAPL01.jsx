import React from 'react';

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
import { logOut, simpanAPL01 } from "../../store/action/userAction"
import { fetchDataPribadi, fetchJadwalUjikomPeserta, fetchAllJadwal } from "../../store/action/userAction";

import logoUpn from "../../assets/images/LOGO UPNVJ.png"
//loader
import Lottie from "react-lottie";
import * as loaderData from "../../assets/loader/lottieLego.json"
// import TablePilihSkema from "./components/TabelJadwalUjikomAll/tablePilihSkema";

function isiAPL01() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userReducers.userLogin);
  const dataUser = useSelector((state) => state.userReducers.dataPribadi);
  const jadwalPeserta = useSelector((state) => state.userReducers.jadwalPesertaUjikom);
  const jadwalPesertaError = useSelector((state) => state.userReducers.jadwalPesertaError);
  const loadingJadwal = useSelector((state) => state.userReducers.loadingJadwalFetch);
  const allJadwal = useSelector((state) => state.userReducers.allJadwal)
  const allJadwalError = useSelector((state) => state.userReducers.allJadwalError)
  const loadAllJadwal = useSelector((state) => state.userReducers.loadingJadwalFetch)
  const statusPilihSkemaPeserta = useSelector((state) => state.userReducers.statusPilihSkemaPeserta)

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
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (2000ms)
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, []);

  // useEffect(() => {
  //   dispatch(fetchDataPribadi(userLogin.access_token))
  //   dispatch(fetchAllJadwal(userLogin.access_token))
  //   dispatch(fetchJadwalUjikomPeserta(userLogin.access_token))
  // }, [userLogin])

  useEffect(() => {
    if (statusPilihSkemaPeserta === true) {
      setPilihan((prevState) => !prevState)
    }
  }, [statusPilihSkemaPeserta])

  const [value, setValue] = React.useState('1');
  const { gradients } = colors;
  const { cardContent } = gradients;


  const backToHome = () => {
    history.push('/dashboard')
  }

  const lihatJadwalKompetensi = () => {
    setIsToggled((prevState) => !prevState)
  }



  // handle change generic all input data

  const [formData, setFormData] = useState({
    nik: "",
    namaLengkap: "",
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamatDomisili: "",
    provinsi: "",
    kota: "",
    kecamatan: "",
    noTelp: 0,
    email: "",
    pendidikanTerakhir: "",
    namaSekolahPT: "",
    jurusanProdi: "",
    pekerjaan: "",
    namaPerusahaan: "",
    jabatan: "",
    alamatPerusahaan: "",
    telpPerusahaan: ""
  })

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize setiap kata
  };

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    if(name !== 'email') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: capitalizeWords(value),
      }));
    }else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(simpanAPL01({access_token:userLogin.access_token, formData}))
    history.push('/')
  }


  const signOut = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/");
  };
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
  const pilihSkemaKompetensi = () => {
    setPilihan((prevState) => !prevState)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar userLogin={userLogin} signOut={signOut} backToHome={backToHome} />
      <Card sx={() => ({
        height: 'auto',
        py: "32px",
      })}>
        <VuiBox
          component="form"
          role="form"
          borderRadius="inherit"
          p="45px"
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.focus,
          })}
          onSubmit={handleSubmit}
        >

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
            <VuiTypography color="text" variant="button" fontWeight="bold" mb="5px">
              FORM APL-01 : FORMULIR PERMOHONAN SERTIFIKASI KOMPETENSI
            </VuiTypography>


            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Nomor Induk Kependudukan :
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                placeholder="Nomor Induk Kependudukan / Nomor Tanda Pengenal"
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
                name="nik"
                value={formData.nik}
                onChange={handleChange}
              />
            </GradientBorder>
          </VuiBox>

          <>
            {/* nama lengkap */}
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Masukkan Nama Lengkap Anda :
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="input"
                  placeholder="Nama Lengkap Anda Sesuai KTP"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleChange}
                />
              </GradientBorder>
            </VuiBox>

            {/* jenis kelamin */}
            <div class="mb-4">
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Jenis Kelamin :
              </VuiTypography>
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-4 mr-4" >
                  <input type="radio" name="jenisKelamin" value="Pria" class="mr-2" onChange={handleChange} />
                  <VuiTypography component="label" variant="button" color="white" >
                    Pria
                  </VuiTypography>
                </div>
                <div class="flex items-center space-x-4">
                  <input type="radio" class="mr-2" name="jenisKelamin" value="Wanita" onChange={handleChange} />
                  <VuiTypography component="label" variant="button" color="white" >
                    Wanita
                  </VuiTypography>
                </div>
              </div>
            </div>

            {/* tempat lahir */}
            {/* <div class="flex items-center space-x-4 mr-4 " >
                <div class="flex items-center space-x-4 " >
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Tempat Lahir :
                  </VuiTypography>
                </div>
                <div class="flex items-center space-x-4 mb-2" >
                  <select class="w-full p-2 rounded">
                    <option value="" disabled selected>Pilih Tempat Lahir</option>
                    <option value="jakarta">Jakarta</option>
                    <option value="bandung">Bandung</option>
                    <option value="surabaya">Surabaya</option>
                    <option value="medan">Medan</option>
                    <option value="yogyakarta">Yogyakarta</option>
                  </select>
                </div>
              </div> */}

            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Masukkan Tempat Lahir Anda :
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="input"
                  placeholder="Tempat Lahir Anda Sesuai KTP"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  // onChange={alamatChange}
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={handleChange}
                />
              </GradientBorder>
            </VuiBox>

            {/* tanggal lahir */}
            <VuiBox mb={2}>
              <div class="mb-4 relative">

                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Masukkan Tanggal Lahir Anda :
                </VuiTypography>
                <div class="relative">

                  <VuiInput type="date"
                    id="dob"
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    class="custom-date-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none" />
                </div>
              </div>
            </VuiBox>

            {/* alamat domisili */}
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Masukkan Alamat Domisili Anda :
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="input"
                  placeholder="Alamat Domisili sesuai dengan KTP"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  multiline rows={5}
                  // onChange={alamatChange}
                  name="alamatDomisili"
                  value={formData.alamatDomisili}
                  onChange={handleChange}
                />
              </GradientBorder>
            </VuiBox>

            {/* provinsi */}
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Provinsi:
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="input"
                  placeholder="Provinsi Domisili sesuai dengan KTP"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  onChange={handleChange}
                  name="provinsi"
                  value={formData.provinsi}
                />
              </GradientBorder>
            </VuiBox>

            {/* kota */}
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Kota:
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="input"
                  placeholder="Kota Domisili sesuai dengan KTP"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  onChange={handleChange}
                  name="kota"
                  value={formData.kota}
                />
              </GradientBorder>
            </VuiBox>

            {/* kecamatan */}
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Kecamatan:
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="input"
                  placeholder="Kecamatan Domisili sesuai dengan KTP"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                 
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleChange}
                />
              </GradientBorder>
            </VuiBox>
            {/* phone number */}
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Nomor Telepon :
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="tel"
                  placeholder="Nomor Telephone yang terdaftar pada WhatsApp"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  name="noTelp"
                  value={formData.noTelp}
                  onChange={handleChange}
                />
              </GradientBorder>
            </VuiBox>

            {/* email */}
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Alamat e-mail :
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="email"
                  placeholder="Email aktif anda"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </GradientBorder>
            </VuiBox>

            {/* pendidikan terakhir */}
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Pendidikan Terakhir:
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="input"
                  placeholder="Pendidikan Terakhir Anda"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  name="pendidikanTerakhir"
                  value={formData.pendidikanTerakhir}
                  onChange={handleChange}
                />
              </GradientBorder>
            </VuiBox>

            {/* nama sekolah / Perguruan tinggi */}
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Nama Sekolah / Perguruan Tinggi:
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="input"
                  placeholder="Nama Sekolah / Perguruan Tinggi Pendidikan Terakhir Anda"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  name="namaSekolahPT"
                  value={formData.namaSekolahPT}
                  onChange={handleChange}
                />
              </GradientBorder>
            </VuiBox>

            {/* Jurusan Prodi */}
            <VuiBox mb={2}>


              <div class="flex items-center space-x-4 mr-4 " >
                <div class="flex items-center space-x-4 " >
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Jurusan / Program Studi :
                  </VuiTypography>
                </div>
                <div class="flex items-center space-x-4 mb-2" >
                  <select class="w-full p-2 rounded" name="jurusanProdi"
                  onChange={handleChange}>
                    <option value="" disabled selected>Jurusan Keilmuan</option>
                    <option value="Ilmu Pengetahuan Alam">Ilmu Pengetahuan Alam</option>
                    <option value="Ilmu Pengetahuan Sosial">Ilmu Pengetahuan Sosial</option>
                    <option value="" disabled selected>Fakultas Ekonomi dan Bisnis</option>
                    <option value="D-3 Perbankan dan Keuangan">D-3 Perbankan dan Keuangan</option>
                    <option value="D-3 Akuntansi">D-3 Akuntansi</option>
                    <option value="S-1 Akuntansi">S-1 Akuntansi</option>
                    <option value="S-1 Manajemen">S-1 Manajemen</option>
                    <option value="S-1 Ekonomi Pembangunan">S-1 Ekonomi Pembangunan</option>
                    <option value="S-1 Ekonomi Syariah">S-1 Ekonomi Syariah</option>
                    <option value="" disabled selected>Fakultas Kedokteran</option>
                    <option value="S-1 Kedokteran">S-1 Kedokteran</option>
                    <option value="S-1 Farmasi">S-1 Farmasi</option>
                    <option value="" disabled selected>Fakultas Teknik</option>
                    <option value="S-1 Teknik Industri">S-1 Teknik Industri</option>
                    <option value="S-1 Teknik Mesin">S-1 Teknik Mesin</option>
                    <option value="S-1 Teknik Perkapalan">S-1 Teknik Perkapalan</option>
                    <option value="S-1 Teknik Elektro">S-1 Teknik Elektro</option>
                    <option value="" disabled selected>Fakultas Ilmu Sosial dan Ilmu Politk</option>
                    <option value="S-1 Ilmu Komunikasi">S-1 Ilmu Komunikasi</option>
                    <option value="S-1 Hubungan Internasional">S-1 Hubungan Internasional</option>
                    <option value="S-1 Ilmu Politik">S-1 Ilmu Politik</option>
                    <option value="S-1 Sains Informasi">S-1 Sains Informasi</option>
                    <option value="" disabled selected>Fakultas Ilmu Komputer</option>
                    <option value="D-3 Sistem Informasi">D-3 Sistem Informasi</option>
                    <option value="S-1 Sistem Informasi">S-1 Sistem Informasi</option>
                    <option value="S-1 Informatika">S-1 Informatika</option>
                    <option value="" disabled selected>Fakultas Hukum</option>
                    <option value="S-1 Hukum">S-1 Hukum</option>
                    <option value="" disabled selected>Fakultas Ilmu Kesehatan</option>
                    <option value="D-3 Keperawatan">D-3 Keperawatan</option>
                    <option value="D-3 Fisioterapi">D-3 Fisioterapi</option>
                    <option value="S-1 Fisioterapi">S-1 Fisioterapi</option>
                    <option value="S-1 Keperawatan">S-1 Keperawatan</option>
                    <option value="S-1 Kesehatan Masyarakat">S-1 Kesehatan Masyarakat</option>
                    <option value="S-1 Gizi">S-1 Gizi</option>
                  </select>
                </div>
              </div>
            </VuiBox>

            {/* status pekerjaan */}
            <VuiBox mb={2}>
              <div class="flex items-center space-x-4 mr-4 " >
                <div class="flex items-center space-x-4 " >
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    Status Pekerjaan :
                  </VuiTypography>
                </div>
                <div class="flex items-center space-x-4 mb-2" >
                  <select class="w-full p-2 rounded" name="pekerjaan"
                
                  onChange={handleChange}>
                    <option value="" disabled selected>Pilih Status Pekerjaan</option>
                    <option value="Karyawan">Karyawan</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Wirausaha">Wirausaha</option>

                  </select>
                </div>
              </div>
            </VuiBox>

            {/* nama perusahaan */}
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Nama Perusahaan:
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="input"
                  placeholder="Nama Perusahaan / jika Mahasiswa isikan Tidak Ada"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  name="namaPerusahaan"
                  value={formData.namaPerusahaan}
                  onChange={handleChange}
                />
              </GradientBorder>
            </VuiBox>
            {/* jabatan kerja */}
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Jabatan Pekerjaan:
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="input"
                  placeholder="Jabatan di Perusahaan / jika Mahasiswa isikan Mahasiswa"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                />
              </GradientBorder>
            </VuiBox>

            {/* Alamat Perusahaan */}
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Masukkan Alamat Perusahaan Anda :
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="input"
                  placeholder="Alamat Domisili sesuai dengan SIUP / jika mahasiswa isikan tidak ada"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  multiline rows={5}
                  name="alamatPerusahaan"
                  value={formData.alamatPerusahaan}
                  onChange={handleChange}
                />
              </GradientBorder>
            </VuiBox>
            {/* Nomor Telephone Perusahaan */}
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  Nomor Telepon Perusahaan :
                </VuiTypography>
              </VuiBox>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type="tel"
                  placeholder="Nomor Telephone perusahaan/ jika mahasiswa isikan 0"
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  name="telpPerusahaan"
                  value={formData.telpPerusahaan}
                  onChange={handleChange}
                />
              </GradientBorder>
            </VuiBox>


          </>

          <VuiBox mt={5} mb={2} class="flex justify-end">
            <VuiButton color="info" type="submit" >
              Simpan Data APL 01
            </VuiButton>
          </VuiBox>

        </VuiBox>

      </Card>

      <Footer />
    </DashboardLayout >
  );
}

export default isiAPL01;


