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


class VideoPage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        
        const listDom = this.props.searchState ? (<SearchList 
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
                <a href="#app" className="back-link">
                    <img src="icons/back.png" />
                </a>
                <SearchBox />
                <div className="title-name">
                    <span 
                        className={this.props.searchState ? "unactive" : "active"}
                        onClick={()=>this.props.dispatch(changeSearchState(this.props.searchList,false))}
                        >
                        Playlist
                    </span>
                    <span
                        className={this.props.searchState ? "active" : "unactive"}
                        onClick={()=>this.props.dispatch(changeSearchState(this.props.searchList,true))}
                        >
                        Searchlist
                    </span>
                </div>
                {listDom}
                {this.props.videoMsgLoading && <div id="video-msg">{this.props.videoMsg}</div>}
            </div>
        )
    }
}

export default VideoPage



const PlayList = (props) => {
	let videoClass = ''
	const playList = props.videoList.map( (v,i) => {
		let videoClass = ''
		if ( i === 0 ) {
			videoClass = props.playing ? 'video-option video-playing' : 'video-option video-pause'
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
						onClick={()=>{
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