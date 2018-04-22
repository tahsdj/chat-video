import React from 'react'
import './input-box.sass'
import {connect} from 'react-redux'
import {handleInputContent} from 'states/actions/message.js'
import {getVideo} from 'states/actions/video.js'

const InputBox = (props) => {
	this.content = ''
	const inputHandler = (e) => {
		this.content = e.target.value
	}
	const keyHandler = (e) => {
		if ( e.key === 'Enter' && this.content !== '' ) {
			e.target.value = ''
			props.dispatch(handleInputContent(this.content, props.msg, props.userId))
			props.dispatch(getVideo(this.content, props.msg, props.playList, props.videoHost, props.userId, props.videoNowTime))
		}
	}
	return (
		<div id="input-container">
			<input 
				placeholder="type something..."
				onChange={ inputHandler }
				onKeyPress={ keyHandler }
			/>
			<PlayListIcon />
		</div>
	)
}

export default connect( state => (
	{
		msg: state.message.msg,
		playList: state.video.playList,
		userId: state.video.userId,
		videoNowTime: state.video.videoNowTime,
		videoHost: state.video.videoHost
	}
))(InputBox)


const PlayListIcon = () => {
	return (
		<span id="playlist-icon">
			<a href="#filter-mask">
				<img src="icons/playlist.png" />
			</a>
		</span>
	)
}