import axios from '../../config/axios'


export const getAllMUKList = ({access_token, namaSkema}) => {
  return(dispatch)=>{
    console.log(namaSkema,'di peserta action')
    axios.get(`peserta/getAllMUK/${namaSkema}`, {
      headers:{
        access_token
      }
    })
    
    .then(({data})=>{
      
      dispatch({type:"SUCCESS_GET_LIST_MUK", payload:data})
    })
    .catch(err => {
   
      // dispatch({ type: "ERROR_ALL_JADWAL", payload: err })
      dispatch({ type: "ERROR_GET_LIST_MUK", payload: err })
    })
    .finally(() => {
      dispatch({ type: "LOAD_ALL_MUK" })
    })
  }
}

export const downloadSelectedMUK = ({ access_token, item }) => {
  return (dispatch) => {
    axios
      .get(`peserta/download-stream/${item.fileName}`, {
        headers: {
          access_token,
        },
        responseType: "blob", // Respons berupa Blob untuk file binary
      })
      .then((response) => {
        // Ambil nama file dari header "Content-Disposition" (jika tersedia)
        const contentDisposition = response.headers["content-disposition"];
        let fileName = item.fileName; // Nama default jika header tidak tersedia

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
          if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1];
          }
        }

        // Pastikan ekstensi file sesuai dengan tipe Blob
        const mimeType = response.data.type; // Tipe file dari Blob
        const extension = mimeType === "application/pdf" ? ".pdf" : mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? ".docx" : "";
        if (extension && !fileName.endsWith(extension)) {
          fileName = fileName.replace(/\.[^/.]+$/, "") + extension;
        }

        // Buat URL dari Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // Set nama file untuk diunduh
        document.body.appendChild(link);
        link.click();

        // Bersihkan elemen setelah digunakan
        link.parentNode.removeChild(link);

        // Dispatch jika sukses
        dispatch({ type: "SUCCESS_DOWNLOAD_MUK", payload: response.data });
      })
      .catch((err) => {
        // Dispatch jika terjadi error
        dispatch({ type: "ERROR_DOWNLOAD_MUK", payload: err });
      });
  };
};

export const asesiPostFile = ({access_token, formData}) => {
  return(dispatch) => {
    console.log(formData.dokumen,'disini sekarang')
    axios.post ('peserta/upload-file', formData, {
       headers:{
        access_token
       }
    })
    .then(({data})=>{
      alert ("File uploaded successfully!");
      dispatch({type:"SUCCESS_UPLOAD_MUK", payload:"success"})
    })
  .catch(err => {
    // dispatch({ type: "ERROR_ALL_JADWAL", payload: err })
    dispatch({ type: "ERROR_UPLOAD_MUK", payload: err })
  })
  .finally(() => {
    dispatch({ type: "RESET" })
  })
  }
}


export const downloadFileAsesi = ({ access_token, item }) => {
  return (dispatch) => {
    console.log(item.alias, "action");

    axios
      .get(`/peserta/getMUK/${item.alias}`, {
        headers: {
          access_token,
        },
        responseType: "blob", // Pastikan response sebagai Blob
      })
      .then((response) => {
        // Ambil nama file dari header "Content-Disposition" (jika tersedia)
        const contentDisposition = response.headers["content-disposition"];
        let fileName = item.name; // Nama default dari item.name

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
          if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1];
          }
        }

        // Pastikan ekstensi file sesuai dengan MIME type
        const mimeType = response.headers["content-type"] || "application/octet-stream";
        const extension =
          mimeType === "application/pdf"
            ? ".pdf"
            : mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ? ".docx"
            : "";

        if (extension && !fileName.endsWith(extension)) {
          fileName = fileName.replace(/\.[^/.]+$/, "") + extension;
        }

        // Buat URL dari Blob
        const blob = new Blob([response.data], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();

        // Bersihkan elemen setelah digunakan
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // Dispatch jika sukses
        dispatch({ type: "SUCCESS_DOWNLOAD_MUK", payload: response.data });
      })
      .catch((err) => {
        console.error("Error downloading file:", err);
        dispatch({ type: "ERROR_DOWNLOAD_MUK", payload: err });
      });
  };
};

export const deleteFileAsesi = ({access_token, dokumen}) => {
  return(dispatch) => {
    axios.delete(`/peserta/deleteFileAsesi/${dokumen}`,{
      headers:{
        access_token
      }
    })
    .then(({data})=> {
      // Jika delete berhasil, lakukan refresh data
      if (data) {
        alert('File berhasil dihapus');
        refreshData(); // Fungsi untuk melakukan refresh data
      }
      dispatch({type:"SUCCESS_DELETE_FILE"})
    })
    .catch((err) => {
      // console.error("Error downloading file:", err);
      dispatch({ type: "ERROR_DELETE_FILE", payload: err });
    });
  }
}