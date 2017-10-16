import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import configStore from './store/configStore.js'
import * as dataAccessAPI from './utils/dataAccessAPI.js'
import { BrowserRouter } from 'react-router-dom'



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
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</Provider>,
				document.getElementById('root'));

			registerServiceWorker();
		})

}

getInitialState()

