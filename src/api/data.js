import firebase from 'firebase'
import {config} from 'api/constant.js'

firebase.initializeApp(config)

const messagesRef = firebase.database().ref('/messages')
const videoRef = firebase.database().ref('/video')

//for message database

export function _listMessages() {
 	return new Promise( (resolve, reject) => {
 		//console.log('list posts')
 		messagesRef.once('value').then( data => {
 			let msgs = []
 			data.forEach( d => {
 				msgs = d.val()
 			})
 			resolve(msgs)
 		})
 	})
 }

export function _updateMessage(msgs) {

 	return new Promise( (resolve, reject) => {
 		messagesRef.update({
	 		data: msgs
	 	})
	 	resolve(msgs)
 	})
 } 

// for video database

export function _getVideoData() {
	return new Promise( (resolve, reject) => {
 		//console.log('list posts')
 		videoRef.once('value').then( data => {
 			let response = {}
 			data.forEach( d => {
 				response = d.val()
 			})
 			resolve(response)
 		})
 	})
}

export function _updateVideoData(dataObj) {
	return new Promise( (resolve, reject) => {
 		videoRef.update({
	 		data: dataObj
	 	})
	 	resolve(dataObj)
 	})
}

export function _updateVideoTime(time) {
	return new Promise( (resolve, reject) => {
 		videoRef.child('data').update({
	 		videoNowTime: time
	 	})
	 	resolve(time)
 	})
}

export function _onMessage(callBack) {
	return messagesRef.on('child_changed', data => {
		//console.log('change~~~~~~~~~~~~~~~~~')
		//console.log('update val: ' + data.val().val())
		//for ( let i in data.val() ) console.log('key: ' +  i) 
		//console.log('update: ' + data.val())
		callBack(data.val())
	})
}

export function _onVideo(callBack) {
	return videoRef.on('child_changed', data => {
		callBack(data.val())
	})
}

export function _offVideoListener() {
	videoRef.off('child_changed')
}