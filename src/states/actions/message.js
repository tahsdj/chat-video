import {_listMessages, _updateMessage} from 'api/data.js'


export function handleInputContent(text, messages, userId, pokemon) {
	const message = {
		msg: '',
		type: 0, // 0: simple msg, 1: video action
		who: 0, // 0: me
		playList: [],
		userId: '',
		pokemon: pokemon
	}
	messages = messages.map( m => {
					if ( m.who !== 2 ) m.who = m.userId === userId ? 0 : 1
					return m
				})
	return (dispatch) => {
		switch(text.split(' ')[0]) {
			case '@play':
			case '@add':
			case '@onListenMessage':
				dispatch({
					type: '@MSG/UPDATE',
					msg: messages
				})
				break
			default:
				message.msg = text
				message.userId = userId
				const messageServer = {
					msg: text,
					type: 0,
					who: 1,
					userId: userId,
					pokemon: pokemon
				}
				const messagesForServer = [...messages, messageServer]
				messages = [...messages, message]
				//console.log(messages)
				_updateMessage(messagesForServer).then(data=>{
					dispatch({
						type: '@MSG/UPDATE',
						msg: messages
					})
				})
		}
	}
}

export function getMessageData() {
	return (dispatch) => {
		_listMessages().then( data => {

			data = data === 0 ? [] : data.map( d => {
			 	if ( d.who === 0 ) d.who = 1
			 	return d
			})
			dispatch({
				type: '@MSG/UPDATE',
				msg: data
			})
		})
	}
}