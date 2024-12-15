

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// React icons
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";
import { SiDropbox } from "react-icons/si";

// Vision UI Dashboard React example components
import TimelineItem from "examples/Timeline/TimelineItem"
import TimelineList from "examples/Timeline/TimelineList";
import AdobeXD from "examples/Icons/AdobeXD";

// Vision UI Dashboard theme imports
import palette from "assets/theme/base/colors";
import { Padding } from "@mui/icons-material";

function ChecklistAsesor(props) {

  const { dataAsesor, dataUser, onClickChecklistPesertaAPL01 } = props

  const defaultDataAsesor = {
    namaAsesor: "",
    noRegMET: "",
    tahunAkhirRegMET: "",
    jumlahMelaksanakanUjikom: 0,
    kumulatifMelakukanUjikom: 0,
    jadwalSkemaUjikomId: "",
    updatedAt: new Date(),
    ...dataAsesor, // jika dataUser ada, maka akan meng-override nilai default
  };

  console.log(dataAsesor?.Asesor?.jumlahMelaksanakanUjikom)
  return (
    // <Card className="h-100" >
    <Card sx={() => ({
      height: "100%",
      py: "6.6%",
      // backgroundImage: `url(${userLogin.photo})`,
      // backgroundSize: "20%",
      // backgroundRepeat: "no-repeat",
      // backgroundPosition: "top",
      // backgroundPosition: "top right",  // Center the image at the top
      // display: "flex",
      // flexDirection: "column",

      // justifyContent: "flex-start",   // Ensure the content starts at the top
    })}>
      <VuiBox mb="16px">
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          Senarai Kontrol Asesor
        </VuiTypography>
      </VuiBox>
      <VuiBox>

        {dataAsesor?.filterJadwal ? (
          <TimelineItem
            icon={<BsCheckCircleFill size="16px" color="green" />}
            title="Jadwal Menguji Kompentensi Anda"
            dateTime={new Date(dataAsesor.filterJadwal.tanggalWaktu).toLocaleString('id-ID', {
              weekday: 'long', // Menampilkan hari dalam seminggu
              year: 'numeric', // Menampilkan tahun
              month: 'long', // Menampilkan nama bulan
              day: 'numeric', // Menampilkan hari dalam bulan
              hour: '2-digit', // Menampilkan jam
              minute: '2-digit', // Menampilkan menit
              second: '2-digit', // Menampilkan detik
              hour12: false, // Menampilkan jam dalam format 24 jam
            })}
          />
        ) :

          <>
            <TimelineItem
              icon={<BsXCircleFill size="16px" color="red" />}
              title="Anda Belum Terjadwal menguji, silahkan hubungi admin"
            // dateTime={new Date(defaultDataAsesor.updatedAt).toLocaleDateString()}
            />
          </>}

        {dataAsesor?.Asesor?.tahunAkhirRegMET ? (
          <TimelineItem
            icon={<BsCheckCircleFill size="16px" color="green" />}
            title="Tahun Berakhir Nomor Registrasi MET Asesor Anda :"
            dateTime={new Date(dataAsesor.Asesor.tahunAkhirRegMET).toLocaleString('id-ID', {
              weekday: 'long', // Menampilkan hari dalam seminggu
              year: 'numeric', // Menampilkan tahun
              month: 'long', // Menampilkan nama bulan
              day: 'numeric', // Menampilkan hari dalam bulan
              hour: '2-digit', // Menampilkan jam
              minute: '2-digit', // Menampilkan menit
              second: '2-digit', // Menampilkan detik
              hour12: false, // Menampilkan jam dalam format 24 jam
            })}
          />
        ) : (
          <TimelineItem
            icon={<BsXCircleFill size="16px" color="red" />}
            title="Tahun Berakhir Nomor Registrasi MET Asesor Anda :"
            dateTime="Anda Belum Melakukan Input data Nomor Registrasi MET anda"
          />
        )}

        {dataAsesor?.Asesor?.jumlahMelaksanakanUjikom !== null &&
          dataAsesor?.Asesor?.jumlahMelaksanakanUjikom !== undefined ? (
          <TimelineItem
            icon={<BsCheckCircleFill size="16px" color="green" />}
            title="Jumlah Melaksanakan Ujikom anda di Tahun ini :"
            dateTime={dataAsesor.Asesor.jumlahMelaksanakanUjikom}
          />
        ) : (
          <TimelineItem
            icon={<BsXCircleFill size="16px" color="red" />}
            title="Jumlah Melaksanakan Ujikom anda di Tahun ini :"
            dateTime="Data Anda Belum ada di Basis Data"
          />
        )}


        {dataAsesor?.Asesor?.kumulatifMelakukanUjikom !== null && 
        dataAsesor?.Asesor?.kumulatifMelakukanUjikom !== undefined ? (
          <>
            <TimelineItem
              icon={<BsCheckCircleFill size="16px" color="green" />}
              title="Jumlah Keseluruhan Melaksanakan Ujikom :"
              dateTime={dataAsesor?.Asesor?.kumulatifMelakukanUjikom}
            />
          </>

        ) : (<TimelineItem
          icon={<BsXCircleFill size="16px" color="red" />}
          title="Jumlah Keseluruhan Melaksanakan Ujikom :"
          dateTime="Data Anda Belum ada di Basis Data"
        />)

        }

      </VuiBox >
    </Card >
  );
}

export default ChecklistAsesor;
