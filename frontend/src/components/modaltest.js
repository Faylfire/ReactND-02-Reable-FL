import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

export default class ModalExampleControlled extends Component {
  state = { modalOpen: false }

  handleOpen() {this.setState({ modalOpen: true })}

  handleClose = () => this.setState({ modalOpen: false })

  render() {

      const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    ]

    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
      <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Default Profile Image</Header>
          <Form>
        <Form.Group widths='equal'>
          <Form.Input label='First name' placeholder='First name' />
          <Form.Input label='Last name' placeholder='Last name' />
          <Form.Select label='Gender' options={options} placeholder='Gender' />
        </Form.Group>
        <Form.TextArea label='About' placeholder='Tell us more about you...' />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Form.Button>Submit</Form.Button>
      </Form>
      </Modal.Description>
    </Modal.Content>
  </Modal>
    )
  }
}