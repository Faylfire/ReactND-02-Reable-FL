const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}


export const getAll = (dataObj) =>
  fetch(`${api}/${dataObj}`, { headers: headers,} )
    .then( (res) => { return(res.json()) })
    .then((data) => {
    //console.log(genID())
    //console.log('Timestamp: ' + Date.now())
    return data
  })

export const delPost = (postID) =>
  fetch(`${api}/posts/${postID}`, { headers: headers, method:'delete'} )
    .then( (res) => { return(res) })
    .then((data) => {
    console.log(data)
    //console.log('Timestamp: ' + Date.now())
    return data
  })