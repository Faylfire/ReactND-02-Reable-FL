import React, { Component } from 'react';
import { changeSort } from '../actions'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'


const options = [
  { key: 1, text: 'Votes', value: "-voteScore", icon: "sort numeric descending" },
  { key: 2, text: 'Date Descending', value: "-timestamp", icon: "calendar outline" },
  { key: 3, text: 'Date Ascending', value: "timestamp", icon: "calendar outline" },
  { key: 4, text: 'Comment Count', value: "-commentCount", icon: 'comments' },
]


class SortPosts extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  handleChange = (e, { value }) => {
  	this.setState({ value })
    //Updates Redux store's sortType to be used in sorting scenarios
    this.props.setSortBy(value)
  }


	render() {
    //Controlled element through reading of Redux store for sortType
    let { sortType } = this.props

		return (
			<div className="sort-dropdown">
        <Dropdown
          onChange={this.handleChange}
          options={options}
          placeholder="Sort Posts By"
          selection
          value={sortType}
        />
    	</div>
  	)
	}


}

function mapStateToProps ({ sortType, posts }) {

  return {
    posts: posts,
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