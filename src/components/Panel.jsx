import React, { Component } from "react";
import { Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import {connect} from 'react-redux';

import Home from './Home';
import RegisterProduct from './RegisterProduct';
import Header from './Header';
import Sidebar from './Sidebar';
import PanelContent from '../containers/PanelContent';
import MainContent from '../containers/MainContent';
import { setUserId } from '../actions/actions';
import { getInitialData } from '../actions/apiCalls';

class Panel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPanel: false
		}
	}

	componentDidMount() {
		this.props.getInitialData().then((status) => {
			this.setState({
				showPanel: status
			});
		});
		if(!this.props.cookies.get('login')) {
			this.props.history.push('/');
		} else {
			this.props.setUserId(this.props.cookies.get('login').id)
		}
	}

	componentDidUpdate() {
		if(!this.props.cookies.get('login')) {
			this.props.history.push('/');
		} else {
			this.props.setUserId(this.props.cookies.get('login').id)
		}
	}


  render() {
    return (
			<>
				{this.state.showPanel &&
					<div className="panel">
						<Header />
						<PanelContent>
							<Sidebar />
							<MainContent>
								<Route path={`${this.props.match.url}/home`} component={Home} />
								<Route path={`${this.props.match.url}/register`} component={RegisterProduct} />
							</MainContent>
						</PanelContent>
				</div>}
			</>
    );
  }
}



export default connect(null, {setUserId, getInitialData})(withCookies(Panel));
