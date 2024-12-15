

import { useState, useEffect } from "react";


// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import { BsCheckCircleFill } from "react-icons/bs";
import { Menu, MenuItem, Button } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import GradientBorder from "examples/GradientBorder";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import Table from "examples/Tables/Table/index";

// / Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import IconButton from "@mui/material/IconButton";

// react-router-dom components
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { simpanDataAsesor, updatePilihSkemaAsesor } from "../../store/action/userAction"
// Asset
import logoUpn from '../../assets/images/LOGO UPNVJ.png'

import VuiAlert from "../../components/VuiAlert"

function TableLengkapiDataDiri(props) {

  const { allJadwal, userLogin } = props

  const statusDataDiri = useSelector((state) => state.userReducers.addDataAsesor);
  const statusPilihSkemaAsesor = useSelector((state)=> state.userReducers.statusPilihSkemaAsesor)

  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const history = useHistory()
  const dispatch = useDispatch()
  console.log(allJadwal)

  useEffect(() => {
    <VuiAlert>{statusDataDiri}</VuiAlert>
  }, [statusDataDiri]);


  const access_token = userLogin.access_token
  const [formInput, setFormInput] = useState({
    namaAsesor: "",
    noRegMET: "",
    tahunAkhirRegMET: "",
    namaSkema:""
  })


  const namaAsesorInput = (input) => {
    setFormInput({ ...formInput, namaAsesor: input.target.value })
  }
  const noRegMETInput = (input) => {
    setFormInput({ ...formInput, noRegMET: input.target.value })
  }
  const tahunAkhirRegMETInput = (input) => {
    setFormInput({ ...formInput, tahunAkhirRegMET: input.target.value })
  }

  // dropdownlist
  const [anchorEl, setAnchorEl] = useState(null); // Untuk mengontrol posisi menu dropdown
  const [selectedOption, setSelectedOption] = useState(null); // Untuk menyimpan opsi yang dipilih
  // Fungsi untuk membuka menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Fungsi untuk menutup menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fungsi untuk menangani pemilihan opsi
  const handleSelect = (jadwal) => {
    setSelectedOption(jadwal); 
    setFormInput({...formInput, namaSkema:jadwal})// Simpan opsi yang dipilih
    handleClose(); // Tutup menu setelah memilih
  };


  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(simpanDataAsesor({ access_token, formInput }))
    
    history.push('/')

  }

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card
      sx={{
        height: "100% !important",
      }}
    >
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiBox mb="auto">
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



          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            Kelengkapan Data Pribadi Asesor
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
              {/* {allJadwal.findAllJadwal.length > 0 ?
                (<>&nbsp;<strong>{allJadwal.findAllJadwal.length}</strong> Jadwal uji kompetensi terjadwal</>) :
                (<>Belum Ada Pelaksanaan Ujikom Terjadwal</>)
              } */}
              {/* // &nbsp;<strong>{allJadwal.findAllJadwal.length}</strong> Jadwal uji kompetensi terjadwal */}
              Mohon untuk melengkapi data administrasi anda sebagai Asesor
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        {/* <VuiBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </VuiBox> */}
        {/* {renderMenu} */}
      </VuiBox>
      <VuiBox
        onSubmit={onSubmit}
        component="form"
        role="form"
        sx={{
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
        }}
      >
        {/* nama lengkap */}
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Nama Lengkap Asesor
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
              onChange={namaAsesorInput}
              placeholder="Nama Lengkap sesuai dengan sertifikat Penunjukkan Asesor"
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}

            />
          </GradientBorder>
        </VuiBox>

        {/* no reg met */}
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Nomor Registrasi MET
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
              onChange={noRegMETInput}
              placeholder="Nomor Registrasi MET sesuai dengan sertifikat Penunjukkan Asesor"
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            // onChange={alamatChange}
            />
          </GradientBorder>
        </VuiBox>

        {/* tahun berakhir MET */}
        <VuiBox mb={2}>
          <div class="mb-4 relative">
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Tanggal Akhir Masa Berlaku MET:
            </VuiTypography>
            <div class="relative">
              <VuiInput onChange={tahunAkhirRegMETInput} type="date" id="dob" name="dob" class="custom-date-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none" />
            </div>
          </div>
        </VuiBox>

        {/* pilih Skema */}
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Pilih Skema Sertifikasi Kompetensi Anda :
            </VuiTypography>
          </VuiBox>
          <div>
            <Button variant="contained" onClick={handleClick}>
              {selectedOption ? selectedOption : "Pilih Skema Anda"}
            </Button>

            <Menu
              anchorEl={anchorEl} // Tempat menu akan muncul
              open={Boolean(anchorEl)} // Mengontrol apakah menu terbuka atau tidak
              onClose={handleClose} // Menutup menu
            >
              <MenuItem
                onClick={() => handleSelect("Pilih Skema Anda")}
                disabled={true} // Disabled karena ini adalah placeholder
              >
                Pilih Skema Anda
              </MenuItem>
              {allJadwal.findAllJadwal.map((jadwal) => (
                <MenuItem key={jadwal.namaSkema} onClick={() => handleSelect(jadwal.namaSkema)} >
                  {jadwal.namaSkema}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </VuiBox>

        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth type="submit">
            Simpan Data
          </VuiButton>
        </VuiBox>
      </VuiBox>

    </Card>
  );
}

export default TableLengkapiDataDiri;
