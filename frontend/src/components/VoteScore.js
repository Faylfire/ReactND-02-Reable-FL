import React, { Component } from 'react';
import './VoteScore.css';
import {
	voteCommentUp,
	voteCommentDown,
	votePostUp,
	votePostDown,
	} from '../actions'
import { connect } from 'react-redux'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import { Button, Icon, Label } from 'semantic-ui-react'


class VoteScore extends Component {


	render() {
		let { items, posts, elemID, elemType, voteUp, voteDown} = this.props
		let voteScore = 0

		//Test for posts or comments to get the score appropriately
		//from the Redux store
		if (elemType === 'posts'){
			voteScore = posts[elemID].voteScore
		} else {
			voteScore = items[elemID].voteScore
		}

		return (
			<div className="vote-score">
				<Button icon
					fluid
					size="tiny"
					onClick={()=> voteUp({elemType:elemType, elemID:elemID})}
				>
			  	<Icon name="chevron up" />
				</Button>
				<Label circular size="large">
			  	<Icon name="hand peace" /> {voteScore}
				</Label>
				<Button icon
					fluid
					size="tiny"
					onClick={()=> voteDown({elemType:elemType, elemID:elemID})}
				>
			  	<Icon name="chevron down" />
				</Button>
			</div>
  	)
	}

}


function mapStateToProps ({ posts, items }) {

  return {
    posts: posts,
    items: items,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    voteUp: (data) => {

			dataAccessAPI.voteUp(data.elemID, data.elemType)
    	data.elemType==='posts' ?
    		dispatch(votePostUp({postID:data.elemID})) :
    		dispatch(voteCommentUp({commentID:data.elemID}))

    },
    voteDown: (data) => {

    	dataAccessAPI.voteDown(data.elemID, data.elemType)
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