import React, { Component } from 'react';
import { timeSince, getDate, getImg } from '../utils/helper.js'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { decCommCount, updateComment, removeComment, setFilter, commentsFetchData, openModal } from '../actions'
import VoteScore from './VoteScore.js'
import { Button, Icon, Label } from 'semantic-ui-react'



class ListComments extends Component {

  componentDidMount() {
    let {postID, fetchComments} = this.props
    fetchComments(postID)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.items.length > this.props.items.length){
      this.setState({render:true})
    }
  }

  handleOpen = () => {
    let { postID } = this.props
    this.props.openMod({elemType:'comments', elemID:'', elemNew:true, parentId:postID})
  }

	render() {
    let { items, isLoading, hasErrored, deleteComment, openMod } = this.props

    if (hasErrored) {
      return (
        <div className='nothing-here'>
          <em>There doesn't seem to be anything here...</em>
        </div>)
    }

    if (isLoading) {
      return (
        <div className='nothing-here'>
          <em>Loading...</em>
        </div>)
    }

    let commentList = [...Object.values(items)].filter((c) => {
        return (c.deleted !== true)
      })

    return (
      <div>
        <div className='new-post-modal'>
          <Button content='Write a Comment' labelPosition='left' icon='commenting' onClick={this.handleOpen}/>
        </div>
        <div className='comment-list'>
      		<ol className='contact-list'>
            {commentList.length === 0 ?
              <div className='nothing-here'>
                <em>Add a comment!</em>
              </div> :
              commentList.map((comment, index) =>
              <li key={comment.id} >
                <div className='post-item'>
                  <div className='post-heading'>
                    <div className='contact-avatar' style={{
                      backgroundImage: `url(${getImg('userAvatar')})`
                    }}/>
                    <VoteScore
                      elemID={comment.id}
                      elemType='comments'
                    />
                  <div className="contact-details">
                    <p>{`Submitted ${timeSince(comment.timestamp)} ago`}</p>
                    <p className="post-author">{`by ${comment.author}`}</p>
                  </div>
                  <div className='edit-delete'>
                    <Button icon
                      onClick={() => this.props.openMod({elemType:'comments', elemID:comment.id, elemNew:false, parentId:this.props.postID})}
                      circular='true'
                      positive
                      >
                      <Icon name='edit' />
                    </Button>
                    <Button icon
                      onClick={()=> deleteComment({commentID:comment.id, parentId:this.props.postID})}
                      circular='true'
                      negative
                      >
                      <Icon name='remove' />
                    </Button>
                  </div>
                  </div>
                  <div className='post-body'>
                    <p>{comment.body}</p>
                  </div>

                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    )
	}

}




function mapStateToProps ({ posts,
  comments, categories, viewFilter, router,
  commentsIsLoading, commentsHasErrored, items }) {

  return {
    posts: posts,
    comments: comments,
    categories: categories,
    viewFilter: viewFilter,
    router: router,
    items: items,
    isLoading: commentsIsLoading,
    hasErrored: commentsHasErrored,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addComment: (data) => dispatch(updateComment(data)),
    deleteComment: (data) => {
      dataAccessAPI.delComment(data.commentID)
      dispatch(decCommCount(data.parentId))
      dispatch(removeComment(data.commentID))
    },
    setCategory: (data) => dispatch(setFilter(data)),
    fetchComments: (postID) => dispatch(commentsFetchData(postID)),
    openMod: (data) => dispatch(openModal({elemType:data.elemType,
                                           elemID:data.elemID,
                                           elemNew:data.elemNew,
                                           parentId:data.parentId})),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(ListComments)
