import React from 'react'
import './chat-box.sass'
import InputBox from 'components/input-box.jsx'
import {connect} from 'react-redux'
import {handleInputContent, getMessageData} from 'states/actions/message.js'
import VideoBoard from 'components/video-board.jsx'
import {getVideoData} from 'states/actions/video.js'
import {userId} from 'api/constant.js'
import {_onMessage} from 'api/data.js'

class ChatBox extends React.Component {
	constructor(props) {
		super(props)
		this.onMessageHandler = this.onMessageHandler.bind(this)
	}
	componentWillMount() {
		this.props.dispatch(getMessageData())
		this.props.dispatch(getVideoData())
		//console.log('id:  ' + this.userId)
	}
	componentDidMount() {
		const d = document.getElementById("chat-board")
		d.scrollTo(0,d.scrollHeight)
		_onMessage(this.onMessageHandler)
	}
	componentDidUpdate() {
		const d = document.getElementById("chat-board")
		d.scrollTo(0,d.scrollHeight)
	}
	render() {
		let msgDom = []
		const msg = this.props.msg
		msgDom = msg.map( (m,i) => {
			return (
				<Message 
					msg={m.msg}
					type={m.type}
					who={m.who}
					key={`msg-${i}`}
					pokemon={ m.who !== 2 ? m.pokemon : {}}
				/>
			)
		})
		return (
			<div id="chat-box-container">
				<div id="filter-mask">
					<a href="#app"></a>
				</div>
				<div id="chat-board">
					{this.props.live && <VideoBoard />}
					{msgDom}
				</div>
				<InputBox />
				<PlayList 
					videoList={this.props.playList}
					playing={this.props.live}
				/>
			</div>
		)
	}
	onMessageHandler(messages) {
		//console.log('messages: ' + messages)
		this.props.dispatch(handleInputContent('@onListenMessage 123', messages, this.props.userId))
	}
}

export default connect( state => (
	{
		msg: state.message.msg,
		live: state.video.live,
		playList: state.video.playList,
		userId: state.video.userId
	}
))(ChatBox)

/*
const InputBox = () => {
	return (
		<div id="input-container">
			<input placeholder="type something..." />
		</div>
	)
}
*/

const Message = (props) => {
	let cssClass = ''
	let name = ''
	let color = ''
	let pokemonName = ''
	switch(props.who) {
		case 0:
			cssClass = 'message-box self-message'
			color = 'white'
			break
		case 1:
			cssClass = 'message-box'
			name = '匿名: '
			color = props.pokemon.color
			pokemonName = props.pokemon.name
			break
		case 2:
			cssClass = 'message-box system-message'
			color = '#969696'
	}
	//const cssClass = props.self ? 'message-box self-message' : 'message-box'
	return (
		<div className={cssClass}>
			<span 
				style={{color: color}}
				className={props.who === 1 && "pokemon-name"}
				data-msg={pokemonName}
			> 
				{name}{props.msg} 
			</span>
		</div>
	)
}

const PlayList = (props) => {
	let videoClass = ''
	const playList = props.videoList.map( (v,i) => {
		let videoClass = ''
		if ( i === 0 ) {
			if ( props.playing ) {
				videoClass = 'video-option video-playing'
			} else {
				videoClass = 'video-option video-pause'
			}
		} else {
			videoClass = 'video-option'
		}
		return (
			<div 
				className={videoClass}
				key={`video-${i}`}
			>
				<img className="video-img" src={v.image}/>
				<div className="video-info">
					<span className="video-title">{v.title}</span>
					<span className="video-author">{`by ${v.channelName}`}</span>
				</div>
			</div>
		)
	})
	
	return (
		<div id="playlist-container">
			{playList}
		</div>
	)
}