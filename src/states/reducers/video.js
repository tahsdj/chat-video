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
	large: true
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