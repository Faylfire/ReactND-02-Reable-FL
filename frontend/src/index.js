import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
//import logger from 'redux-logger'
//import thunk from 'redux-thunk'
import { configStore, history } from './store/configStore.js'
import * as dataAccessAPI from './utils/dataAccessAPI.js'
//import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import 'semantic-ui-css/semantic.min.css'


function getInitialState(){

	let arr = [dataAccessAPI.getAll('posts'), dataAccessAPI.getAll('categories')]

	Promise.all(arr)
		.then(res => {
			console.log('success', res)
			let posts = res[0].reduce((posts, post)=>{
				posts[post.id]=post
				return posts
			}, {})
			console.log(posts)

			let initialState = {
				posts: posts,
				categories: res[1]['categories'],
			}
			console.log('success', initialState)
			return initialState
		})
		.then(initialState => {
			return configStore(initialState)
		})
		.then(store => {
			ReactDOM.render(
				<Provider store={store}>
					<ConnectedRouter history={history}>
						<App />
					</ConnectedRouter>
				</Provider>,
				document.getElementById('root'));

			registerServiceWorker();
		})

}

getInitialState()

