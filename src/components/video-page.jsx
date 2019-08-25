import React from 'react'
import './video-page.sass'
import InputBox from 'components/input-box.jsx'
import {connect} from 'react-redux'
import {handleInputContent, getMessageData} from 'states/actions/message.js'
import VideoBoard from 'components/video-board.jsx'
import {getVideoData} from 'states/actions/video.js'
import {userId} from 'api/constant.js'
import {_onMessage} from 'api/data.js'
import SearchBox from 'components/search-box.jsx'
import {changeSearchState} from 'states/actions/video-search.js'
import {getVideo, showVideoEvent} from 'states/actions/video.js'
import styled from 'styled-components'
import  VidoButton from 'components/VideoButton/index.jsx'
import ChatBox from 'components/chat-box.jsx'

const VideoTest = ( states, actions ) => {
	// 
	//
	//

	return (props) => (
		<div>

		</div>
	)
}

const componenetStates = (states) => (props) => class extends React.Component {
	constructor(props) {
		super(props)
		
	}
	render() {
		return (
			<LocalSharableStates>
				
			</LocalSharableStates>
		)
	}
}

class VideoPage extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			searchState: false
		}
		console.log('props: ', this.props)
		this.setSearchState = this.setSearchState.bind(this)
	}
	setSearchState(state) {
		this.setState({searchState: state})
	}
    render() {
        
        const listDom = this.state.searchState ? (<SearchList 
            videoList={this.props.searchList}
            playList={this.props.playList}
            playing={this.props.live}
            dispatch={this.props.dispatch}
            msg={this.props.msg}
            userId={this.props.userId}
            videoHost={this.props.videoHost}
            videoNowTime={this.props.videoNowTime}
            videoMsgLoading={this.props.videoMsgLoading}
        />) : 
        (<PlayList
            videoList={this.props.playList}
            playing={this.props.live}
        />)
        return (
            <div className="video-related-container">
                {/* <a href="#app" className="back-link">
                    <img src="icons/back.png" />
                </a> */}
                <SearchBox
					setSearchState={this.setSearchState}
					/>
				{/* <VideoBar /> */}
				<VideoBoard />
                <div className="title-name">
                    <span 
                        className={this.state.searchState ? "unactive" : "active"}
						// onClick={()=>this.props.dispatch(changeSearchState(this.props.searchList,false))}
						onClick={()=>this.setSearchState(false)}
                        >
                        Playlist
                    </span>
                    <span
                        className={this.state.searchState ? "active" : "unactive"}
                        // onClick={()=>this.props.dispatch(changeSearchState(this.props.searchList,true))}
                        onClick={()=>this.setSearchState(true)}
						>
                        Searchlist
                    </span>
                </div>
				{listDom}
				{/* <PlayList
					videoList={this.props.playList}
					playing={this.props.live}
				/> */}
                {this.props.videoMsgLoading && <div id="video-msg">{this.props.videoMsg}</div>}
            </div>
        )
    }
}

// export default connect( state => (
// 	{
// 		msg: state.message.msg,
// 		live: state.video.live,
// 		playList: state.video.playList,
// 		userId: state.video.userId,
// 		videoNowTime: state.video.videoNowTime,
// 		videoHost: state.video.videoHost,
// 		searchList: state.videoSearch.searchList,
// 		searchState: state.videoSearch.showState,
// 		videoMsg: state.videoMsgStatus.msg,
// 		videoMsgLoading: state.videoMsgStatus.loading
// 	}
// ))(VideoPage)


// export default VideoPage


const VideoBarContainer = styled.div`
	display: inline-flex;
	position: absolute;
	bottom: 0px;
	left: 0;
	width: calc(100%);
	flex-direction: row;
	height: 50px;
	align-items: flex-start;
	background-color: rgba(20,20,20,1);
`

const Video = styled.div`
	display: inline-flex;
	width: 80px;
	height: 50px;
`

const VideoBar = () => (
	<VideoBarContainer>
		<Video>
			<VideoBoard />
		</Video>
	</VideoBarContainer>
)

const PlayList = (props) => {
	let videoClass = ''
	console.log('playlist: ', props)
	const playList = props.videoList.map( (v,i) => {
		// let videoClass = ''
		// if ( i === 0 ) 
		// 	videoClass = props.playing ? 'video-playing' : 'video-pause'
		
		return (
			<VidoButton
				isPlaying={i===0?true:false}
				image={v.image}
				title={v.title}
				channelName={v.channelName}
			/>
			// <div 
			// 	className={`video-option ${videoClass}`}
			// 	key={`video-${i}`}
			// >
			// 	<img className="video-img" src={v.image}/>
			// 	<div className="video-info">
			// 		<span className="video-title">{v.title}</span>
			// 		<span className="video-author">{`by ${v.channelName}`}</span>
			// 	</div>
			// </div>
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
	console.log('props: ', props)
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
						onClick={()=>{
							console.log('click: ', props.dispatch)
							if ( !props.videoMsgLoading ) {
								props.dispatch(getVideo(`@add add?v=${v.videoId}`, props.msg, props.playList, props.videoHost, props.userId, props.videoNowTime))
								props.dispatch(showVideoEvent('video added'))
							}
						}}
					>
						add
					</button>
					<button
						onClick={()=>{
							if ( !props.videoMsgLoading ) {
								props.dispatch(getVideo(`@play play?v=${v.videoId}`, props.msg, props.playList, props.videoHost, props.userId, props.videoNowTime))
								props.dispatch(showVideoEvent('play success'))
							}
						}}
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

const Button = (props) => (
    <button
        onClick={()=>{
            if ( !props.videoMsgLoading ) {
                props.dispatch(getVideo(`@add add?v=${props.videoId}`, props.msg, props.playList, props.videoHost, props.userId, props.videoNowTime))
                props.dispatch(showVideoEvent('video added'))
            }
        }}
    >
        add
    </button>
)

const connectComponentsToStates = ( components ) =>
	components.map( component => connect(state=>({
		msg: state.message.msg,
		live: state.video.live,
		playList: state.video.playList,
		userId: state.video.userId,
		videoNowTime: state.video.videoNowTime,
		videoHost: state.video.videoHost,
		searchList: state.videoSearch.searchList,
		searchState: state.videoSearch.showState,
		videoMsg: state.videoMsgStatus.msg,
		videoMsgLoading: state.videoMsgStatus.loading
	}))(component)) 



const [a,b,c] = connectComponentsToStates([VideoPage, PlayList, SearchList])

export default a