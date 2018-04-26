import searchYouTube from 'youtube-api-search'
import { YOUTUBE_API } from 'api/constant.js'

export function _getSearchVideos(searchText){
		return new Promise((resolve, reject)=>{
			 searchYouTube({key: YOUTUBE_API, term: searchText, maxResults: 10}, (videos) => {
	            resolve(videos)
	        })
		})
}