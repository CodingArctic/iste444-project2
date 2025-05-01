import { useState } from 'react'
import { useContent } from './utils/ContentProvider'
import Nav from './components/Nav'
import './App.css'

const App = () => {
	const { content } = useContent()

	return (
		<div className="app">
			<Nav />
			{/* this is the current page that is set via contentProvider */}
			{content}
		</div>
	)
}

export default App
