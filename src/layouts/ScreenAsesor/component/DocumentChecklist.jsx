import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getAllMUKList } from "store/action/asesorAction";
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
import { downloadSelectedMUK } from "store/action/asesorAction";
function DocumentChecklist() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userReducers.userLogin);
  const dataAsesor = useSelector((state) => state.userReducers.asesorData);
  const listMUK = useSelector((state) => state.asesorReducers.listMUK);
  const history = useHistory();
  const [checklist, setChecklist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage =5; // Jumlah item per halaman

  const checklistItems = [
    { id: 1, name: "FR.APL.01. Permohonan Sertifikasi Kompetensi" },
    { id: 2, name: "FR.APL.02. Asesmen Mandiri" },
    { id: 3, name: "Portofolio Asesi" },
    { id: 4, name: "FR.MAPA.01. Merencanakan Aktivitas dan Proses Asesmen" },
    { id: 5, name: "FR.AK.01. Persetujuan Asesmen dan Kerahasiaan" },
    { id: 6, name: "SKEMA Sertifikasi + Standar Kompetensi Kerja" },
    { id: 7, name: "FR. MAPA.02-Peta Instrumen Asesmen Hasil Pendekatan Asesmen dan Perencanaan Asesmen" },
    { id: 8, name: "FR.AK.01 Persetujuan Asesmen dan Kerahasiaan" },
    { id: 9, name: "FR.AK.04 Banding Asesmen" },
    { id: 10, name: "FR.IA.01 Ceklis Observasi Aktivitas di Tempat Kerja atau Tempat Kerja Simulasi" },
    { id: 11, name: "FR.IA.02 Tugas Praktik Demonstrasi" },
    { id: 12, name: "FR.IA.03 Pertanyaan untuk Mendukung Observasi" },
    { id: 13, name: "FR.IA.04 Penjelasan Singkat Proyek Terkait Pekerjaan/Kegiatan Terstruktur Lainnya" },
    { id: 14, name: "FR.IA.05 Pertanyaan Tertulis Pilihan ganda+Kunci Jawaban dan Lembar Jawab" },
    { id: 15, name: "FR.IA.06 Pertanyaan Tertulis Esai+Kunci Jawaban dan Lembar Jawab" },
    { id: 16, name: "FR.IA.07 Pertanyaan Lisan" },
    { id: 17, name: "FR.IA.08 Ceklis Verifikasi Portofolio" },
    { id: 18, name: "FR.IA.09 Pertanyaan Wawancara" },
    { id: 19, name: "FR.IA.10 Klarifikasi Bukti Pihak Ketiga" },
    { id: 20, name: "FR.IA.11 Ceklis Meninjau Materi Uji Kompetensi" },
    { id: 21, name: "FR.AK.02 Formulir Rekaman Asesmen Kompetensi" },
    { id: 22, name: "FR.AK.03 Umpan Balik dan Catatan Asesmen" },
    { id: 23, name: "FR.AK.05 Laporan Asesmen" },
    { id: 24, name: "FR.AK.06 Meninjau Proses Asesmen" },
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
    if (listMUK?.file) {
      const mappedChecklist = checklistItems.map((item) => {
        const uploadedFile = listMUK.file.find((file) =>
          file.fileName.includes(item.name)
        );
       
        return {
          ...item,
          uploaded: !!uploadedFile,
          filePath: uploadedFile?.path || null,
          id:uploadedFile?.id,
          fileName:uploadedFile?.fileName
        };
      });
      setChecklist(mappedChecklist);
    }
  }, [listMUK]);

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

  const handleDownload = (item) => {
    dispatch(downloadSelectedMUK({access_token:userLogin.access_token, item:item,}))
   
  } 

  const handleDelete = (item) => {
    
    dispatch(deleteSelectedMUK({access_token:userLogin.access_token, id:item.id}))
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
          onClick={(e)=> handleDownload(item)}
        >
          <BsDownload size="18px"  /> {/* Menambahkan margin di kanan ikon */}
        
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
          onClick={(e)=> handleDelete(item)}
        >
          <BsFileExcelFill size="18px"  /> {/* Menambahkan margin di kanan ikon */}
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
        {/* <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        /> */}
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

export default DocumentChecklist;
