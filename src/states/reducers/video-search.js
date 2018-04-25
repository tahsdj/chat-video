
const searchInit = {
	searchList: [],
	showState: false
}

export function videoSearch(state=searchInit, action) {
	switch(action.type) {
		case '@VIDEO/SEARCH':
			return {
				searchList: action.searchList,
				showState: true
			}
		case '@VIDEO_LIST/STATE':
			return {
				searchList: action.searchList,
				showState: action.showState
			}
		default:
			return state
	}
}
