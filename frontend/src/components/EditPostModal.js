import React, { Component } from 'react';
import {
	setFilter,
	closeModal,
	openModal,
	updatePost,
	updateComment } from '../actions'
import { connect } from 'react-redux'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import { genID, testCata, capitalize} from '../utils/helper.js'



class EditPostModal extends Component {

	constructor(props) {
    super(props);
    this.state = {
    			 modalOpen:false,
					 title:'',
					 body: '',
					 author: '',
					 category: ''
					};
  }

  componentWillReceiveProps(nextProps) {
  	if(nextProps.modal.modalOpen === true){
	  	let { items, posts, modal} = nextProps
	    //let {modalOpen} = this.state
	    let {elemType, elemID, elemNew} = modal
	    let editElement = {}
	    console.log(editElement)
	    console.log('AFTER')
	    if (elemNew === true) {
	    	if (elemType === 'posts'){
	    		editElement={
				    id: genID(),
				    timestamp: Date.now(),
				    title: '',
				    body: '',
				    author: '',
				    category: '',
			  	}
	    	} else{
	    		editElement={
				    id: genID(),
				    parentId:genID(),
				    timestamp: Date.now(),
				    body: '',
				    author: '',
				  }
	    	}
	    } else {
	    	console.log("IN ELSE")
				if (elemType === 'posts'){
					editElement = posts[elemID]
				} else if(elemType === 'comments') {
					editElement = items[elemID]
				}
			}
			console.log(editElement)
			this.setState({
						 title:editElement.title,
						 body: editElement.body,
						 author: editElement.author,
						 category: editElement.category,
						 editElement:editElement
			})
  	}

  }


  handleChange = (e, { name, value }) => {
  	this.setState({ [name]: value })
  }

  handleOpen = () => {
  	this.setState({modalOpen:true})
  	this.props.openMod({elemType:'posts', elemID:'', elemNew:true})
  }

  handleSubmit = () => {

  	let {modal, editComment, editPost} = this.props
  	let modElement = this.state.editElement
  	let {title, body, author, category} = this.state

  	if (modal.elemType === 'posts'){

  		modElement['title'] = title
  		modElement['body'] = body
  		modElement['author'] = author
  		modElement['category'] = category

  		if (modal.elemNew === true){
  			let id = genID()
  			modElement['id'] = id
  			modElement['timestamp'] = Date.now()
  		}
  		editPost({postID:modElement.id, post:modElement, elemNew:modal.elemNew})

  	} else if(modal.elemType === 'comments'){
  		modElement['body']=body
  		modElement['author']=author
  		if (modal.elemNew === true){
  			let id = genID()
  			modElement['id']=id
  			modElement['timestamp'] = Date.now()
  		}
  		editComment({commentID:modElement.id, comment:modElement, elemNew:modal.elemNew})
  	}

  	this.props.closeMod()
  }

  handleClose = () => {
  	this.setState({modalOpen:false})
  	this.props.closeMod()
  }

	render() {
		let { items, posts, modal, options, closeMod} = this.props
    //let {modalOpen} = this.state
    let modalOpen = modal.modalOpen
    let {elemType, elemID, elemNew} = modal
    /*let editElement = {}

		if (elemType === 'posts'){
			editElement = posts[elemID]
		} else if (elemType === 'comments') {
			editElement = items[elemID]
		}*/

		let {title, body, author, category} = this.state

		console.log("In Modal")
		console.log("elemType: ", elemType)
		return (
			<div>
      <Modal
        open={modalOpen}
        onClose={this.handleClose}
      >
      	<Modal.Header>Add/Edit Post</Modal.Header>
		    <Modal.Content>
		      <Modal.Description>
		        <Form onSubmit={this.handleSubmit}>
		        <Form.Group widths='equal'>
		          <Form.Input label='Author' name='author' value={author} placeholder='User Name' onChange={this.handleChange}/>
		          <Form.Select disabled={elemType === 'comments' ? true : false} label='Category' name='category' value={category} options={options} placeholder='Category' onChange={this.handleChange} />
		        </Form.Group>
		        <Form.Group widths='equal'>
		          <Form.Input disabled={elemType === 'comments' ? true : false} label='Title' name='title' value={title} placeholder='Title' onChange={this.handleChange}/>
		        </Form.Group>
		        <Form.TextArea label='Content' name='body' value={body} rows='15' placeholder='Write your thoughts here...' onChange={this.handleChange}/>
		        <Form.Button>Submit</Form.Button>
		      </Form>
		      </Modal.Description>
		    </Modal.Content>
    	</Modal>
    	</div>
  	)
	}


}


function mapStateToProps ({ posts, items, modal }) {

  return {
    posts: posts,
    items: items,
    modal: modal,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCategory: (data) => dispatch(setFilter(data)),
    openMod: (data) => dispatch(openModal({elemType:data.elemType,
    																			 elemID:data.elemID,
    																			 elemNew:data.elemNew})),
    closeMod: () => dispatch(closeModal()),
    editPost: (data) => {
    	console.log("In editPost")
    	console.log(data)

    	if (data.elemNew === true){
    		dataAccessAPI.addPost(data.post, 'posts')
    	} else {
    		dataAccessAPI.editPost(data.post.id, 'posts', data.post.body, data.post.title)
    	}
    	dispatch(updatePost({postID:data.postID, post:data.post}))
    	//dispatch(updatePost({postID:data.postID, post:data.post}))
    },
    editComment: (data) => {
    	if (data.elemNew === true){
    		dataAccessAPI.addComment(data.comment, 'comments')
    	} else {
    		dataAccessAPI.editComment(data.comment.id, 'comments', data.comment.body, data.comment.timestamp)
    	}

    	dispatch(updateComment({commentID:data.commentID, comment:data.comment}))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(EditPostModal)