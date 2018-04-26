import React from 'react'
import './chat-box.sass'
import InputBox from 'components/input-box.jsx'
import {connect} from 'react-redux'
import {handleInputContent, getMessageData} from 'states/actions/message.js'
import VideoBoard from 'components/video-board.jsx'
import {getVideoData} from 'states/actions/video.js'
import {userId} from 'api/constant.js'
import {_onMessage} from 'api/data.js'
import SearchBox from 'components/search-box.jsx'
import {changeSearchState} from 'states/actions/video-search.js'
import {getVideo} from 'states/actions/video.js'

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
					<VideoPage 
						playList={this.props.playList}
						searchList={this.props.searchList}
						live={this.props.live}
						searchState={this.props.searchState}
						dispatch={this.props.dispatch}
						msg={this.props.msg}
						userId={this.props.userId}
						videoHost={this.props.videoHost}
						videoNowTime={this.props.videoNowTime}
					/>
				</div>
				<div id="chat-board">
					{this.props.live && <VideoBoard />}
					{msgDom}
				</div>
				<InputBox />
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
		userId: state.video.userId,
		videoNowTime: state.video.videoNowTime,
		videoHost: state.video.videoHost,
		searchList: state.videoSearch.searchList,
		searchState: state.videoSearch.showState
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


const VideoPage = (props) => {
	const listDom = props.searchState ? (<SearchList 
											videoList={props.searchList}
											playList={props.playList}
											playing={props.live}
											dispatch={props.dispatch}
											msg={props.msg}
											userId={props.userId}
											videoHost={props.videoHost}
											videoNowTime={props.videoNowTime}
										/>) : 
										(<PlayList
											videoList={props.playList}
											playing={props.live}

										/>)
	return (
		<div className="video-related-container">
			<a href="#app" className="back-link">
				<img src="icons/back.png" />
			</a>
			<SearchBox />
			<div className="title-name">
				<span 
					className={props.searchState ? "unactive" : "active"}
					onClick={()=>props.dispatch(changeSearchState(props.searchList,false))}
				>
					PlayList
				</span>
				<span
					className={props.searchState ? "active" : "unactive"}
					onClick={()=>props.dispatch(changeSearchState(props.searchList,true))}
				>
					SearchList
				</span>
			</div>
			{listDom}
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

const SearchList = (props) => {
	let videoClass = ''
	const playList = props.videoList.map( (v,i) => {
		return (
			<div 
				className="video-option search-option"
				key={`video-${i}`}
			>
				<div className="info-container">
					<img className="video-img" src={v.imageUrl}/>
					<div className="video-info">
						<span className="video-title">{v.title}</span>
						<span className="video-author">{`by ${v.channelTitle}`}</span>
					</div>
				</div>
				<div className="options">
					<button
						onClick={()=>props.dispatch(getVideo(`@add add?v=${v.videoId}`, props.msg, props.playList, props.videoHost, props.userId, props.videoNowTime))}
					>
						add
					</button>
					<button
						onClick={()=>props.dispatch(getVideo(`@play play?v=${v.videoId}`, props.msg, props.playList, props.videoHost, props.userId, props.videoNowTime))}
					>
						play
					</button>
				</div>
			</div>
		)
	})
	
	return (
		<div id="searchlist-container">
			{playList}
		</div>
	)
}