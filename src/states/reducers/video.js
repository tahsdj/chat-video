import {userId} from 'api/constant.js'

const videoInit = {
	live: false,
	content: {
		videoId: '',
		title: '',
		videoNowTime: 0
	},
	videoNowTime: 0,
	videoHost: '',
	userId: userId,
	playList: []
}

export function video(state=videoInit, action) {
	switch(action.type) {
		case '@VIDEO/PLAY':
			return {
				live: action.live,
				content: action.content,
				playList: action.playList,
				videoHost: action.videoHost,
				videoNowTime: action.videoNowTime,
				userId: videoInit.userId
			}
		default:
			return state
	}
}

const videoScaleInit = {
	large: false
}

export function videoScale(state=videoScaleInit, action) {
	switch(action.type) {
		case '@VIDEO/SCALE':
			return {
				large: action.large
			}
		default:
			return state
	}
}

const videoMsgStatusInit = {
	loading: false,
	msg: ''
}

export function videoMsgStatus(state=videoMsgStatusInit, action) {
	switch(action.type) {
		case '@VIDEO/LOADING_START':
			return {
				loading: true,
				msg: action.msg
			}
		case '@VIDEO/LOADING_END':
			return {
				loading: false,
				msg: action.msg
			}
		default:
			return state
	}
}