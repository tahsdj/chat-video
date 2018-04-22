


const messageInit = {
	msg: []
}

export default function message(state=messageInit, action) {
	switch(action.type) {
		case '@MSG/UPDATE':
			return {
				msg: action.msg
			}
		default:
			return state
	}
}