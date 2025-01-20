
import { useState } from "react";



// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsCheckCircleFill } from "react-icons/bs";
import { Redirect, useHistory } from "react-router-dom";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard Materail-UI example components
import Table from "../../../examples/Tables/Table/index";

// Data
import data from "./data/dataPilihSkema";

//loader
import Lottie from "react-lottie";
import * as loaderData from "../../../assets/loader/lottieLego.json"


function TableJadwalUjikom(props) {
  const history = useHistory()
  const { columns, rows } = data();
  const { allJadwal, jadwalPeserta,loadAllJadwal, dataUser,dataAsesor } = props
  
  // untuk debug
  // const allJadwal = {
  //   findAllJadwal:[]
  // }
  const rowsJadwalSkema = ['Nama Skema', 'Tanggal Pelaksanaan', 'Sektor Skema', 'Aksi']
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const klikIsiMUK = () => {
    setMenu(null)
    history.push('/materi-uji-kompetensi')
  }

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

  // Check for jadwalUjikomId and display message if it's null
  if (dataUser.jadwalUjikomId === null) {
    return (
      <Card sx={{ height: "100% !important" }}>
        <VuiBox display="flex" justifyContent="center" alignItems="center" height="100%">
          <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
            Admin sedang melakukan plotting jadwal.
          </VuiTypography>
        </VuiBox>
      </Card>
    );
  }
  


  const renderMenuAsesor = (
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
      <MenuItem onClick={klikIsiMUK}>Pengisian MUK</MenuItem>
      {/* <MenuItem onClick={closeMenu}></MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem> */}
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
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            Skema Uji Kompetensi LSP UPN Veteran Jakarta
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
              {allJadwal?.findAllJadwal?.length > 0 ?
                (<>&nbsp;<strong>{allJadwal.findAllJadwal.length}</strong> Jumlah Skema Ujikom Terdaftar</>) : 
                (<>Belum Ada Pelaksanaan Ujikom Terjadwal</>)
              }

              {/* // &nbsp;<strong>{allJadwal.findAllJadwal.length}</strong> Jadwal uji kompetensi terjadwal */}
            </VuiTypography>
            
          </VuiBox>
        </VuiBox>
        <VuiBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </VuiBox>
        {/* {renderMenu} */}
        {/* {JSON.stringify(dataAsesor)} */}
        {/* {dataAsesor && (renderMenuAsesor)} */}
      </VuiBox>
      <VuiBox
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
        <Table columns={columns} rows={rows} />

      </VuiBox>
    </Card>
  );
}

export default TableJadwalUjikom;
