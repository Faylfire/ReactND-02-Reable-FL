import React, { Component } from 'react';
import logo from '../icons/logo.svg';
import './App.css';
import { genID, getImg, getDate, testCata, capitalize} from '../utils/helper.js'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import { updatePost, removePost, updateComment, removeComment, setFilter } from '../actions'
import { Link, NavLink, Route } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backend: {"categories": []},
      posts:{}
    };
  }


  render() {
    //const { backend } = this.state
    const {posts, comments, categories, viewFilter, addPost, addComment, deleteComment, deletePost, setCategory} = this.props
    let catas = testCata.categories
    let postsList = [...Object.values(posts)].filter((c) => {
        return (c.deleted !== true && (c.category == viewFilter.category || viewFilter.category == 'all'))
      })
    postsList.sort(sortBy('-voteScore'))
    console.log(this.props)
    console.log(viewFilter)
    const all = [{name:'all', path:''}]
    //let a = dataAccessAPI.delPost("8xf0y6ziyjabvozdd253nd")
    let enhancedCategories = [...all,...categories]

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Readable</h2>
        </div>
        <nav>
          <ul className='nav-ul'>
            {enhancedCategories.map((ele, index) =>
              <li className='nav-li-ele' key={ele.name}>
                <Link
                  to={`/${ele.path}`}
                  onClick={()=> setCategory({category:ele.name})}
                >{capitalize(ele.name)}</Link>
              </li>
            )}
          </ul>
        </nav>

        <ol className='contact-list'>
          {postsList.map((post, index) =>
            <li key={post.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${getImg(post)})`
                }}/>
              <div className='vote-block' style={{
                backgroundImage: `url("http://localhost:3001/reduxlogo.svg")`
                }}><span className='rank'>{index}</span></div>
              <div className="contact-details">
                <h3><a href="/">{post.title}</a></h3>
                <p>{`Submitted on ${getDate(post.timestamp)}`}</p>
                <p className="post-author">{`by ${post.author}`}</p>
                <p className="post-author">{`Vote Score: ${post.voteScore}`}</p>
              </div>
              <button className='contact-remove' onClick={()=> deletePost({postID:post.id})}>
                Remove
              </button>
            </li>
          )}
        </ol>




      </div>
    );
  }
}


function mapStateToProps ({ posts, comments, categories, viewFilter }) {

  return {
    posts: posts,
    comments: comments,
    categories: categories,
    viewFilter: viewFilter,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(updatePost(data)),
    deletePost: (data) => {
      dataAccessAPI.delPost(data.postID)
      return dispatch(removePost(data))
    },
    addComment: (data) => dispatch(updateComment(data)),
    deleteComment: (data) => dispatch(removeComment(data)),
    setCategory: (data) => dispatch(setFilter(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App)
