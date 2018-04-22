import React from 'react'
import ReactDOM from 'react-dom'
import Main from 'components/main.jsx'

window.onload = () => {
	ReactDOM.render(<Main />, document.getElementById('app'))
}