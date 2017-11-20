import {
	UPDATE_POST,
	REMOVE_POST,
	UPDATE_COMMENT,
	REMOVE_COMMENT,
    SET_FILTER,
    COMMENTS_FETCH_DATA_SUCCESS,
    COMMENTS_IS_LOADING,
    COMMENTS_HAS_ERRORED,
    VOTE_POST_UP,
    VOTE_POST_DOWN,
    VOTE_COMMENT_UP,
    VOTE_COMMENT_DOWN,
    OPEN_MODAL,
    CLOSE_MODAL,
    SORT_BY,
    INC_COMMENTCOUNT,
    DEC_COMMENTCOUNT,
} from '../actions'
import { combineReducers } from 'redux'


const defaultComments = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  },
   "8tu4bsun805n8un48ve80": {
    id: '8tu4bsun805n8un48ve80',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cooler. YEAH!',
    author: 'thingone',
    voteScore: -4,
    deleted: false,
    parentDeleted: false
  },
}

const defaultPosts= {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 52 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
   "6ni6ok3ym7mf1p33lnea": {
    id: '6ni6ok3ym7mf1p33lnea',
    timestamp: 1468479767191,
    title: 'Learn Redux in 11 changed minutes!',
    body: 'JK. It takes more than 11 minutes to learn technology.',
    author: 'thingone',
    category: 'general',
    voteScore: -4,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lneb": {
    id: '6ni6ok3ym7mf1p33lneb',
    timestamp: 1468479767192,
    title: 'Learn Redux in 12 minutes!',
    body: 'JK2. It takes more than 12 minutes to learn technology.',
    author: 'thingone1',
    category: 'udacity',
    voteScore: -3,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnec": {
    id: '6ni6ok3ym7mf1p33lneb',
    timestamp: 1468479767192,
    title: 'Learn Redux in 12 Added minutes!',
    body: 'JK2. It takes more than 12 minutes to learn technology.',
    author: 'thingone1',
    category: 'udacity',
    voteScore: -3,
    deleted: false
  },

}

const defaultModal = {
    modalOpen:false,
    elemType:'',
    elemID:'',
    elemNew:false,
    parentId:'',
}

function posts (state = {}, action) {
	const {postID, post } = action

	switch(action.type) {
		case UPDATE_POST:
			return {
				...state,
				[postID]: post
			}
        case VOTE_POST_UP:
            return {
                ...state,
                [postID]:{
                    ...state[postID],
                    voteScore: state[postID].voteScore + 1
                }
            }
        case VOTE_POST_DOWN:
            return {
                ...state,
                [postID]:{
                    ...state[postID],
                    voteScore: state[postID].voteScore - 1
                }
            }
        case INC_COMMENTCOUNT:
            return {
                ...state,
                [postID]:{
                    ...state[postID],
                    commentCount: state[postID].commentCount + 1
                }
            }
        case DEC_COMMENTCOUNT:
            return {
                ...state,
                [postID]:{
                    ...state[postID],
                    commentCount: state[postID].commentCount - 1
                }
            }
		case REMOVE_POST:
			return {
				...state,
				[postID]:{
					...state[postID],
					deleted: true
				}
			}
		default:
			return state
	}

}

/*
function comments (state = {}, action) {
	const {commentID, comment } = action


	switch(action.type) {
		case UPDATE_COMMENT:
			return {
				...state,
				[commentID]: comment
			}
		case REMOVE_COMMENT:
			return {
				...state,
				[commentID]:{
					...state[commentID],
					deleted: true
				}
			}
        case VOTE_COMMENT_UP:
            return {
                ...state,
                [commentID]:{
                    ...state[commentID],
                    voteScore: state[commentID].voteScore + 1
                }
            }
        case VOTE_COMMENT_DOWN:
            return {
                ...state,
                [commentID]:{
                    ...state[commentID],
                    voteScore: state[commentID].voteScore - 1
                }
            }
		default:
			return state
	}

}
*/

function categories (state = {}, action) {

	switch(action.type) {
		default:
			return state
	}

}


function viewFilter ( state = {category: 'all'}, action) {
    const { category } = action
    switch(action.type) {
        case SET_FILTER:
            return {
                category
            }
        default:
            return state
    }

}
/* Comment loading */

export function commentsHasErrored(state = false, action) {
    switch (action.type) {
        case COMMENTS_HAS_ERRORED:
            return action.hasErrored

        default:
            return state
    }
}

export function commentsIsLoading(state = false, action) {
    switch (action.type) {
        case COMMENTS_IS_LOADING:
            return action.isLoading

        default:
            return state
    }
}

export function items(state = {}, action) {
    const {commentID, comment } = action

    switch (action.type) {
        case COMMENTS_FETCH_DATA_SUCCESS:
            return action.comments
        case UPDATE_COMMENT:
            return {
                ...state,
                [commentID]: comment
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                [commentID]:{
                    ...state[commentID],
                    deleted: true
                }
            }
        case VOTE_COMMENT_UP:
            return {
                ...state,
                [commentID]:{
                    ...state[commentID],
                    voteScore: state[commentID].voteScore + 1
                }
            }
        case VOTE_COMMENT_DOWN:
            return {
                ...state,
                [commentID]:{
                    ...state[commentID],
                    voteScore: state[commentID].voteScore - 1
                }
            }
        default:
            return state;
    }
}



export function modal(state = defaultModal, action) {
    const {elemType, elemID, elemNew, parentId} = action

    switch (action.type) {
        case OPEN_MODAL:
            return {
                modalOpen: true,
                elemType: elemType,
                elemID: elemID,
                elemNew: elemNew,
                parentId: parentId
            }
        case CLOSE_MODAL:
            return defaultModal
        default:
            return state;
    }
}

export function sortType(state= '-voteScore', action) {
    const {sortBy} = action

    switch (action.type) {
        case SORT_BY:
            return sortBy
        default:
            return state;
    }

}


export default combineReducers({
	posts,
	categories,
    viewFilter,
    commentsIsLoading,
    commentsHasErrored,
    items,
    modal,
    sortType
});