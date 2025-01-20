import axios from '../../config/axios'


export const FetchDataSkemaUjikom = (access_token) => {
  return (dispatch) => {

    axios.get('user/list-skema/', {
      headers: {
        access_token
      }
    })
      .then(({ data }) => {
        dispatch({ type: "SUCCESS_INFO_SKEMA", payload: data })

      }).catch(err => {
        // dispatch({ type: "ERROR_ALL_JADWAL", payload: err })
        dispatch({ type: "ERROR_INFO_SKEMA", payload: err })
      })
      .finally(() => {
        dispatch({ type: "LOAD_INFO_JADWAL" })

      })
  }
}

export const addNewSkemaUjikom = ({access_token, dynamicFields}) => {
  return (dispatch) => {
    console.log(access_token, ',,,')

    // axios.post('user/admin/tambah-skema', dynamicFields, {
    //   headers:{
    //     access_token
    //   }
    // })
    // .then(({ data }) => {
    //   dispatch({type:"SUCCESS_ADD_SKEMA", payload:data})

    // }).catch(err => {
    //   // dispatch({ type: "ERROR_ALL_JADWAL", payload: err })
    //   dispatch({type:"ERROR_ADD_SKEMA", payload:err})
    // })
    // // .finally(() => {
    // //   dispatch({ type: "LOAD_ADD_JADWAL" })

    // // })
  console.log(dynamicFields,'asd')
    for (const field of dynamicFields) {

      axios.post('user/admin/tambah-skema', field, {
        headers: {
          access_token,
        },
      })
        .then(({ data }) => {
          dispatch({ type: "SUCCESS_ADD_SKEMA", payload: data })

        }).catch(err => {
          // dispatch({ type: "ERROR_ALL_JADWAL", payload: err })
          dispatch({ type: "ERROR_ADD_SKEMA", payload: err })
        })

    }

  }
}