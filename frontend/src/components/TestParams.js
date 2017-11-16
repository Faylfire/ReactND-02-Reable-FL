import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import { updatePost, removePost, updateComment, removeComment, setFilter } from '../actions'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import { getImg, getDate} from '../utils/helper.js'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import ShowPosts from './ShowPosts.js'
import PostDetails from './PostDetails.js'


const TestParams = (props) => {
	//let {category, number} = props.match.params
	const {sortType, posts, comments, categories, router, addPost, addComment, deleteComment, deletePost, setCategory} = props
	let category = router.location.pathname.slice(1)

	let path = router.location.pathname.slice(1)
  let havePostID = path.indexOf('/')
  let id
  if ( havePostID > 0){
  	category = category.slice(0, havePostID)
  	setCategory(category)
  	id = path.slice(path.indexOf('/')+1)
  }
  /*
	if (Object.keys(props.match.params).length === 0){
		category = ''
	}*/

	let postsList = [...Object.values(posts)].filter((c) => {
        return (c.deleted !== true && (c.category == category || category == ''))
      })

	console.log(props)
	console.log("Posts for: " + category)
	console.log("Posts for: " + id)
	console.log(postsList)
	return (
		<div className="show-posts">
        <ShowPosts />
		</div>
		)
}


function mapStateToProps ({ sortType, posts, comments, categories, viewFilter, router }) {

  return {
    posts: posts,
    comments: comments,
    categories: categories,
    viewFilter: viewFilter,
    router: router,
    sortType: sortType,
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
  )(TestParams)

