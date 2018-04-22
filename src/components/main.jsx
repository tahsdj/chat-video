import React from 'react'
import ReactDOM from 'react-dom'
import { compose, applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './main.sass'
import InputBox from 'components/input-box.jsx'
import ChatBox from 'components/chat-box.jsx'
import message from 'states/reducers/message.js'
import video from 'states/reducers/video.js'

export default class Main extends React.Component {
	constructor(props) {
		super(props)
		//this.content = {}
	}
	componentWillMount() {
		this.store = createStore(combineReducers({
			message, video
		}),compose(applyMiddleware(thunkMiddleware)))
		let _this = this
		this.store.subscribe(() => {
			console.log(_this.store.getState());
		})
		//getPostsData()
	}
	render() {
		return (
			<Provider store = {this.store} >
				<div id="screen-container">
					<ChatBox />
				</div>
			</Provider>
		)
	}
}