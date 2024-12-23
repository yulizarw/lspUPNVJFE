

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

function ChecklistPeserta(props) {

  const { dataUser, onClickChecklistPesertaAPL01, onClickChecklistPesertaAPL02, onClickChecklistPortfolio } = props

  const defaultDataUser = {
    namaPeserta: "",
    apl01: "",
    apl02: "",
    frAK01: "",
    BuktiPortfolio: [],
    updatedAt: new Date(),
    ...dataUser, // jika dataUser ada, maka akan meng-override nilai default
  };

  // return (
  //   <Card className="h-100">
  //     <VuiBox mb="16px">
  //       <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
  //         Daftar Periksa Kesiapan Peserta
  //       </VuiTypography>
  //       {/* <VuiBox mb={2}>
  //         <VuiBox display="flex" alignItems="center">
  //           <BsCheckCircleFill color="green" size="15px" mr="5px" />
  //           <VuiTypography variant="button" color="text" fontWeight="medium" ml="5px" mr="2px">
  //             +30%
  //           </VuiTypography>{" "}
  //           <VuiTypography variant="button" color="text" fontWeight="regular">
  //             {" "}
  //             this month
  //           </VuiTypography>
  //         </VuiBox>
  //       </VuiBox> */}
  //     </VuiBox>
  //     <VuiBox>
  //       {Object.values(dataUser).length === 0 ?
  //         (
  //           <>
  //             <TimelineItem
  //               icon={<BsXCircleFill size="16px" color="red" />}
  //               title="Anda Belum Mengisi Kelengkapan Data Peserta"
  //               dateTime=""
  //             />

  //           </>
  //         ) :
  //         (<TimelineItem
  //           icon={<BsCheckCircleFill size="16px" color="green" />}
  //           title="Anda Telah Mengisi Data Peserta"
  //           dateTime={new Date(dataUser.updatedAt).toLocaleDateString()}
  //         />)}

  //       {dataUser.apl01 == 'Sudah Terisi' ?
  //         (
  //           <TimelineItem
  //             icon={<BsCheckCircleFill size="16px" color="green" />}
  //             title="Formulir APL 01 Sudah Terisi"
  //             dateTime={new Date(dataUser.updatedAt).toLocaleDateString()}
  //           />
  //         ) :
  //         (
  //           <TimelineItem
  //             icon={<BsXCircleFill size="16px" color="red" />}
  //             title="Anda Belum Mengisi Formulir APL 01"
  //             dateTime=""
  //           />
  //         )}
  //       {dataUser.apl02 == 'Sudah Terisi' ?
  //         (
  //           <TimelineItem
  //             icon={<BsCheckCircleFill size="16px" color="green" />}
  //             title="Formulir APL 02 Sudah Terisi"
  //             dateTime={new Date(dataUser.updatedAt).toLocaleDateString()}
  //           />
  //         ) :
  //         (
  //           <TimelineItem
  //             icon={<BsXCircleFill size="16px" color="red" />}
  //             title="Anda Belum Mengisi Formulir APL 02"
  //             dateTime=""
  //           />
  //         )}

  //       {dataUser.frAK01 === 'Sudah Terisi' ?
  //         (
  //           <TimelineItem
  //             icon={<BsCheckCircleFill size="16px" color="green" />}
  //             title="Formulir FRAK01 Sudah Terisi"
  //             dateTime={new Date(dataUser.updatedAt).toLocaleDateString()}
  //           />
  //         ) :
  //         (
  //           <TimelineItem
  //             icon={<BsXCircleFill size="16px" color="red" />}
  //             title="Anda Belum Mengisi Formulir FRAK01"
  //             dateTime=""
  //           />
  //         )}

  //       {Object.values(dataUser.BuktiPortfolio).length === 0 ?
  //         (
  //           <>
  //             <TimelineItem
  //               icon={<BsXCircleFill size="16px" color="red" />}
  //               title="Anda Belum Mengisi Bukti Portofolio"
  //               dateTime=""
  //             />

  //           </>
  //         ) :
  //         (<TimelineItem
  //           icon={<BsCheckCircleFill size="16px" color="green" />}
  //           title="Anda Telah Mengisi Portofolio  "
  //           dateTime={new Date(dataUser.updatedAt).toLocaleDateString()}
  //         />)}
  //     </VuiBox>
  //   </Card>
  // );
  return (
    <Card className="h-100">
      <VuiBox mb="16px">
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          Daftar Periksa Kesiapan Peserta
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        {defaultDataUser.namaPeserta.length == 0 ? (
          <>
            <TimelineItem
              icon={<BsXCircleFill size="16px" color="red" />}
              title="Anda Belum Mengisi Kelengkapan Data Peserta"
              dateTime=""
            />
          </>
        ) : (
          <TimelineItem
            icon={<BsCheckCircleFill size="16px" color="green" />}
            title="Anda Telah Mengisi Data Peserta"
            dateTime={new Date(defaultDataUser.updatedAt).toLocaleDateString()}
          />
        )}

        {defaultDataUser.apl01 === "Sudah Terisi" ? (
          <TimelineItem
            icon={<BsCheckCircleFill size="16px" color="green" />}
            title="Formulir APL 01 Sudah Terisi"
            dateTime={new Date(defaultDataUser.updatedAt).toLocaleDateString()}
          />
        ) : (
          <div onClick={onClickChecklistPesertaAPL01}  sx={{cursor:"pointer"}} variant="button" >
            
            <TimelineItem
              icon={<BsXCircleFill size="16px" color="red" />}
              title="Anda Belum Mengisi Formulir APL 01"
              dateTime="Lengkapi Data APL 01 Anda Disini"
              sx={{cursor:'pointer'}}
            />
           
          </div >

        )}
        {defaultDataUser.apl02 === "Sudah Terisi" ? (
          <TimelineItem
            icon={<BsCheckCircleFill size="16px" color="green" />}
            title="Formulir APL 02 Sudah Terisi"
            dateTime={new Date(defaultDataUser.updatedAt).toLocaleDateString()}
          />
        ) : (
          <div onClick={onClickChecklistPesertaAPL02}  sx={{cursor:"pointer"}} variant="button" >
            <TimelineItem
              icon={<BsXCircleFill size="16px" color="red" />}
              title="Anda Belum Mengisi Formulir APL 02"
              dateTime="Lengkapi Data APL 02 Anda Disini"
              sx={{cursor:'pointer'}}

            />
            
          </div>
        )
        }
        {/* {
          defaultDataUser.frAK01 === "Sudah Terisi" ? (
            <TimelineItem
              icon={<BsCheckCircleFill size="16px" color="green" />}
              title="Formulir FRAK01 Sudah Terisi"
              dateTime={new Date(defaultDataUser.updatedAt).toLocaleDateString()}
            />
          ) : (
            <TimelineItem
              icon={<BsXCircleFill size="16px" color="red" />}
              title="Anda Belum Mengisi Formulir FRAK01"
              dateTime="Lengkapi Data FRAK01 Anda Disini"
            />
          )
        } */}
        {
          Object.values(defaultDataUser.BuktiPortfolio || {}).length === 0 ? (
            <div onClick={onClickChecklistPortfolio}  sx={{cursor:"pointer"}} variant="button"  >
            
              <TimelineItem
                icon={<BsXCircleFill size="16px" color="red" />}
                title="Anda Belum Mengisi Bukti Portofolio"
                dateTime="Lengkapi data Portfolio Anda Disini"
                sx={{cursor:'pointer'}}
              />
            
            </div>
          ) : (
            <TimelineItem
              icon={<BsCheckCircleFill size="16px" color="green" />}
              title="Anda Telah Mengisi Portofolio"
              dateTime={new Date(defaultDataUser.updatedAt).toLocaleDateString()}
            />
          )
        }
      </VuiBox >
    </Card >
  );
}

export default ChecklistPeserta;
