import React, { Component } from 'react';
import logo from '../icons/logo.svg';
import './App.css';
import { genID, getImg, getDate, testCata, capitalize} from '../utils/helper.js'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import { updatePost, removePost, updateComment, removeComment, setFilter, openModal } from '../actions'
import { Link, NavLink, Route, Switch} from 'react-router-dom'
import TestParams from './TestParams.js'
import PostDetails from './PostDetails.js'
import ConnectedSwitch from './ConnectedSwitch.js'
import EditPostModal from './EditPostModal.js'
//import ModalExampleControlled from './modaltest.js'



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
    const {posts, comments, categories, viewFilter, addPost, addComment, deleteComment, deletePost, setCategory, openMod} = this.props
    let catas = testCata.categories
    let postsList = [...Object.values(posts)].filter((c) => {
        return (c.deleted !== true && (c.category == viewFilter.category || viewFilter.category == 'all'))
      })
    postsList.sort(sortBy('-voteScore'))
    console.log(postsList)
    const all = [{name:'all', path:''}]
    //let a = dataAccessAPI.delPost("8xf0y6ziyjabvozdd253nd")
    let enhancedCategories = [...all,...categories]

    let options = [...categories].reduce((options, category) => {
      options.push({key:category.name, text: capitalize(category.name), value:category.name})
      return options
    }, [])

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
        <EditPostModal />
                        <button

                  onClick={() => this.props.openMod({elemType:'posts', elemID:'8xf0y6ziyjabvozdd253nd'})}>
                    Edit
                </button>
        <Switch>
          <Route exact path="/" component={TestParams}/>
          <Route exact path='/:category/:number' component={PostDetails}/>
          <Route path='/:category' component={TestParams}/>
        </Switch>
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
    setCategory: (data) => dispatch(setFilter(data)),
    openMod: (data) => dispatch(openModal({elemType:data.elemType,
                                           elemID:data.elemID})),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App)
