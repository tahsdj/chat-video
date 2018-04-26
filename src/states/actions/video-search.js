import  { _getSearchVideos } from 'api/youtube-search.js'

export function searchVideos(text) {
	return (dispatch) => {
		_getSearchVideos(text).then( res => {
			let list = res.map( (data,i) => {
				let content = {
					videoId: data.id.videoId,
					title: data.snippet.title,
					channelTitle: data.snippet.channelTitle,
					imageUrl: data.snippet.thumbnails.default.url
				}
				return content
			})
			console.log('search results: ' + JSON.stringify(res[0].snippet))
			dispatch({
				type: '@VIDEO/SEARCH',
				searchList: list
			})
		})
	}
}

export function changeSearchState(list, state) {
	return {
		type: '@VIDEO_LIST/STATE',
		searchList: list,
		showState: state
	}
}