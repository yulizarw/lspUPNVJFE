const initialState = {
  postMUK : "",
  errorPostMUK :"",

  listMUK : [],
  error:"",
  loadListMUK : true,

  loading : true,

  pesertaUjikomList: [],
  errorFetchPeserta: ""
}

export const asesorReducers = (state = initialState, { type, payload }) => {
  switch(type) {

    case "SUCCESS_POST_MUK":
      return {...state, postMUK:payload}
    
    case "ERROR_UPLOAD_MUK":
      return {...state,errorPostMUK:payload}

    case "RESET":
      return {...state,errorPostMUK:""}

    case "SUCCESS_GET_LIST_MUK":
      return {...state, listMUK : payload}

    case "ERROR_GET_LIST_MUK":
      return {...state, error : payload}
    case "LOAD_ALL_MUK":
      return {...state, loadListMUK:false}
    
    case "SUCCESS_FETCH_PESERTA":
      return {...state, pesertaUjikomList:payload}
    
    case "ERROR_DOWNLOAD_MUK":
      return {...state, errorFetchPeserta:payload}

    case "LOAD_FETCH_PESERTA":
      return {...state, loading:false}
    default:
      return state
  }
}
