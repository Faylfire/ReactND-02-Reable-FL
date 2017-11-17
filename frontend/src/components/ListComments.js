import React, { Component } from 'react';
import { genID, getImg, getDate, testCata, capitalize} from '../utils/helper.js'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import { updatePost, removePost, } from '../actions'
import { Link } from 'react-router-dom'
import { updateComment, removeComment, setFilter, commentsFetchData, openModal } from '../actions'
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
    console.log(`items: ${items}`)
    return (
      <div>
  		<ol className='contact-list'>
        {Object.keys(items).length === 0 ?
          <div className='nothing-here'>
            <em>Add a comment!</em>
          </div> :
          [...Object.values(items)].map((comment, index) =>
          <li key={comment.id} >
            <div className='post-item'>
              <div className='post-heading'>
                <VoteScore
                  elemID={comment.id}
                  elemType='comments'
                />
                <Label>
                  <Icon name='comment outline' /><strong>{comment.author}</strong>
                </Label>
                <p>{`Submitted on ${getDate(comment.timestamp)}`}</p>
                <div className='edit-delete'>
                  <Button icon
                    onClick={() => this.props.openMod({elemType:'comments', elemID:comment.id, elemNew:false})}
                    circular='true'
                    positive
                    >
                    <Icon name='edit' />
                  </Button>
                  <Button icon
                    onClick={()=> deleteComment({commentID:comment.id})}
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
      dispatch(removeComment(data))
    },
    setCategory: (data) => dispatch(setFilter(data)),
    fetchComments: (postID) => dispatch(commentsFetchData(postID)),
    openMod: (data) => dispatch(openModal({elemType:data.elemType,
                                           elemID:data.elemID,
                                           elemNew:data.elemNew})),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(ListComments)
