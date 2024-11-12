const initialState = {
  userLogin: {},

  registerStatus: false,
  registerError: null,

  // data pribadi peserta ujikom
  dataPribadi: {},
  errorDataPribadi: "",

  // jadwal pesertaujikom
  jadwalPesertaUjikom: {},
  jadwalPesertaError: "",
  loadingJadwalFetch: true,

  allJadwal: [],
  allJadwalError: "",
  loadingJadwalFetch: true,

  // verifikasi alamat peserta
  latPeserta: 0,
  longPeserta: 0,
  errorVerifikasiAlamat: "",


  // input data peserta
  statusInputData: "",
  statusGagalInput: "",

  // pilih skema peserta
  statusPilihSkemaPeserta: false,
  statusGagalPilihSKemaPeserta: "",

  // get data asesor
  asesorData:{},
  asesorDataError:"",
  loadDataAsesor:true,

  addDataAsesor:{},
  addDataAsesorError:"",

  statusPilihSkemaAsesor:{},
  errorPilihSkemaAsesor:"",

}

export const userReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER_LOGIN":
      return { ...state, userLogin: payload }

    case "RESET_REGISTER":
      return { ...state, registerStatus: false }

    case "USER_REGISTER":
      return { ...state, registerStatus: true }

    case "ERROR_REGISTER":
      return { ...state, registerError: payload }

    case "USER_LOGOUT":
      return initialState;

    case "SUCCESS_DATA_PRIBADI":
      return { ...state, dataPribadi: payload }

    case "ERROR_DATA_PRIBADI":
      return { ...state, errorDataPribadi: payload }

    case "SUCCESS_JADWAL_UJIKOM":
      return { ...state, jadwalPesertaUjikom: payload }

    case "ERROR_JADWAL_UJIKOM":
      return { ...state, jadwalPesertaError: payload }

    case "FETCH_JADWAL_LOAD":
      return { ...state, loadingJadwalFetch: false }

    case "SUCCESS_ALL_JADWAL":
      return { ...state, allJadwal: payload }

    case "ERROR_ALL_JADWAL":
      return { ...state, allJadwalError: payload }

    case "LOAD_ALL_JADWAL":
      return { ...state, loadingJadwalFetch: false }

    case "SUCCESS_VERIFIKASI_ALAMAT":
      console.log(payload.longitude, 'reduces')
      return { ...state, latPeserta: payload.latitude, longPeserta: payload.longitude }

    case "ERROR_VERIFIKASI_ALAMAT":
      return { ...state, errorVerifikasiAlamat: payload }

    case "SUCCESS_INPUT_DATA":
      return { ...state, statusInputData: payload }

    case "ERROR_INPUT_DATA":
      return { ...state, statusGagalInput: payload }

    case "SUCCESS_PILIH_SKEMA":
      return { ...state, statusPilihSkemaPeserta:true}
    
    case "ERROR_PILIH_SKEMA" :
      return {...state, statusGagalPilihSKemaPeserta:payload}
    
    case "SUCCESS_FETCH_DATA_ASESOR" :
      return {...state, asesorData:payload}

    case "ERROR_FETCH_DATA_ASESOR" :
      return {...state, asesorDataError:payload}
    
    case "LOAD_DATA_ASESOR" :
      return {...state, loadDataAsesor:false}
    
    case "SUCCESS_TAMBAH_DATA_DIRI":
      return {...state, addDataAsesor:payload}
    
    case "ERROR_TAMBAH_DATA_DIRI":
      return {...state, addDataAsesorError:payload}
    
    case "SUCCESS_PILIH_SKEMA_ASESOR":
      return {...state,statusPilihSkemaAsesor:payload}
    
    case "ERROR_PILIH_SKEMA_ASESOR":
      return {...state,errorPilihSkemaAsesor:payload}
    default:
      return state
  }
}