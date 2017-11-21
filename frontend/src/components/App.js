import React, { Component } from 'react';
import logo from '../icons/logo.svg';
import './App.css';
import { capitalize} from '../utils/helper.js'
import * as dataAccessAPI from '../utils/dataAccessAPI.js'
import { connect } from 'react-redux'
import { updatePost, removePost, updateComment, removeComment, setFilter, openModal } from '../actions'
import { Link, Route, Switch} from 'react-router-dom'
import ShowPosts from './ShowPosts.js'
import PostDetails from './PostDetails.js'
import EditPostModal from './EditPostModal.js'
import SortPosts from './SortPosts.js'
import { Button} from 'semantic-ui-react'




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backend: {"categories": []},
      posts:{}
    };
  }

  handleOpen = () => this.props.openMod({elemType:'posts', elemID:'', elemNew:true})

  render() {
    //const { backend } = this.state
    const { categories, setCategory} = this.props
    //let catas = testCata.categories
    /*let postsList = [...Object.values(posts)].filter((c) => {
        return (c.deleted !== true && (c.category == viewFilter.category || viewFilter.category == 'all'))
      })
    //postsList.sort(sortBy(sortType))
    */
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
        <EditPostModal options={options}/>
        <div className='sub-body'>
          <div className='new-post-modal'>
            <Button content='Add New Post' labelPosition='left' icon='add' onClick={this.handleOpen}/>
          </div>
          <SortPosts />
          <Switch>
            <Route exact path="/" component={ShowPosts}/>
            <Route exact path='/:category/:number' component={PostDetails}/>
            <Route path='/:category' component={ShowPosts}/>
          </Switch>
        </div>
      </div>
    );
  }
}


function mapStateToProps ({ sortType, posts, categories, viewFilter }) {

  return {
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
                                           elemID:data.elemID,
                                           elemNew:data.elemNew})),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App)
