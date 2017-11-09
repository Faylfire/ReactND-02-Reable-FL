import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import { updatePost, removePost, updateComment, removeComment, setFilter } from '../actions'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import { getImg, getDate} from '../utils/helper.js'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import VoteScore from './VoteScore.js'



const ShowPosts = (props) => {
	//let {category, number} = props.match.params
	//const {posts, comments, categories, router, addPost, addComment, deleteComment, deletePost, setCategory} = props
	//let category = router.location.pathname.slice(1)
  /*
	if (Object.keys(props.match.params).length === 0){
		category = ''
	}*/
  const {posts, router, addPost, addComment, deleteComment, deletePost, setCategory} = props
  let category = router.location.pathname.slice(1)
  let postsList = [...Object.values(posts)].filter((c) => {
        return (c.deleted !== true && (c.category == category || category == ''))
      })

  console.log("In SHOW POSTS")
	return (
		<div>
			  <ol className='contact-list'>
          {postsList.length == 0 ?
            <div className='nothing-here'>
              <em>There doesn't seem to be anything here...</em>
            </div> :
            postsList.map((post, index) =>
            <li key={post.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${getImg(post)})`
                }}/>
              <VoteScore
                elemID={post.id}
                elemType='posts'
              />
              <div className="contact-details">
                <h3>
                	<Link
                  	to={`/${post.category}/${post.id}`}
                  	onClick={()=> setCategory({category:post.category})}
                	>{post.title}</Link></h3>
                <p>{`Submitted on ${getDate(post.timestamp)}`}</p>
                <p className="post-author"><strong>{`by ${post.author}`}</strong></p>
                <p className="post-author">{`${post.commentCount} comments`}</p>
              </div>
              <button className='contact-remove' onClick={()=> deletePost({postID:post.id})}>
                Remove
              </button>
            </li>
          )}
        </ol>
		</div>
		)
}


function mapStateToProps ({ posts, comments, categories, viewFilter, router }) {

  return {
    posts: posts,
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
  )(ShowPosts)