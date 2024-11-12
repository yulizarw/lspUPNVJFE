import axios from "../../config/axios"
import { POSITIONSTACK_API_KEY } from "config/config"

export const fetchLogin = (userInfo) => {
  return (dispatch)=>{
    
    axios.post(`/user/login`,{
      userName:userInfo.userName,
      password:userInfo.password
    })
    .then(({data})=> {
      var userData = data
      localStorage.setItem('access_token', userData.access_token)
      dispatch({type:"USER_LOGIN", payload:userData})
      console.log(data)
    })
    .catch(err=> {
      alert('Login Gagal')
    })
  }
}

export const resetRegister = () => {
  return (dispatch) => {
    dispatch ({type:"RESET_REGISTER"})
  }
}

export const registerUser = (userInfo) => {
  return (dispatch) => {
    axios.post ('/user/register', {
      userName: userInfo.userName,
      userPassword: userInfo.password,
      userRole: userInfo.userRole,
      userEmail: userInfo.userEmail,
      userPhoto: userInfo.userPhoto,
      userDepartment: userInfo.userDepartment,
      userPhone: userInfo.userPhone,
      userBirthdate : userInfo.userBirthdate,
      userDomisili: userInfo.userDomisili,
      sptAsesor: userInfo.sptAsesor
    })
    .then(({data})=> {
      var userData = data
      dispatch({type:"USER_REGISTER", payload:userData})
      console.log(data)
    })
    .catch(err=> {
      dispatch({type:"ERROR_REGISTER", payload:err})
    })
  }
}

export const logOut = () => {
  return (dispatch) => {
    dispatch({type:'USER_LOGOUT'})
  }
}

export const fetchDataPribadi = (access_token) => {
  return(dispatch) => {

    axios.get('/peserta/data-pribadi/',{
      headers:{
        access_token
      }
    })
    .then(({data})=>{
      dispatch({type:"SUCCESS_DATA_PRIBADI", payload:data})
      console.log(data,'berhasil')
    }).catch(err=> {
      dispatch({type:"ERROR_DATA_PRIBADI",payload:err})
      console.log(err,'disni')
    })
  }
}

export const fetchJadwalUjikomPeserta = (access_token) => {
  return (dispatch) => {
    axios.get('peserta/jadwal-ujikom-peserta', {
      headers:{
        access_token
      }
    })
    .then(({data})=> {
      dispatch({type:"SUCCESS_JADWAL_UJIKOM", payload:data})
    }).catch(err =>{
      dispatch({type:"ERROR_JADWAL_UJIKOM", payload:err})
    })
    .finally(()=>{
      dispatch({type:"FETCH_JADWAL_LOAD"})
    })
  }
}

export const fetchAllJadwal =(access_token) => {
  return(dispatch) => {
    
    axios.get('user/list-skema/',{
      headers:{
        access_token
      }
    })
    .then(({data})=>{
      dispatch({type:"SUCCESS_ALL_JADWAL", payload:data})
    }).catch(err=>{
      dispatch({type:"ERROR_ALL_JADWAL", payload:err})
    })
    .finally(()=>{
      dispatch({type:"LOAD_ALL_JADWAL"})
    })
  }
}

export const verifikasiAlamatAction = (alamat) => {
  return(dispatch) => {
    const params = {
      access_key: POSITIONSTACK_API_KEY,
      query: alamat
    };
   
    axios.get('https://api.positionstack.com/v1/forward', { params })
    .then(response => {
    
      dispatch({type:"SUCCESS_VERIFIKASI_ALAMAT",payload:response.data.data[0]})
    })
    .catch(error => {
      dispatch({type:"ERROR_VERIFIKASI_ALAMAT", payload:error})
    });
  }
}

export const inputDataPeserta = ({access_token, formInput}) => {
  return (dispatch) => {
    console.log(access_token,formInput)
    axios.post ('/peserta/pendaftaran-skema',formInput, {
      headers:{
        access_token
      }
    })
    .then(({data})=>{
      console.log(data)
      dispatch({type:"SUCCESS_INPUT_DATA", payload:data})
    })
    .catch(error =>{
      console.log(error)
      dispatch({type:"ERROR_INPUT_DATA", payload:error})
    })
  }
}

export const pilihSkemaUjikom = ({access_token,jadwal}) => {
  return (dispatch) => {
    console.log(access_token, jadwal.namaSkema, 'di action')
    const params = {
      namaSkema : jadwal.namaSkema
    }
    
    axios.put('/peserta/pilih-skema', params, {
      headers:{
        access_token
      }
    })
    .then(({data})=> {
      dispatch({type:"SUCCESS_PILIH_SKEMA", payload:true})
    })
    .catch(error =>{
      dispatch({type:"ERROR_PILIH_SKEMA", payload:error})
    })
  }
}

// data asessor
export const fetchDataDiriAsesor = (access_token) => {
  return(dispatch) => {
    console.log(access_token,'data asesor')
    axios.get('/asesor/lihat-data-diri', {
      headers:{
        access_token
      }
    })
    .then(({data})=>{
      console.log(data,'diuserAction')
      dispatch({type:"SUCCESS_FETCH_DATA_ASESOR", payload:data})
    })
    .catch(error => {
      dispatch({type:"ERROR_FETCH_DATA_ASESOR", payload:error})
    })
    .finally(()=>{
      dispatch({type:"LOAD_DATA_ASESOR"})
    })
  }
}

export const simpanDataAsesor = ({access_token,formInput})=> {
  return(dispatch) =>{
    axios.post('/asesor/update-data-diri', formInput, {
      headers:{
        access_token
      }
    })
    .then(({data})=>{
      dispatch({type:"SUCCESS_TAMBAH_DATA_DIRI", payload:data})
    })
    .catch(error =>{
      dispatch({type:"ERROR_TAMBAH_DATA_DIRI", payload:error})
    })
  }
}

export const updatePilihSkemaAsesor = ({access_token,namaSkema})=> {
  return(dispatch) => {
    axios.put('/asesor/memilih-skema', namaSkema, {
      headers:{
        access_token
      }
    })
    .then(({data})=>{
      dispatch({type:"SUCCESS_PILIH_SKEMA_ASESOR", payload:data})
    })
    .catch(error => {
      dispatch({type:"ERROR_PILIH_SKEMA_ASESOR",payload:error})
    })
  }

}