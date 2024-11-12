/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "store/action/userAction";

// @mui material components
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

// Icons
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signUpImage.png";
import picSignUp from "assets/images/signUp4.jpg"

function SignUp() {

  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [asesor, setAsesor] = useState(false);
  const handleAsesor = () => {
    setAsesor(!asesor);
    if (!asesor) {
      setFormInput({ ...formInput, userRole: 'Asesor' })
    } else {
      setFormInput({ ...formInput, userRole: 'Peserta Ujikom' })
    }
  }
  const history = useHistory()
  const dispatch = useDispatch()

  const [formInput, setFormInput] = useState({
    userName: "",
    password: "",
    userEmail: "",
    userPhoto: "",
    userDepartment: "",
    userPhone: "",
    userBirthdate: "",
    userDomisili: "",
    sptAsesor: "",
    userRole: "Peserta Ujikom"
  });
  const userNameInput = (input) => {
    const userName = formInput.userName;
    setFormInput({ ...formInput, userName: input.target.value });
  };
  const passwordInput = (input) => {
    const password = formInput.password;
    setFormInput({ ...formInput, password: input.target.value })
  }
  const emailInput = (input) => {
    const userEmail = formInput.userEmail;
    setFormInput({ ...formInput, userEmail: input.target.value })
  }
  const photoInput = (input) => {
    const userPhoto = formInput.userPhoto;
    setFormInput({ ...formInput, userPhoto: input.target.value })
  }
  const departmentInput = (input) => {
    const userDepartment = formInput.userDepartment;
    setFormInput({ ...formInput, userDepartment: input.target.value })
  }
  const phoneInput = (input) => {
    const userPhone = formInput.userPhone;
    setFormInput({ ...formInput, userphone: input.target.value })
  }
  const birthDateInput = (input) => {
    const userBirthdate = formInput.userBirthdate;
    setFormInput({ ...formInput, userBirthdate: input.target.value })
  }
  const domisiliInput = (input) => {
    const userDomisili = formInput.userDomisili;
    setFormInput({ ...formInput, userDomisili: input.target.value })
  }
  const sptInput = (input) => {
    const sptAsesor = formInput.sptAsesor;
    setFormInput({ ...formInput, sptAsesor: input.target.value })

  }
  const roleInput = (input) => {
    const userRole = formInput.userRole;
    setFormInput({ ...formInput, userRole: input.target.value })

  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(formInput))
    history.push('/')
  }


  console.log(formInput)
  return (
    <CoverLayout
      title="Selamat Datang !"
      color="white"
      description="Silahkan Buat Akun Anda untuk melanjutkan"
      image={picSignUp}
      premotto="Lembaga Sertifikasi Profesi UPN Veteran Jakarta"
      motto="Bela Negara"
      cardContent
    >
      <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
        <VuiBox
          component="form"
          role="form"
          borderRadius="inherit"
          p="45px"
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.focus,
          })}
          onSubmit={onSubmit}
        >
          <VuiTypography
            color="white"
            fontWeight="bold"
            textAlign="center"
            mb="24px"
            sx={({ typography: { size } }) => ({
              fontSize: size.lg,
            })}
          >
            Register with
          </VuiTypography>
          <Stack mb="25px" justifyContent="center" alignItems="center" direction="row" spacing={2}>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton
                  transition="all .25s ease"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  borderradius="15px"
                  sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                    borderRadius: borderRadius.xl,
                    padding: "25px",
                    backgroundColor: secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(secondary.focus, 0.9),
                    },
                  })}
                >
                  <Icon
                    as={FaFacebook}
                    w="30px"
                    h="30px"
                    sx={({ palette: { white } }) => ({
                      color: white.focus,
                    })}
                  />
                </IconButton>
              </a>
            </GradientBorder>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton
                  transition="all .25s ease"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  borderradius="15px"
                  sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                    borderRadius: borderRadius.xl,
                    padding: "25px",
                    backgroundColor: secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(secondary.focus, 0.9),
                    },
                  })}
                >
                  <Icon
                    as={FaApple}
                    w="30px"
                    h="30px"
                    sx={({ palette: { white } }) => ({
                      color: white.focus,
                    })}
                  />
                </IconButton>
              </a>
            </GradientBorder>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton
                  transition="all .25s ease"
                  justify="center"
                  align="center"
                  bg="rgb(19,21,54)"
                  borderradius="15px"
                  sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                    borderRadius: borderRadius.xl,
                    padding: "25px",
                    backgroundColor: secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(secondary.focus, 0.9),
                    },
                  })}
                >
                  <Icon
                    as={FaGoogle}
                    w="30px"
                    h="30px"
                    sx={({ palette: { white } }) => ({
                      color: white.focus,
                    })}
                  />
                </IconButton>
              </a>
            </GradientBorder>
          </Stack>
          <VuiTypography
            color="text"
            fontWeight="bold"
            textAlign="center"
            mb="14px"
            sx={({ typography: { size } }) => ({ fontSize: size.lg })}
          >
            or
          </VuiTypography>

          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                User Name
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
                placeholder="User Name..."
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
                onChange={userNameInput}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Email
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
                placeholder="Gunakan email @upnvj.ac.id..."
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
                onChange={emailInput}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Password
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
                type="password"
                placeholder="Masukkan password..."
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
                onChange={passwordInput}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Pas Photo
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
                type="url"
                placeholder="link pas photo ..."
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
                onChange={photoInput}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>


            <div class="flex items-center space-x-4 mr-4 " >
              <div class="flex items-center space-x-4 " >
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Program Studi / Department Tempat Kerja :
                </VuiTypography>
              </div>
              <div class="flex items-center space-x-4 mb-2" onChange={departmentInput}>
                <select class="w-full p-2 rounded">
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

     
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Nomor Telephone
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
                placeholder="Nomor Telephone ..."
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
                onChange={phoneInput}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Tanggal Lahir
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
                type="date"
                placeholder="Tanggal Lahir ..."
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
                onChange={birthDateInput}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Domisili
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
                placeholder="Domisili Saat Ini ..."
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
                onChange={domisiliInput}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox display="flex" alignItems="center">
            <VuiSwitch color="info" checked={asesor} onChange={handleAsesor} />
            <VuiTypography
              variant="caption"
              color="white"
              fontWeight="medium"
              onClick={handleAsesor}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;Mendaftar Sebagai Asesor?
            </VuiTypography>
          </VuiBox>
          <VuiBox display="flex" alignItems="center">
            <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
            <VuiTypography
              variant="caption"
              color="white"
              fontWeight="medium"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;Remember me
            </VuiTypography>
          </VuiBox>

          {asesor === true && (
            <VuiBox mb={2}>
              <VuiBox mb={1} ml={0.5}>
                <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                  SPT Asesor
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
                  type="url"
                  placeholder="Masukkan SPT Asesor Anda ..."
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  onChange={sptInput}
                />
              </GradientBorder>
            </VuiBox>
          )}
          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" fullWidth type="submit">
              SIGN UP
            </VuiButton>
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Sudah Punya Akun?{" "}
              <VuiTypography
                component={Link}
                to="/"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Sign in
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </GradientBorder>
    </CoverLayout>
  );
}

export default SignUp;
