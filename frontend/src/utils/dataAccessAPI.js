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
        .then(res => res.text())
    .then((text) => {
      console.log('request succeeded with JSON response', text)
    }).catch(function (error) {
      console.log('request failed', error)
    })

export const delComment = (commentID) =>
  fetch(`${api}/comments/${commentID}`, { headers: headers, method:'delete'} )
    .then( (res) => { return(res) })


export const getComments = (postID) =>
  fetch(`${api}/posts/${postID}/comments`, { headers: headers,} )
    .then( (res) => { return(res) })


export const voteUp = (elemID, elemType) =>
  fetch(`${api}/${elemType}/${elemID}`, { headers: headers, method:'POST'} )
    .then(res => res.text())
    .then((text) => {
      console.log('request succeeded with JSON response', text)
    }).catch(function (error) {
      console.log('request failed', error)
    })

export const voteDown = (elemID, elemType) =>
  fetch(`${api}/${elemType}/${elemID}?option="downVote"`, { headers: headers, method:'POST'} )
    .then(res => res.text())
    .then((text) => {
      console.log('request succeeded with JSON response', text)
    }).catch(function (error) {
      console.log('request failed', error)
    })


/*export const editPost = (elemID, elemType, body, title) =>
  fetch(`${api}/posts/${elemID}?body=${body}&title=${title}`, { headers: headers, method:'PUT'} )
    .then( (res) => { return(res) })*/


export const editPost = (id, elemType, body, title) =>
  fetch(`${api}/posts/${id}`, { method: "PUT", headers, body: JSON.stringify({ title, body })})
    .then(res => res.json())
    .then(data => {
      console.log('id', id);
      console.log('body', body);
      console.log('title', title);
      console.log('result', data);
    })

/*export const editComment = (elemID, elemType, body, timestamp) =>
  fetch(`${api}/comments/${elemID}?body=${body}&timestamp=${timestamp}`, { headers: headers, method:'PUT'} )
    .then( (res) => { return(res) })
    */

export const editComment = (id, elemType, body, timestamp) =>
  fetch(`${api}/comments/${id}`, { method: "PUT", headers, body: JSON.stringify({ timestamp, body })})
    .then(res => res.json())
    .then(data => {
      console.log('id', id);
      console.log('timestamp', timestamp);
      console.log('body', body);
      console.log('result', data);
    })



export const addPost = (post, elemType ) => {

    let query = Object.keys(post).reduce((q, curr) => {
      q = q.concat(`${curr}=${post[curr]}&`)

      return q
    }, '')

    console.log(query.slice(0,-1))
    fetch(`${api}/${elemType}?${query.slice(0,-1)}`, { headers: headers, method:'POST'} )
      .then( (res) => { return(res) })
      .then((data) => {
      return data
    })

  }

export const addComment = (comment, elemType ) => {

    let query = Object.keys(comment).reduce((q, curr) => {
      q = q.concat(`${curr}=${comment[curr]}&`)

      return q
    }, '')


    fetch(`${api}/${elemType}?${query.slice(0,-1)}`, { headers: headers, method:'POST'} )
      .then( (res) => { return(res) })
      .then((data) => {
      return data
    })

  }

