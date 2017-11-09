import React, { Component } from 'react';
import './VoteScore.css';
import {
	voteCommentUp,
	voteCommentDown,
	votePostUp,
	votePostDown,
	setFilter } from '../actions'
import { connect } from 'react-redux'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import { Button, Icon, Label } from 'semantic-ui-react'


class VoteScore extends Component {


	render() {
		let { items, posts, elemID, elemType, voteUp, voteDown} = this.props
		let voteScore = 0

		if (elemType === 'posts'){
			voteScore = posts[elemID].voteScore
		} else {
			voteScore = items[elemID].voteScore
		}

		console.log("In VOTESCORE!!")
		return (
			<div className='vote-score'>
				<Button icon
					fluid='true'
					size='tiny'
					onClick={()=> voteUp({elemType:elemType, elemID:elemID})}
				>
			  	<Icon name='chevron up' />
				</Button>
				<Label circular='true' size='large'>
			  	<Icon name='hand peace' /> {voteScore}
				</Label>
				<Button icon
					fluid='true'
					size='tiny'
					onClick={()=> voteDown({elemType:elemType, elemID:elemID})}
				>
			  	<Icon name='chevron down' />
				</Button>
			</div>
  	)
	}


}


function mapStateToProps ({ posts,
  comments, items }) {

  return {
    posts: posts,
    comments: comments,
    items: items,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCategory: (data) => dispatch(setFilter(data)),
    voteUp: (data) => {

    	console.log("WHEE", data)
    	data.elemType==='posts' ?
    		dispatch(votePostUp({postID:data.elemID})) :
    		dispatch(voteCommentUp({commentID:data.elemID}))

    },
    voteDown: (data) => {
    	data.elemType==='posts' ?
    		dispatch(votePostDown({postID:data.elemID})) :
    		dispatch(voteCommentDown({commentID:data.elemID}))

    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(VoteScore)