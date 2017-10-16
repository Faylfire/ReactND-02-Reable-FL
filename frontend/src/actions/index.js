export const UPDATE_POST = 'UPDATE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const SET_FILTER = 'SET_FILTER'


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

export function setFilter({category}) {
	return {
		type: SET_FILTER,
		category,
	}
}
