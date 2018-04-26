import React from 'react'
import {connect} from 'react-redux'
import './search-box.sass'
import { searchVideos } from 'states/actions/video-search.js'

const SearchBox = (props) => {
	this.input = ''
	const inputHandler = (e) => {
		this.input = e.target.value
		console.log(this.input)
	}
	const keyEventHandler = (e) => {
		if ( e.key === 'Enter' && this.input !== '' ) {
			props.dispatch(searchVideos(this.input))
			e.target.value = ''
		}
	}
	return (
		<div id="search-container">
			<input 
				placeholder="Search the video"
				onChange={inputHandler}
				onKeyPress={keyEventHandler}
			/>
		</div>
	)
}


export default connect( state => (
	{
		msg: state.message.msg,
		live: state.video.live,
		playList: state.video.playList,
		userId: state.video.userId
	}
))(SearchBox)