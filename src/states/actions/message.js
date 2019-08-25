import {_listMessages, _updateMessage} from 'api/data.js'
import dayjs from 'dayjs'

// export function handleInputContent(text, messages, userId, pokemon) {
export function handleInputContent(myMessage, messages) {
	const frontendMessages = [...messages,myMessage].map( m => {
					if ( m.who !== 2 ) m.who = m.userId === myMessage.userId ? 0 : 1
					return m
				})
	return (dispatch) => {

		const messagesForServer = [...messages,myMessage]
		_updateMessage(messagesForServer)
			.then(data=>{
				// update state after database updated
				dispatch({
					type: '@MSG/UPDATE',
					msg: frontendMessages
				})
			})
			.catch( err => console.log(err))
	}
}

export function getMessageData() {
	return (dispatch) => {
		_listMessages()
			.then( res => {
				const data = res === 0 ? [] : 
					res
						.filter( e => {
							// deal with the time of data, it will be removed if it have been saved more than 1 day
							if ( e.time ) {
								const currentFormat = dayjs().format('YYYY-MM-DD')
								const currentTime = dayjs(currentFormat)
								const msgTime = dayjs(e.time)
								const timeDiff = currentTime.diff(msgTime, 'day')
								const result = (e.type === 0 && timeDiff <= 1)
								if (result) return true
								else return false
							}
							return false
						})
						.map( d => {
							if ( d.who === 0 ) d.who = 1
							return d
						})
				dispatch({
					type: '@MSG/UPDATE',
					msg: data
				})
				// refresh the data
				_updateMessage(data)
			
			})
	}
}


export const updateMessages = (messages, userId) => {
	const newMessages = messages.map( m => {
		if ( m.who !== 2 ) m.who = m.userId === userId ? 0 : 1
		return m
	})
	return {
		type: '@MSG/UPDATE',
		msg: newMessages
	}
}