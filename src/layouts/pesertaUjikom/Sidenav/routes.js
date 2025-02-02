
// Vision UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Vision UI Dashboard React icons
import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";

const routesSidenavAsesor = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    // component: Dashboard,
    noCollapse: true,
  },
  { type: "title", title: "Administrasi Ujikom", key: "administrasi" },
  {
    type: "collapse",
    name: "Unduh MUK",
    key: "MUK",
    route: "/unduh-MUK",
    icon: <IoIosDocument size="15px" color="inherit" />,
    // component: Tables,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Unggah Dokumen Asesi",
    key: "Pengesahan",
    route: "/unggah-dokumen",
    icon: <IoIosDocument size="15px" color="inherit" />,
    // component: Billing,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Hasil Penilaian",
  //   key: "Laporan",
  //   route: "/penilaian-kompetensi",
  //   icon: <HiOutlineDocumentReport size="15px" color="inherit" />,
  //   // component: RTL,
  //   noCollapse: true,
  // },
  
];

export default routesSidenavAsesor;
