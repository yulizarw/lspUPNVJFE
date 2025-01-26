import axios from '../../config/axios'


export const asesorPostMUK = ({access_token, formData}) => {
  return(dispatch) => {
    console.log(access_token)
    axios.post ('asesor/upload-muk', formData, {
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

export const getAllMUKList = ({access_token, namaSkema}) => {
  return(dispatch)=>{
 
    axios.get(`asesor/getAllMUK/${namaSkema}`, {
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

export const deleteSelectedMUK = ({access_token, id}) => {
  return (dispatch)=> {
    axios.delete(`asesor/deleteMUK/${id}`,{
      headers:{
        access_token
      }
    })
    .then(({data})=>{
      dispatch({type:"SUCCESS_DELETE_MUK",payload:data})
    })
    .catch(err => {
      dispatch({ type: "ERROR_GET_LIST_MUK", payload: err })
    })
  }
} 
export const downloadSelectedMUK = ({ access_token, item }) => {
  return (dispatch) => {
    axios
      .get(`asesor/downloadFileMUK/${item.id}`, {
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

export const fetchParticipants = ({access_token, dataJadwal}) => {
  return(dispatch) => {
    axios.get (`user/admin/peserta-ujikom`, {
      headers : {
        access_token
      }
    })
    .then (({data})=> {
      dispatch({type: "SUCCESS_FETCH_PESERTA", payload:data})
    })
    .catch((err) => {
      // Dispatch jika terjadi error
      dispatch({ type: "ERROR_DOWNLOAD_MUK", payload: err });
    })
    .finally (()=> {
      dispatch({type:"LOAD_FETCH_PESERTA"})
    })
  }
}

export const fetchDocumentsStatus = ({access_token}) => {
  return(dispatch) => {
    
  }
}

export const downloadDocument = ({access_token}) => {
  return(dispatch) => {
    
  }
}
