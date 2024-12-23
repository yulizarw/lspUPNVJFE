import axios from "../../config/axios"
import { POSITIONSTACK_API_KEY } from "config/config"
import Cookies from "js-cookie";

export const fetchLogin = (userInfo) => {
  return (dispatch) => {

    axios.post(`/user/login`, {
      userName: userInfo.userName,
      password: userInfo.password
    })
      .then(({ data }) => {
        var userData = data
        localStorage.setItem('access_token', userData.access_token)
        localStorage.setItem("userLogin", JSON.stringify(data));
        // Cookies.set('access_token', userData.access_token, { expires: 7 });
        // Cookies.set('userLogin', JSON.stringify(data))
        dispatch({ type: "USER_LOGIN", payload: userData })

      })
      .catch(err => {
        alert('Login Gagal')
      })
  }
}

export const resetRegister = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_REGISTER" })
  }
}

export const registerUser = (userInfo) => {
  return (dispatch) => {
    axios.post('/user/register', {
      userName: userInfo.userName,
      userPassword: userInfo.password,
      userRole: userInfo.userRole,
      userEmail: userInfo.userEmail,
      userPhoto: userInfo.userPhoto,
      userDepartment: userInfo.userDepartment,
      userPhone: userInfo.userPhone,
      userBirthdate: userInfo.userBirthdate,
      userDomisili: userInfo.userDomisili,
      sptAsesor: userInfo.sptAsesor
    })
      .then(({ data }) => {
        var userData = data
        dispatch({ type: "USER_REGISTER", payload: userData })

      })
      .catch(err => {
        dispatch({ type: "ERROR_REGISTER", payload: err })
      })
  }
}

export const logOut = () => {
  return (dispatch) => {
    dispatch({ type: 'USER_LOGOUT' })
  }
}

export const fetchDataPribadi = (access_token) => {
  return (dispatch) => {

    axios.get('/peserta/data-pribadi/', {
      headers: {
        access_token
      }
    })
      .then(({ data }) => {
        dispatch({ type: "SUCCESS_DATA_PRIBADI", payload: data })

      }).catch(err => {
        dispatch({ type: "ERROR_DATA_PRIBADI", payload: err })

      })
  }
}

export const fetchJadwalUjikomPeserta = (access_token) => {
  return (dispatch) => {
    axios.get('peserta/jadwal-ujikom-peserta', {
      headers: {
        access_token
      }
    })
      .then(({ data }) => {
        dispatch({ type: "SUCCESS_JADWAL_UJIKOM", payload: data })
      }).catch(err => {
        dispatch({ type: "ERROR_JADWAL_UJIKOM", payload: err })
      })
      .finally(() => {
        dispatch({ type: "FETCH_JADWAL_LOAD" })
      })
  }
}

export const fetchAllJadwal = (access_token) => {
  return (dispatch) => {

    axios.get('user/list-skema/', {
      headers: {
        access_token
      }
    })
      .then(({ data }) => {
        Cookies.set('alljadwal', JSON.stringify(data), { expires: 7 });
        dispatch({ type: "SUCCESS_ALL_JADWAL", payload: data })
      }).catch(err => {
        dispatch({ type: "ERROR_ALL_JADWAL", payload: err })
      })
      .finally(() => {
        dispatch({ type: "LOAD_ALL_JADWAL" })
      })
  }
}

export const verifikasiAlamatAction = (alamat) => {
  return (dispatch) => {
    const params = {
      access_key: POSITIONSTACK_API_KEY,
      query: alamat
    };

    axios.get('https://api.positionstack.com/v1/forward', { params })
      .then(response => {

        dispatch({ type: "SUCCESS_VERIFIKASI_ALAMAT", payload: response.data.data[0] })
      })
      .catch(error => {
        dispatch({ type: "ERROR_VERIFIKASI_ALAMAT", payload: error })
      });
  }
}

export const inputDataPeserta = ({ access_token, formInput }) => {
  return (dispatch) => {
    console.log(access_token, formInput)
    axios.post('/peserta/pendaftaran-skema', formInput, {
      headers: {
        access_token
      }
    })
      .then(({ data }) => {

        dispatch({ type: "SUCCESS_INPUT_DATA", payload: data })
      })
      .catch(error => {

        dispatch({ type: "ERROR_INPUT_DATA", payload: error })
      })
  }
}

export const pilihSkemaUjikom = ({ access_token, jadwal }) => {
  return (dispatch) => {

    const params = {
      namaSkema: jadwal.namaSkema
    }

    axios.put('/peserta/pilih-skema', params, {
      headers: {
        access_token
      }
    })
      .then(({ data }) => {
        dispatch({ type: "SUCCESS_PILIH_SKEMA", payload: true })
      })
      .catch(error => {
        dispatch({ type: "ERROR_PILIH_SKEMA", payload: error })
      })
  }
}

// data asessor
export const fetchDataDiriAsesor = (access_token) => {
  return (dispatch) => {

    axios.get('/asesor/lihat-data-diri', {
      headers: {
        access_token
      }
    })
      .then(({ data }) => {
        // localStorage.setItem('namaSkema', data.SkemaUjikom.namaSkema)
        // Cookies.set('dataAsesor', JSON.stringify(data), { expires: 7 });

        dispatch({ type: "SUCCESS_FETCH_DATA_ASESOR", payload: data })
      })
      .catch(error => {

        dispatch({ type: "ERROR_FETCH_DATA_ASESOR", payload: error })
      })
      .finally(() => {
        dispatch({ type: "LOAD_DATA_ASESOR" })
      })
  }
}

