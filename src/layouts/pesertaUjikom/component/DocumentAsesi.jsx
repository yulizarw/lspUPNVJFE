import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getAllMUKList, downloadSelectedDocument } from "store/action/asesorAction";
import Table from "../../../examples/Tables/Table/index"; // Assuming the Table file path is correct
import { Pagination } from "@mui/material";


// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
// React icons
import { BsCheckCircleFill, BsXCircleFill, BsRecycle, BsFileExcelFill, BsDownload } from "react-icons/bs";
import { deleteSelectedMUK } from "store/action/asesorAction";
import { deleteFileAsesi} from "store/action/pesertaAction"


function DocumentAsesi({ participant, handleDownload }) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userReducers.userLogin);
  const dataAsesor = useSelector((state) => state.userReducers.asesorData);
  const listMUK = useSelector((state) => state.asesorReducers.listMUK);
  const history = useHistory();
  const [checklist, setChecklist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Jumlah item per halaman

  const documentItems = [
    { id: 1, name: "FR.APL.01. Permohonan Sertifikasi Kompetensi", status: participant.apl01,alias:"apl01" },
    { id: 2, name: "FR.APL.02. Asesmen Mandiri", status: participant.apl02, alias:"apl02"},
    { id: 3, name: "Portofolio Peserta", status: participant.portofolioAsesi, alias:"portofolioAsesi" },
    { id: 4, name: "FR.MAPA.01. Merencanakan Aktivitas dan Proses Asesmen", status: participant.mapa01, alias:"mapa01" },
    { id: 5, name: "FR.AK.01. Persetujuan Asesmen dan Kerahasiaan", status: participant.frak01, alias:"frak01"},
    // { id: 6, name: "SKEMA Sertifikasi + Standar Kompetensi Kerja",status:participant. },
    { id: 7, name: "FR. MAPA.02-Peta Instrumen Asesmen Hasil Pendekatan Asesmen dan Perencanaan Asesmen", status: participant.mapa02,alias:"mapa02" },
    // { id: 8, name: "FR.AK.01. Persetujuan Asesmen dan Kerahasiaan", status:participant },
    { id: 9, name: "FR.AK.04 Banding Asesmen", status: participant.frak04, alias:"frak04"},
    { id: 10, name: "FR.IA.01 Ceklis Observasi Aktivitas di Tempat Kerja atau Tempat Kerja Simulasi", status: participant.fria01, alias:"fria01" },
    { id: 11, name: "FR.IA.02 Tugas Praktik Demonstrasi", status: participant.fria02, alias:"fria02" },
    { id: 12, name: "FR.IA.03 Pertanyaan untuk Mendukung Observasi", status: participant.fria03, alias:"fria03"},
    { id: 13, name: "FR.IA.04 FR.IA.04A. Penjelasan Singkat Proyek -L-T DIT", status: participant.fria04a, alias:"fria04a" },
    { id: 13, name: "FR.IA.04B. Penilaian Proyek Singkat L-T DIT", status: participant.fria04b, alias:"fria04b"},
    { id: 14, name: "FR.IA.05 Pertanyaan Tertulis Pilihan ganda+Kunci Jawaban dan Lembar Jawab", status: participant.fria05 , alias:"fria05"},
    { id: 15, name: "FR.IA.06 Pertanyaan Tertulis Esai+Kunci Jawaban dan Lembar Jawab", status: participant.fria06 , alias:"fria06"},
    { id: 16, name: "FR.IA.07 Pertanyaan Lisan", status: participant.fria07, alias:"fria07"},
    { id: 17, name: "FR.IA.08 Ceklis Verifikasi Portofolio", status: participant.fria08, alias:"fria08"},
    { id: 18, name: "FR.IA.09 Pertanyaan Wawancara", status: participant.fria09 , alias:"fria09"},
    { id: 19, name: "FR.IA.10 Klarifikasi Bukti Pihak Ketiga", status: participant.fria10, alias:"fria10" },
    { id: 20, name: "FR.IA.11 Ceklis Meninjau Materi Uji Kompetensi", status: participant.fria11, alias:"fria11" },
    { id: 21, name: "FR.AK.02 Formulir Rekaman Asesmen Kompetensi", status: participant.frak02 , alias:"frak02"},
    { id: 22, name: "FR.AK.03 Umpan Balik dan Catatan Asesmen", status: participant.frak03 , alias:"frak03"},
    { id: 23, name: "FR.AK.05 Laporan Asesmen", status: participant.frak05, alias:"frak05" },
    { id: 24, name: "FR.AK.06 Meninjau Proses Asesmen", status: participant.frak06, alias:"frak06" },
  ];

  useEffect(() => {
    if (userLogin?.access_token && dataAsesor) {
      dispatch(
        getAllMUKList({
          access_token: userLogin.access_token,
          namaSkema: dataAsesor.Asesor.SkemaUjikom.namaSkema,
        })
      );
    }
  }, [dispatch, userLogin, dataAsesor]);

  useEffect(() => {

    const mappedChecklist = documentItems.map((item) => {
      
      return {
        ...item,                                                                                                    
        uploaded:                                                                                                                                                                       !!item.status,
        filePath: item.status ,
        // id:uploadedFile?.id,
        // fileName:uploadedFile?.fileName                                              
      };
    });
    setChecklist(mappedChecklist);

  }, []);

  const columns = [
    { name: "Nama Dokumen", align: "left" },
    { name: "Status", align: "center" },
    { name: "Action", align: "center" },
  ];

  // Pagination logic
  const totalPages = Math.ceil(checklist.length / itemsPerPage);
  const paginatedChecklist = checklist.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );



  const handleDelete = (item) => {
    console.log(item)
    dispatch(deleteFileAsesi({ access_token: userLogin.access_token, dokumen:item.alias }))
    history.push('/')
  }

  const rows = paginatedChecklist.map((item) => ({
    "Nama Dokumen": item.name,
    Status: item.uploaded ? "Uploaded" : "Not Uploaded",
    Action: item.uploaded ? (
      <>

        <VuiButton
          style={{
            marginLeft: "1rem",
            padding: "8px 16px",  // Padding untuk tombol lebih lebar
            // display: "flex",      // Menggunakan Flexbox
            alignItems: "center", // Menjaga ikon dan teks berada pada garis tengah
            justifyContent: "center", // Agar isi tombol terpusat
          }}
          color="primary"
          onClick={(e) => handleDownload(item)}
        >
          <BsDownload size="18px" /> {/* Menambahkan margin di kanan ikon */}

        </VuiButton>

        <VuiButton
          style={{
            marginLeft: "1rem",
            padding: "8px 16px",  // Padding untuk tombol lebih lebar
            // display: "flex",      // Menggunakan Flexbox
            alignItems: "center", // Menjaga ikon dan teks berada pada garis tengah
            justifyContent: "center", // Agar isi tombol terpusat
          }}
          color="error"
          onClick={(e) => handleDelete(item)}
        >
          <BsFileExcelFill size="18px" /> {/* Menambahkan margin di kanan ikon */}
        </VuiButton>

      </>
    ) : null,
  }));

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };


  return (
    <div>
      <Table columns={columns} rows={rows} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16, color: "white" }}>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary" // Warna utama untuk highlight
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#1976d2", // Warna biru sesuai tema Material-UI
            },
            "& .Mui-selected": {
              backgroundColor: "#1976d2", // Warna latar belakang saat aktif
              color: "#fff", // Warna angka saat aktif
            },
          }}
        />
      </div>
    </div>
  );
}

export default DocumentAsesi;
