import {_getYoutubeData} from 'api/youtube-api.js'
import {_listMessages, _updateMessage, _getVideoData, _updateVideoData} from 'api/data.js'


export function getVideo(text,messages,playList,hostKey,userId,videoNowTime) {
	let url = ''
	let vid = ''
	return (dispatch) => {
		switch (text.split(' ')[0]) {
	 		case '@play':
				url = text.split('?v=')
		    	vid = url[url.length-1]
		    	//console.log(url)
	    		_getYoutubeData(vid)
	    			.then( response => response.json())
		    		.then( data => {
		    			console.log(data)
		    			const content = {
							//user: '訪客',
							videoId: vid,
							//time: `${month+1}月${date}日 ${hour>=10?hour:'0'+hour}:${minutes>=10?minutes:'0'+minutes}`,
							channelName: data["items"][0]["snippet"]["channelTitle"],
							title: data["items"][0]["snippet"]["title"],
							image: data["items"][0]["snippet"]["thumbnails"]["default"]["url"],
							videoNowTime: 0
						}
						if (playList.length === 0) playList = [content]
						else playList[0] = content
						const dataObj = {
							live: true,
							content: playList[0],
							playList: playList,
							videoHost: userId,
							videoNowTime: 0
						}
						_updateVideoData(dataObj).then( res => {
							dispatch({
									type: '@VIDEO/PLAY',
									live: res.live,
									content: res.content,
									playList: res.playList,
									videoNowTime: res.videoNowTime,
									videoHost: res.videoHost
								})
						})
						const message = {
							msg: '目前正在播放: ' + content.title,
							type: 1,
							who: 2 //2: system
						}
						messages = [...messages, message]
						_updateMessage(messages).then(data=>{
							dispatch({
								type: '@MSG/UPDATE',
								msg: data
							})
						})
		    		})
		    	break
		    case '@add':
		    	url = text.split('?v=')
		    	vid = url[url.length-1]
		    	//console.log(url)
	    		_getYoutubeData(vid)
	    			.then( response => response.json())
		    		.then( data => {
		    			const content = {
							//user: '訪客',
							videoId: vid,
							//time: `${month+1}月${date}日 ${hour>=10?hour:'0'+hour}:${minutes>=10?minutes:'0'+minutes}`,
							channelName: data["items"][0]["snippet"]["channelTitle"],
							title: data["items"][0]["snippet"]["title"],
							image: data["items"][0]["snippet"]["thumbnails"]["default"]["url"],
							videoNowTime: 0
						}
						playList = [...playList, content]
						const dataObj = {
							live: true,
							content: playList[0],
							playList: playList,
							videoHost: userId,
							videoNowTime: videoNowTime
						}
						_updateVideoData(dataObj).then( res => {
							dispatch({
									type: '@VIDEO/PLAY',
									live: res.live,
									content: res.content,
									playList: res.playList,
									videoNowTime: res.videoNowTime,
									videoHost: res.videoHost
								})
						})
						dispatch({
							type: '@VIDEO/PLAY',
							live: true,
							content: playList[0],
							playList: playList
						})
						const message = {
							msg: '新增影片: ' + content.title,
							type: 1,
							who: 2 //2: system
						}
						messages = [...messages, message]
						_updateMessage(messages).then(data=>{
							dispatch({
								type: '@MSG/UPDATE',
								msg: data
							})
						})
		    		})
		    	break
		}
	}
}



export function playNext(playList,messages,videoHost) {
	playList = playList.slice(1,playList.length)
	return (dispatch) => {
		const dataObj = {
			live: true,
			content: playList[0],
			playList: playList,
			videoHost: videoHost,
			videoNowTime: 0
		}
		_updateVideoData(dataObj).then( res => {
			dispatch({
					type: '@VIDEO/PLAY',
					live: res.live,
					content: res.content,
					playList: res.playList,
					videoNowTime: res.videoNowTime,
					videoHost: res.videoHost
				})
		})
		const message = {
			msg: '目前正在播放: ' + playList[0].title,
			type: 1,
			who: 2 //2: system
		}
		messages = [...messages, message]
		_updateMessage(messages).then(data=>{
							dispatch({
								type: '@MSG/UPDATE',
								msg: data
							})
						})
	}
}


export function getVideoData() {
	return (dispatch) => {
		_getVideoData().then( res => {
			if ( res === 0 ) {
				dispatch({
					type: '@VIDEO/PLAY',
					live: false,
					content: {},
					playList: [],
					videoHost: '',
					videoNowTime: 0
				})
			}
			else {
				//console.log('hi')
				dispatch({
					type: '@VIDEO/PLAY',
					live: res.live,
					content: res.content,
					playList: res.playList === 0 ? [] : res.playList,
					videoHost: res.videoHost,
					videoNowTime: res.videoNowTime
				})
			}
		})
	}
}

export function updateVideoState(res) {
	return (dispatch) => {
		dispatch({
			type: '@VIDEO/PLAY',
			live: res.live,
			content: res.content,
			playList: res.playList === 0 ? [] : res.playList,
			videoHost: res.videoHost,
			videoNowTime: res.videoNowTime
		})
	}
}