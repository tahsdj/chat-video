



const API_KEY = 'AIzaSyBu6WFwB18WAyS72p0NFlN6RPPnJ30jZpE'

export function _getYoutubeData(vid) {
	const gUrl = "https://www.googleapis.com/youtube/v3/videos?id=" + vid + "&key=" + API_KEY + "&part=snippet,statistics,contentDetails"
	console.log('vid: ' + vid)
	return fetch(gUrl,{method: 'get'})
}