import React, { Component } from 'react'
import "common/css/style.css"
import "common/css/common.css"
import RouterView from "../router/index"
import "antd/dist/antd.css";

import { BrowserRouter as Router } from "react-router-dom"
export default class App extends Component {
	render() {
		return (
			<div className='wrap'>
				<Router>
					<RouterView />
				</Router>
			</div>
		)
	}
}
