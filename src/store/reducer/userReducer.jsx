import { listAPL02Asesor } from "store/action/userAction"
import { lihatJadwalKompetensiUser } from "store/action/userAction"

const initialState = {
  userLogin: JSON.parse(localStorage.getItem("userLogin")) || null,

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
  asesorData: {},
  asesorDataError: "",
  loadDataAsesor: true,

  addDataAsesor: {},
  addDataAsesorError: "",

  statusPilihSkemaAsesor: {},
  errorPilihSkemaAsesor: "",

  lihatJadwalUjiUser: {},
  errorLihatJadwalUjiUser: "",

  listAPL02Asesor: [],
  errorListAPL02Asesor: "",

  statusPostMUK: false,
  errorPostMUK: "",

  statusSimpanAPL01: "",
  errorSimpanAPL01: "",

  listAPL02Peserta:[],

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
      return { ...state, statusPilihSkemaPeserta: true }

    case "ERROR_PILIH_SKEMA":
      return { ...state, statusGagalPilihSKemaPeserta: payload }

    case "SUCCESS_FETCH_DATA_ASESOR":
      return { ...state, asesorData: payload }

    case "ERROR_FETCH_DATA_ASESOR":
      return { ...state, asesorDataError: payload }

    case "LOAD_DATA_ASESOR":
      return { ...state, loadDataAsesor: false }

    case "SUCCESS_TAMBAH_DATA_DIRI":
      return { ...state, addDataAsesor: payload }

    case "ERROR_TAMBAH_DATA_DIRI":
      return { ...state, addDataAsesorError: payload }

    case "SUCCESS_PILIH_SKEMA_ASESOR":
      return { ...state, statusPilihSkemaAsesor: payload }

    case "ERROR_PILIH_SKEMA_ASESOR":
      return { ...state, errorPilihSkemaAsesor: payload }

    case "SUCCESS_LIHAT_JADWAL_USER":
      return { ...state, lihatJadwalUjiUser: payload }

    case "ERROR_LIHAT_JADWAL_USER":
      return { ...state, errorLihatJadwalUjiUser: payload }

    case "SUCCESS_LIST_APL_02":
      return { ...state, listAPL02Asesor: payload }

    case "ERROR_LIST_APL_02":
      return { ...state, errorListAPL02Asesor: payload }

    case "SUCCESS_UPDATE_MUK":
      return { ...state, statusPostMUK: payload }

    case "ERROR_UPDATE_MUK":
      return { ...state, errorPostMUK: payload }

    case "SUCCESS_UPDATE_MUK":
      return { ...state, statusPostMUK: payload }

    case "ERROR_UPDATE_MUK":
      return { ...state, errorPostMUK: payload }

    case "FINISH_UPDATE":
      return { ...state, statusPostMUK: false }

    case "SUCCESS_POST_MUK":
      return { ...state, statusPostMUK: payload }

    case "SUCCESS_SIMPAN_APL01":
      return {...state, statusSimpanAPL01:payload}

    case "ERROR_SIMPAN_APL01":
      return {...state, errorSimpanAPL01:payload}
    
    case "SUCCESS_GET_LIST_APL02":
      return {...state,listAPL02Peserta:payload}
    
    default:
      return state
  }
}