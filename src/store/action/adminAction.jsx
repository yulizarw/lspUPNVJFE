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

export const addNewSkemaUjikom = ({ access_token, dynamicFields }) => {
  return (dispatch) => {
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

export const addTUKAction = ({ access_token, data }) => {
  return (dispatch) => {
    console.log(data, 'adsadasdasdasdsa')
    axios.post("user/admin/tambah-tuk", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        access_token
      },
    })

    .then((response) => { // Perbaiki destructuring
      console.log("Response API:", response);
      dispatch({ type: "ADD_TUK_SUCCESS", payload: response.data });
      alert("TUK berhasil ditambahkan!");
    })
    .catch((error) => {
      console.error("Error dari API:", error.response); // Debugging error
      dispatch({ type: "ADD_TUK_FAIL", payload: error.response?.data || {} });
      alert("Gagal menambahkan TUK: " + (error.response?.data?.message || error.message));
    });
  }
}