export const simpanDataAsesor = ({ access_token, formInput }) => {
  return (dispatch) => {
    axios.post('/asesor/update-data-diri', formInput, {
      headers: {
        access_token
      }
    })
      .then(({ data }) => {
        dispatch({ type: "SUCCESS_TAMBAH_DATA_DIRI", payload: data })

      })
      .catch(error => {
        dispatch({ type: "ERROR_TAMBAH_DATA_DIRI", payload: error })
      })
  }
}

export const updatePilihSkemaAsesor = ({ access_token, namaSkema }) => {
  return (dispatch) => {
    axios.put('/asesor/memilih-skema', namaSkema, {
      headers: {
        access_token
      }
    })
      .then(({ data }) => {
        dispatch({ type: "SUCCESS_PILIH_SKEMA_ASESOR", payload: data })
      })
      .catch(error => {

        dispatch({ type: "ERROR_PILIH_SKEMA_ASESOR", payload: error })
      })
  }

}

export const lihatJadwalKompetensiUser = (access_token) => {
  return (dispatch) => {
    axios.get('/user/jadwal-uji', {
      headers: {
        access_token
      }
    })
      .then(({ data }) => {
        console.log(data, 'ini di action jadwal')
        dispatch({ type: "SUCCESS_LIHAT_JADWAL_USER", payload: data })
      })
      .catch(error => {
        dispatch({ type: "ERROR_LIHAT_JADWAL_USER", payload: error })
       
      })
  }
}

export const listAPL02Asesor = (access_token) => {
  return (dispatch) => {
    axios.get('/asesor/list-apl02', {
      headers: {
        access_token
      }
    })
      .then(({ data }) => {
        dispatch({ type: "SUCCESS_LIST_APL_02", payload: data })
      })
      .catch(error => {
        dispatch({ type: "ERROR_LIST_APL_02", payload: error })
          .finally(() => {
            dispatch({ type: "FINISH_UPDATE" })
          })
      })
  }
}

export const addMUK = ({ access_token, formData, listAPL02, isExisting }) => {
  return (dispatch) => {
    if (listAPL02.length == 0 || isExisting == false) {
      axios.post('/asesor/tambah-muk', formData, {
        headers: {
          access_token
        }
      })
        .then(({ data }) => {
          dispatch({ type: "SUCCESS_POST_MUK", payload: data })
        })
        .catch(error => {
          dispatch({ type: "ERROR_UPDATE_MUK", payload: error })
        })
        .finally(() => {
          dispatch({ type: "FINISH_UPDATE" })
        })
    } else {

      formData.dynamicFields.map((field) =>
        axios.patch(`/asesor/update-muk/${field.id}`, field, {
          headers: {
            access_token
          }
        })
          .then(({ data }) => {
            dispatch({ type: "SUCCESS_UPDATE_MUK", payload: true })
          })
          .catch(error => {
            dispatch({ type: "ERROR_UPDATE_MUK", payload: error })
          })
      )
    }
  }
}

export const destroyMUK = ({access_token, passingPayload}) =>{
  return(dispatch) => {
   
    axios.delete(`asesor/delete-muk/${passingPayload}`, {
      headers:{access_token}
    })
    .then(({ data }) => {
      dispatch({ type: "SUCCESS_UPDATE_MUK", payload: false })
    })
    .catch(error => {
      dispatch({ type: "ERROR_UPDATE_MUK", payload: error })
    })
  }
}

export const simpanAPL01 = ({access_token, formData})=> {
  return(dispatch) => {
    axios.post('peserta/pengisian-apl01', formData, {
      headers:{
        access_token
      }
    })
    .then(({ data }) => {
      dispatch({type:"SUCCESS_SIMPAN_APL01", payload:data})
    })
    .catch(error => {
      dispatch({ type: "ERROR_SIMPAN_APL01", payload: error })
    })
  }
}

export const fetchListAPL02Peserta =({access_token})=> {
  return (dispatch) => {
    axios.get('/peserta/get-apl02-pertanyaan', {
      headers:{
        access_token
      }
    })
    .then(({data})=>{
      dispatch({type:"SUCCESS_GET_LIST_APL02", payload:data})
      
    })
    .catch(error => {
      dispatch({ type: "ERROR_SIMPAN_APL01", payload: error })
    })
  }
}

export const simpanAPL02Peserta = ({access_token, formData}) => {
  return (dispatch) => {
    console.log(formData,'di action')
    axios.post('peserta/pengisian-apl02-detil', formData, {
      headers:{
        access_token
      }
    })
    .then(({data})=> {
      dispatch({type:"SUCCESS_SIMPAN_APL02_PESERTA", payload:data})
    })
    .catch(error => {
      dispatch({type:"ERROR_SIMPAN_APL01", payload: error})
    })
  }
}

export const simpanPortfolioPeserta = ({access_token, links}) => {
  return (dispatch) => {
    axios.post('peserta/isi-bukti-portofolio', links, {
      headers : {
        access_token
      }
    })
    .then(({data})=> {
      dispatch({type:"SUCCESS_SIMPAN_PORTFOLIO", payload: data})
    })
    .catch(error => {
      dispatch({type:"ERROR_SIMPAN_APL01", payload: error})
    })
  }
}