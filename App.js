import React from 'react'

import Root from './src/navigation'

console.disableYellowBox = true

export default class App extends React.PureComponent {
	render() {
		return <Root />
	}
}
