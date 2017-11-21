import React from 'react';
import { Link } from 'react-router-dom'
import { updatePost, removePost, updateComment, removeComment, setFilter, openModal } from '../actions'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import { getImg, timeSince} from '../utils/helper.js'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import VoteScore from './VoteScore.js'
import { Button, Icon  } from 'semantic-ui-react'


const ShowPosts = (props) => {

  const {sortType, posts, router, deletePost, setCategory, openMod} = props
  //Parse out the category
  let category = router.location.pathname.slice(1)
  //Filter for category in the case of category view, and non-deleted posts, or the catchall
  let postsList = [...Object.values(posts)].filter((c) => {
        return (c.deleted !== true && (c.category === category || category === ''))
      })

  //Sort Posts by sortType selected
  postsList.sort(sortBy(sortType))
	return (
		<div className="show-posts">
			  <ol className="contact-list">
          {postsList.length === 0 ?
            <div className="nothing-here">
              <em>There doesn't seem to be anything here...</em>
            </div> :
            postsList.map((post, index) =>
            <li key={post.id} className="contact-list-item">
              <div className="contact-avatar" style={{
                backgroundImage: `url(${getImg(post.category)})`
                }}/>
              <VoteScore
                elemID={post.id}
                elemType="posts"
              />
              <div className="contact-details">
                <h3>
                	<Link
                  	to={`/${post.category}/${post.id}`}
                  	onClick={()=> setCategory({category:post.category})}
                	>{post.title}</Link></h3>
                <p>{`Submitted ${timeSince(post.timestamp)} ago`}</p>
                <p className="post-author"><strong>{`by ${post.author}`}</strong></p>
                <p className="post-author">{`${post.commentCount} comments`}</p>
              </div>
              <div className="edit-delete">
                <Button icon
                  onClick={() => openMod({elemType:'posts', elemID:post.id, elemNew:false})}
                  circular
                  positive
                  >
                  <Icon name="edit" />
                </Button>
                <Button icon
                  onClick={()=> deletePost({postID:post.id})}
                  circular
                  negative
                  >
                  <Icon name="remove" />
                </Button>
              </div>
            </li>
          )}
        </ol>
		</div>
		)
}


function mapStateToProps ({ sortType, posts, viewFilter, router }) {

  return {
    posts: posts,
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
    setCategory: (data) => dispatch(setFilter(data)),
    openMod: (data) => dispatch(openModal({elemType:data.elemType,
                                           elemID:data.elemID,
                                           elemNew:data.elemNew})),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(ShowPosts)