import React, { Component } from 'react';
import { genID, getImg, getDate, testCata, capitalize} from '../utils/helper.js'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import { updatePost, removePost, } from '../actions'
import { Link } from 'react-router-dom'




class ListPosts extends Component {


	return () {
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
          <div className='vote-block' style={{
            backgroundImage: `url("http://localhost:3001/reduxlogo.svg")`
            }}><span className='rank'>{index}</span></div>
          <div className="contact-details">
            <h3><a href="/">{post.title}</a></h3>
            <p>{`Submitted on ${getDate(post.timestamp)}`}</p>
            <p className="post-author">{`by ${post.author}`}</p>
            <p className="post-author">{`Vote Score: ${post.voteScore}`}</p>
          </div>
          <button className='contact-remove' onClick={()=> deletePost({postID:post.id})}>
            Remove
          </button>
        </li>
      )}
    </ol>

	}

}




function mapStateToProps ({ posts, comments, categories }) {

  return {
    posts: posts,
    comments: comments,
    categories: categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(updatePost(data)),
    deletePost: (data) => {
      dataAccessAPI.delPost(data.postID)
      return dispatch(removePost(data))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(ListPosts)
