import React, { Component } from 'react';
import {
	setFilter,
	closeModal,
	openModal, } from '../actions'
import { connect } from 'react-redux'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'



class EditPostModal extends Component {

	state = {modalOpen:false,
					 title:'',
					 body: '',
					 author: '',
					 category: ''}


  handleChange = (e) => {
  	const {name, value} = e.target

  	this.setState({ [name]: value })
  }

  handleOpen = () => {
  	this.setState({modalOpen:true})
  	this.props.openMod({elemType:'comments', elemID:'894tuq4ut84ut8v4t8wun89g'})}

  handleSubmit = () => { this.props.closeMod()}

  handleClose = () => {
  	this.setState({modalOpen:false})
  	this.props.closeMod()
  }

	render() {
		let { items, posts, modal, options, closeMod} = this.props
    //let {modalOpen} = this.state
    let modalOpen = modal.modalOpen
    let {elemType, elemID} = modal
    let editElement = {}

		if (elemType === 'posts'){
			editElement = posts[elemID]
		} else if (elemType === 'comments') {
			editElement = items[elemID]
		}

		let {title, body, author, category} = editElement

		console.log("In Modal")
		return (
			<div>
      <Modal
        trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
        open={modalOpen}
        onClose={this.handleClose}
      >
      	<Modal.Header>Add/Edit Post</Modal.Header>
		    <Modal.Content>
		      <Modal.Description>
		        <Form onSubmit={this.handleSubmit}>
		        <Form.Group widths='equal'>
		          <Form.Input label='Author' name='author' value={author} placeholder='User Name' onChange={this.handleChange}/>
		          <Form.Select label='Category' name='category' value={category} options={options} placeholder='Category' onChange={this.handleChange} />
		        </Form.Group>
		        <Form.Group widths='equal'>
		          <Form.Input label='Title' name='title' value={title} placeholder='Title' onChange={this.handleChange}/>
		        </Form.Group>
		        <Form.TextArea label='Content' name='body' value={body} rows='15' placeholder='Write your thoughts here...' onChange={this.handleChange}/>
		        <Form.Checkbox label='I agree to the Terms and Conditions' />
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
    																			 elemID:data.elemID})),
    closeMod: () => dispatch(closeModal()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(EditPostModal)