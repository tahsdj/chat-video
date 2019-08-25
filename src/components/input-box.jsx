import React from 'react'
import './input-box.sass'
import {connect} from 'react-redux'
import {handleInputContent} from 'states/actions/message.js'
import {getVideo, adjustVideoScale, playNext} from 'states/actions/video.js'
import dayjs from 'dayjs'


const InputBox = (props) => {
	this.content = ''
	const {playList, msg, userId} = props
	const inputHandler = (e) => {
		this.content = e.target.value
	}
	const keyHandler = (e) => {
		if ( e.key === 'Enter' && this.content !== '' ) {
			e.target.value = ''
			const date = dayjs().format('YYYY-MM-DD')
			const myMessage = {
				msg: this.content,
				type: 0, // 0: simple msg, 1: video action
				who: 0, // 0: me
				userId: props.userId,
				pokemon: props.pokemon,
				time: dayjs().format('YYYY-MM-DD')
			}
			props.dispatch(handleInputContent(myMessage, props.msg))
			// props.dispatch(getVideo(this.content, props.msg, props.playList, props.videoHost, props.userId, props.videoNowTime))
		}
	}
	return (
		<div id="input-container">
			<input 
				placeholder="type something..."
				onChange={ inputHandler }
				onKeyPress={ keyHandler }
			/>
			<ScaleIcon 
				scaleState={props.scaleState}
				adjustVideo={props.dispatch}
				playList={playList}
				messages={msg}
				userId={userId}
				dispatch={props.dispatch}
			/>
			{/* <PlayListIcon /> */}
		</div>
	)
}

export default connect( state => (
	{
		msg: state.message.msg,
		playList: state.video.playList,
		userId: state.video.userId,
		videoNowTime: state.video.videoNowTime,
		videoHost: state.video.videoHost,
		scaleState: state.videoScale.large,
		pokemon: state.message.pokemon
	}
))(InputBox)



const ScaleIcon = (props) => {
	let scaleState = props.scaleState
	const videoScaleHandler = () => props.adjustVideo(adjustVideoScale(scaleState))
	const {playList, messages, userId} = props
	return (
		<span 
			id="scale-icon"
			data-msg="next"
			// onClick={()=>videoScaleHandler()}
			onClick={()=>{
				if (playList.length > 1) {
					const message = {
						msg: '✂️✂️✂️✂️ 某人卡歌 ✂️✂️✂️✂️',
						type: 1,
						who: 2
					}
					props.dispatch(playNext(playList,messages,userId, message))
				}
			}}
		>
			<img src="icons/cut.png" />
		</span>
	)
}
const PlayListIcon = () => {
	return (
		<span 
			id="playlist-icon"
			data-msg="show playlist"
		>
			<a href="#filter-mask">
				<img src="icons/playlist.png" />
			</a>
		</span>
	)
}
