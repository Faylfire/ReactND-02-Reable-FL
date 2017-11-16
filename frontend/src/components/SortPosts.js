import React, { Component } from 'react';
import {
	setFilter,
  changeSort } from '../actions'
import { connect } from 'react-redux'
import { Dropdown} from 'semantic-ui-react'



class SortPosts extends Component {

  state = {selection: '-voteScore'}

   handleChange = (e, { value }) => this.setState({ value })

  handleChange = (e, { value }) => {

  	this.setState({ value })
    console.log(value)
    this.props.setSortBy(value)
  }


	render() {
		let { value } = this.state
    //let {modalOpen} = this.state
    const options = [
      { key: 1, text: 'Votes', value: "-voteScore", icon: "sort numeric descending" },
      { key: 2, text: 'Date Descending', value: "-timestamp", icon: "calendar outline" },
      { key: 3, text: 'Date Ascending', value: "timestamp", icon: "calendar outline" },
      { key: 4, text: 'Comment Count', value: "-commentCount", icon: 'comments' },
    ]

		return (
			<div className="sort-dropdown">
        <Dropdown
          onChange={this.handleChange}
          options={options}
          selection
          placeholder="Sort Posts By"
          value={value}
        />
    	</div>
  	)
	}


}

function mapStateToProps ({ sortType, posts, viewFilter, router }) {

  return {
    posts: posts,
    router: router,
    sortType: sortType,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSortBy: (sortBy) => dispatch(changeSort(sortBy))

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(SortPosts)