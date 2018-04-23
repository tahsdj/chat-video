import {pokemonList} from 'api/constant.js'

let index = Math.round((Math.random()*pokemonList.length))
const messageInit = {
	msg: [],
	pokemon: pokemonList[index]
}

export default function message(state=messageInit, action) {
	switch(action.type) {
		case '@MSG/UPDATE':
			return {
				msg: action.msg,
				pokemon: messageInit.pokemon
			}
		default:
			return state
	}
}