import React from 'react';
import { Link, NavLink, Route } from 'react-router-dom'
import { updatePost, removePost, updateComment, removeComment, setFilter } from '../actions'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import { getImg, getDate} from '../utils/helper.js'
import sortBy from 'sort-by'
import { connect } from 'react-redux'


const PostDetails = (props) => {
	//let {category, number} = props.match.params
	const {posts, comments, categories, router, addPost, addComment, deleteComment, deletePost, setCategory} = props
	let path = router.location.pathname.slice(1)
  let havePostID = path.indexOf('/')
  if ( havePostID < 0){
    setCategory(path)
  }
  let id = path.slice(path.indexOf('/')+1)
  /*
	if (Object.keys(props.match.params).length === 0){
		category = ''
	}*/


	let postsList = [...Object.values(posts)].filter((c) => {
        return (c.deleted !== true && c.id == id )
      })

	console.log("I'm in POST DETAILS")
	return (
		<div className='post-details'>
      <em>There should be a post here!</em>
      {postsList.map((post, index) =>
        <div key={post.id} className='post-item'>
          <h3>{post.title}</h3>
          <p>{`Submitted on ${getDate(post.timestamp)}`}</p>
          <p className="post-author">{`by ${post.author}`}</p>
          <p className="post-author">{`Vote Score: ${post.voteScore}`}</p>
          <div>
          <p>{post.body}</p>
          </div>
        </div>
      )}
		</div>
		)
}


function mapStateToProps ({ posts, comments, categories, viewFilter, router }) {

  return {
    posts: posts,
    comments: comments,
    categories: categories,
    viewFilter: viewFilter,
    router: router,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(updatePost(data)),
    deletePost: (data) => {
      dataAccessAPI.delPost(data.postID)
      return dispatch(removePost(data))
    },
    addComment: (data) => dispatch(updateComment(data)),
    deleteComment: (data) => dispatch(removeComment(data)),
    setCategory: (data) => dispatch(setFilter(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(PostDetails)

