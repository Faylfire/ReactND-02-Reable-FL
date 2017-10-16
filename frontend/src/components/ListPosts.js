import React, { Component } from 'react';
import { genID, getImg, getDate, testCata, capitalize} from '../utils/helper.js'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import { updatePost, removePost, updateComment, removeComment } from '../actions'
import { Link, NavLink } from 'react-router-dom'




class ListPosts extends Component {









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
    addComment: (data) => dispatch(updateComment(data)),
    deleteComment: (data) => dispatch(removeComment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(ListPosts)
