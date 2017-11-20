const api = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  "Content-Type": "application/json",
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
  fetch(`${api}/${elemType}/${elemID}`,
      { headers: headers, method:'POST', body: JSON.stringify({ option:'upVote' })} )
    .then(res => res.text())
    .then((text) => {
      console.log('request succeeded with JSON response', text)
    }).catch(function (error) {
      console.log('request failed', error)
    })

export const voteDown = (elemID, elemType) =>
  fetch(`${api}/${elemType}/${elemID}`, { headers: headers, method:'POST', body: JSON.stringify({ option:'downVote' })} )
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
  fetch(`${api}/posts/${id}`, { headers:headers, method:'PUT', body: JSON.stringify({ title, body })})
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

    let { id, timestamp, title, body, author, category, voteScore, commmentCount, deleted} = post

    fetch(`${api}/posts`,
      { method: "POST", headers, body: JSON.stringify({
        id:id,
        timestamp: timestamp,
        title:title,
        body: body,
        author: author,
        category: category,
        voteScore: voteScore,
        commentCount: commmentCount,
        deleted: deleted})}
    )
      .then(res => res.json())
      .then(data => {
        console.log('id', id);
        console.log('timestamp', timestamp);
        console.log('body', body);
        console.log('result', data);
    })

  }

export const addComment = (comment, elemType ) => {

    let { id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted } = comment

    fetch(`${api}/comments`,
      { method: "POST", headers, body: JSON.stringify({
        id: id,
        parentId: parentId,
        timestamp: timestamp,
        body: body,
        author: author,
        voteScore: voteScore,
        deleted: deleted,
        parentDeleted: parentDeleted})}
    )
      .then(res => res.json())
      .then(data => {
        console.log('id', id);
        console.log('timestamp', timestamp);
        console.log('body', body);
        console.log('result', data);
    })

  }
