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
    //console.log('Timestamp: ' + Date.now())
    return data
  })

export const delComment = (commentID) =>
  fetch(`${api}/comments/${commentID}`, { headers: headers, method:'delete'} )
    .then( (res) => { return(res) })
    .then((data) => {
    return data
  })

export const getComments = (postID) =>
  fetch(`${api}/posts/${postID}/comments`, { headers: headers,} )
    .then( (res) => { return(res) })


export const voteUp = (elemID, elemType) =>
  fetch(`${api}/${elemType}/${elemID}`, { headers: headers, method:'POST'} )
    .then( (res) => { return(res) })
    .then((data) => {
    return data
  })

export const voteDown = (elemID, elemType) =>
  fetch(`${api}/${elemType}/${elemID}`, { headers: headers, method:'POST'} )
    .then( (res) => { return(res) })
    .then((data) => {
    return data
  })