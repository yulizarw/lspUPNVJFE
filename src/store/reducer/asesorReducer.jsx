const initialState = {
  postMUK : "",
  errorPostMUK :"",

  listMUK : [],
  error:"",
  loadListMUK : true,
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
    default:
      return state
  }
}
