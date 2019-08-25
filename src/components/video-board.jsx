import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import YouTube from 'react-youtube'
import './video-board.sass'
import {playNext, updateVideoState} from 'states/actions/video.js'
import {_updateVideoTime, _onVideo, _offVideoListener} from 'api/data.js'
import {handleInputContent} from 'states/actions/message.js'

class VideoBoad extends React.Component {
	constructor(props) {
		super(props)
		this.playListHandler = this.playListHandler.bind(this)
		this.videoTimeHandler = this.videoTimeHandler.bind(this)
		this.videoStateHandler = this.videoStateHandler.bind(this)
		this.onVideoHandler = this.onVideoHandler.bind(this)
		this.timer = null
		this.userId = this.props.userId
	}
	componentDidMount() {
		_onVideo(this.onVideoHandler)
	}
	componentWillUnmount() {
		// cancel video realtime listener
		_offVideoListener()
	}
	playListHandler() {
		const playList = this.props.playList
		const messages = this.props.messages
		const {videoHost} = this.props
		console.log('current playlist: ', playList)
		if ( playList.length > 1 ) {
			console.log('play next song start')
			this.props.dispatch(playNext(playList,messages,videoHost))
			console.log('play next song end')
		}
	}
	videoTimeHandler(event) {

		// determine if video host or not # the one who play the video will be the host 
		event.target.seekTo(this.props.videoNowTime)
		if (this.props.userId === this.props.videoHost) {
			this.timer = setInterval(()=>{
				let nowTime = event.target.getCurrentTime()
				_updateVideoTime(nowTime)
			},1000)
		}
	}
	videoStateHandler(event) {
		//event.target.seekTo(this.props.videoNowTime)
		clearInterval(this.timer)
		if (this.props.userId === this.props.videoHost) {
			this.timer = setInterval(()=>{
				let nowTime = event.target.getCurrentTime()
				_updateVideoTime(nowTime)
			},1000)
			//console.log(event.target.getCurrentTime())
		}
	}
	onVideoHandler(data) {
		console.log('video update data: ' + data)
		switch(true) {
			case this.props.live !== data.live:
			case this.props.playList.length !== data.playList.length:
			case this.props.content.videoId !== data.content.videoId:
				this.props.dispatch(updateVideoState(data))
		}
	}
	render() {
		const opts = {
		    height: '100%',
		    width: '100%',
		    playerVars: { // https://developers.google.com/youtube/player_parameters
		    	autoplay: 1
		    }
		}
		return (
			<div id="video-container">
				{ this.props.live && (
					<YouTube
						videoId={this.props.videoId}
						opts={opts}
						onEnd={this.playListHandler}
						onReady={this.videoTimeHandler}
						onStateChange={this.videoStateHandler} 
					/>
				)}
			</div>
		)
	}
}

export default connect(state => (
	{
		live: state.video.live,
		videoId: state.video.content.videoId,
		playList: state.video.playList,
		content: state.video.content,
		messages: state.message.msg,
		videoNowTime: state.video.videoNowTime,
		videoHost: state.video.videoHost,
		userId: state.video.userId,
		scaleState: state.videoScale.large
	}
))(VideoBoad)