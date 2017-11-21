import React from 'react';
import { Link } from 'react-router-dom'
import { openModal, updatePost, removePost, updateComment, removeComment, setFilter, commentsFetchData } from '../actions'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import { getImg, timeSince, nl2br} from '../utils/helper.js'
//import sortBy from 'sort-by'
import { connect } from 'react-redux'
import ListComments from './ListComments.js'
import VoteScore from './VoteScore.js'
import { Button, Icon } from 'semantic-ui-react'


const PostDetails = (props) => {
	//let {category, number} = props.match.params
	const {posts, router, deletePost, setCategory, openMod} = props
	let path = router.location.pathname.slice(1)
  let havePostID = path.indexOf('/')
  if ( havePostID < 0){
    setCategory(path)
  }
  let id = path.slice(path.indexOf('/')+1)


	let postsList = [...Object.values(posts)].filter((c) => {
        return (c.deleted !== true && c.id === id )
      })


	return (
		<div className="post-details">
      {postsList.length === 0 ?
        <div className="nothing-here">
          <em>There doesn't seem to be anything here...</em>
        </div> :
        postsList.map((post, index) =>
          <div key={post.id}>
            <div className="post-item">
              <div className="post-heading">
                <div className="contact-avatar" style={{
                  backgroundImage: `url(${getImg(post.category)})`
                }}/>
                <VoteScore
                  className="post-detail-vote"
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
                  <p className="post-author">{`by ${post.author}`}</p>
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
              </div>
              <div className="post-body">
                {nl2br(post.body).split('<br />').map((paragraph, index) => <p key={index}>{paragraph}</p> )}
              </div>

            </div>
            <div className="post-comment-count">
              {post.commentCount === 1 ?
                <h4>{`${post.commentCount} comment`}</h4> :
                <h4>{`${post.commentCount} comments`}</h4>
              }
            </div>

            <ListComments postID={post.id} />
          </div>

        )
      }

		</div>
		)
}


function mapStateToProps ({ posts, categories, viewFilter, router, items }) {

  return {
    posts: posts,
    categories: categories,
    viewFilter: viewFilter,
    router: router,
    items: items,
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
    fetchComments: (url) => dispatch(commentsFetchData(url)),
    openMod: (data) => dispatch(openModal({elemType:data.elemType,
                                           elemID:data.elemID,
                                           elemNew:data.elemNew})),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(PostDetails)

