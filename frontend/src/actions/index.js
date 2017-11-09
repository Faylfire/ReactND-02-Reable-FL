import * as dataAccessAPI from '../utils/dataAccessAPI.js'


export const UPDATE_POST = 'UPDATE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const SET_FILTER = 'SET_FILTER'


export const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS'
export const COMMENTS_IS_LOADING = 'COMMENTS_IS_LOADING'
export const COMMENTS_HAS_ERRORED = 'COMMENTS_HAS_ERRORED'

export const VOTE_POST_UP = 'VOTE_POST_UP'
export const VOTE_POST_DOWN = 'VOTE_POST_DOWN'
export const VOTE_COMMENT_UP = 'VOTE_COMMENT_UP'
export const VOTE_COMMENT_DOWN = 'VOTE_COMMENT_DOWN'

export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

//Post Actions
export function updatePost({postID, post}) {
	return {
		type: UPDATE_POST,
		postID,
		post,
	}
}

export function removePost({postID}) {
	return {
		type: REMOVE_POST,
		postID,
	}
}

export function votePostUp({postID}) {
	return {
		type: VOTE_POST_UP,
		postID,
	}
}

export function votePostDown({postID}) {
	return {
		type: VOTE_POST_DOWN,
		postID,
	}
}

//Comment Actions
export function updateComment({commentID, comment}) {
	return {
		type: UPDATE_COMMENT,
		commentID,
		comment,
	}
}

export function removeComment({commentID}) {
	return {
		type: REMOVE_COMMENT,
		commentID,
	}
}

export function voteCommentUp({commentID}) {
	return {
		type: VOTE_COMMENT_UP,
		commentID,
	}
}

export function voteCommentDown({commentID}) {
	return {
		type: VOTE_COMMENT_DOWN,
		commentID,
	}
}





export function setFilter({category}) {
	return {
		type: SET_FILTER,
		category,
	}
}


/*Comments loading*/

export function commentsHasErrored(bool) {
    return {
        type: COMMENTS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function commentsIsLoading(bool) {
    return {
        type: COMMENTS_IS_LOADING,
        isLoading: bool
    };
}

export function commentsFetchDataSuccess(comments) {
    return {
        type: COMMENTS_FETCH_DATA_SUCCESS,
        comments
    };
}


export function errorAfterFiveSeconds() {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(commentsHasErrored(true));
        }, 5000);
    };
}

export function commentsFetchData(postID) {
    return (dispatch) => {
        dispatch(commentsIsLoading(true));



        dataAccessAPI.getComments(postID)
        	.then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(commentsIsLoading(false));
								return response
            })
            .then((response) => response.json())
            .then((items) => {

                let posts = items.reduce((posts, post)=>{
									posts[post.id]=post
									return posts
								}, {})
                return posts
            })
            .then((items) => dispatch(commentsFetchDataSuccess(items)))
            .catch(() => dispatch(commentsHasErrored(true)));
    };
}

//Modal_Open and Modal Close
export function openModal({elemType, elemID}) {
    return {
        type: OPEN_MODAL,
        elemType:elemType,
        elemID
    };
}

export function closeModal() {
    return {
        type: CLOSE_MODAL,
    };
}