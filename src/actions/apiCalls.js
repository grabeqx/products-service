import axios from 'axios';

import {endpoint, host} from '../constants/config';
import actions, { showMessage } from './actions';

const makeid = (length) => {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		 result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

const getCookieValueByRegEx = (a, b) => {
	b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
	return b ? b.pop() : '';
}

const checkSession = () => {
	if(getCookieValueByRegEx('login')) {
		let cookie = JSON.parse(unescape(getCookieValueByRegEx('login')));
		return axios.post(endpoint, {
			session_id: cookie.session_id,
			user_id: parseInt(cookie.id),
			checkSession: true
		})
	} else {
		document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		window.location.href = "/";
	}
}


const api = {
	get: (method, ignoreSession) => {
		if(ignoreSession) {
			return axios.get(`${endpoint}?action=${method}`);
		}
		return checkSession().then(({data}) => {
			if(data.status) {
				return axios.get(`${endpoint}?action=${method}`);
			} else {
				document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				window.location.href = "/";
			}
		})
	},
	post: (method, postData, ignoreSession, config) => {
		if(ignoreSession) {
			return axios.post(endpoint, {
				...postData,
				[method]: true
			}, config)
		}
		return checkSession(ignoreSession).then(({data}) => {
			if(data.status) {
				return axios.post(endpoint, {
					...postData,
					[method]: true
				}, config)
			} else {
				this.props.history.push('/');
			}
		})
		
	}
}

const getProductsData = () => {
	return api.get('getProducts').then(({data}) => {
		return data;
	})
}

const getUserProductsData = (id) => {
	return api.get(`getUserProducts&userId=${id}`).then(({data}) => {
		return data;
	})
}


export const registerToApp = (data) => (dispatch) => {
	dispatch(actions.showLoader());
	api.post('register', data, true).then(({data}) => {
		dispatch(showMessage(data));
		dispatch(actions.hideLoader());
	})
}

export const loginToApp = (data) => (dispatch) => {
	dispatch(actions.showLoader());
	data.session_id = makeid(35);
	return api.post('loginToApp', data, true).then(({data}) => {
		if(data.status) {
			dispatch(actions.login(data));
		} else {
			dispatch(showMessage(data));
			dispatch(actions.loginError(data));
		}
		return data;
	});
}

export const getProducts = () => (dispatch) => {
	dispatch(actions.showLoader());
	return getProductsData().then((data) => {
		dispatch(actions.getProducts(data));
		return data;
	})
}

export const getUserProducts = (id) => (dispatch) => {
	dispatch(actions.showLoader());
	return getUserProductsData(id).then((data) => {
		dispatch(actions.getUserProducts(data));
		return data;
	})
}

export const addUserProduct = (data) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('addUserProduct', data).then(({data}) => {
		dispatch(showMessage(data));
		dispatch(actions.hideLoader());
	})
}

export const getInitialData = () => (dispatch) => {
	dispatch(actions.showLoader());
	return axios.all([getProductsData()])
		.then(axios.spread(function (products) {
			dispatch(actions.getProducts(products));
			dispatch(actions.hideLoader());
			return true;
		})
	);
}

export const setStatusService = (service) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('setStatusService', service).then(({data}) => {
		if(data.status) {
			dispatch(actions.setStatusService(service.id));
		}
		dispatch(showMessage(data));
		dispatch(actions.hideLoader());
	});
}

export const sendErrorReport = (errorData) => (dispatch) => {
	dispatch(actions.showLoader());
	const formData = new FormData();
	formData.append('image', errorData.file);
	const config = {
		headers: {
			'content-type': 'multipart/form-data'
		}
	}
	if(!errorData.file) {
		return api.post('saveErrorData', errorData).then(({data}) => {
			dispatch(showMessage(data));
			dispatch(actions.hideLoader());
		});
	}
	return axios.post(`${host}/upload.php`, formData, config).then((response) => {
		if(!response.data.status) {
			dispatch(actions.hideLoader());
			dispatch(showMessage(response.data));
			return;
		} else {
			const filePath = response.data.message;
			errorData.file = filePath;
			return api.post('saveErrorData', errorData).then(({data}) => {
				dispatch(showMessage(data));
				dispatch(actions.hideLoader());
			});
		}
	});
}

export const checkIfReportExist = (service) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('checkReportstatus', service).then(({data}) => {
		if(data.status) {
			dispatch(actions.hideLoader());
			return data;
		} else {
			dispatch(showMessage(data));
			return data;
		}
	});
}