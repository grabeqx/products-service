import React, { Component } from "react";
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { hexMd5 } from 'front-md5';
import ReCAPTCHA from "react-google-recaptcha";

import LoginContainer from "../containers/LoginContainer";
import Input from '../containers/Input';
import { clearLoginError, setProfile } from '../actions/actions';
import { registerToApp, loginToApp, addResetHash } from '../actions/apiCalls';
import Copy from "../static/images/slice1.png";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showRegister: false,
			togglePasswordReset: false,
			form: {
				login: '',
				password: '',
				email: '',
				firstname: '',
				lastname: '',
				company: '',
				address: '',
				postcode: '',
				tel: '',
				captcha: ''
			}
		}
	}

	login = (e) => {
		e.preventDefault();
		this.props.loginToApp(this.state.form).then((data) => {
			if(data.login) {
				var today = new Date();
				today.setHours(today.getHours() + 1);
				this.props.cookies.set('login', {login: data.login, id: data.id, session_id: data.session_id, profile: data.profile}, { path: '/', expires: today });
				this.props.setProfile(data.profile);
				this.props.history.push(`/panel/${data.id}/home`);
			}
		});
	}

	register = (e) => {
		e.preventDefault();
		this.props.registerToApp(this.state.form).then((data) => {
			if(data.status) {
				this.setState({
					showRegister: !this.state.showRegister
				})
			}
		})
	}

 	changeFormData = (e) => {
		let name = e.target.name;
		this.setState({
			form: {
				...this.state.form,
				[name]: e.target.value
			}
		});
	}

	onShowRegister = () => {
		this.props.clearLoginError();
		this.setState({
			showRegister: !this.state.showRegister
		});
	}
	
	toggleResetPassword = () => {
		this.setState({
			togglePasswordReset: !this.state.togglePasswordReset
		})
	}

	resetPassword = (e) => {
		e.preventDefault();
		const time = new Date().getTime();
		const result = hexMd5(`${this.state.form.email}${time}`);
		this.props.addResetHash({
			hash: result,
			mail: this.state.form.email
		});
	}

	captchaOnChange = (value) => {
		this.setState({
			form: {
				...this.state.form,
				captcha: value
			}
		});
	}

  render() {
    return (
			<LoginContainer onShowRegister={this.onShowRegister} showRegister={this.state.showRegister} toggleResetPassword={this.toggleResetPassword} togglePasswordReset={this.state.togglePasswordReset}>
			{!this.state.showRegister && !this.state.togglePasswordReset ? 
				<form onSubmit={this.login}>
					<h2>Zaloguj się</h2>
					{this.props.loginError.length ? <span className="error">{this.props.loginError}</span> : null}
					<Input type="text" placeholder="Login" label="Login" name="login" value={this.state.form.login} onChange={this.changeFormData}/>
					<Input type="password" placeholder="Hasło" label="Hasło" name="password" value={this.state.form.password} onChange={this.changeFormData}/>
					<button type="submit">Zaloguj się</button>
				</form>
			: !this.state.togglePasswordReset &&
				<form onSubmit={this.register}>
					<h2>Zarejestruj się</h2>
					{this.props.loginError.length ? <span className="error">{this.props.loginError}</span> : null}					
					<Input type="text" required placeholder="Login" label="Login" name="login" value={this.state.form.login} onChange={this.changeFormData}/>
					<Input type="password" required placeholder="Hasło" label="Hasło" name="password" value={this.state.form.password} onChange={this.changeFormData}/>
					<Input type="email" required placeholder="E-mail" label="Email" name="email" value={this.state.form.email} onChange={this.changeFormData}/>
					<Input type="text" required placeholder="Imię" label="Imię" name="firstname" value={this.state.form.firstname} onChange={this.changeFormData}/>
					<Input type="text" required placeholder="Nazwisko" label="Nazwisko" name="lastname" value={this.state.form.lastname} onChange={this.changeFormData}/>
					<Input type="text" required placeholder="Firma" label="Firma" name="company" value={this.state.form.company} onChange={this.changeFormData}/>
					<Input type="text" required placeholder="Adres" label="Adres" name="address" value={this.state.form.address} onChange={this.changeFormData}/>
					<Input type="text" required placeholder="Kod Pocztowy" label="Kod pocztywy" name="postcode" value={this.state.form.postcode} onChange={this.changeFormData}/>
					<Input type="text" required placeholder="Telefon" label="Telefon" name="tel" value={this.state.form.tel} onChange={this.changeFormData}/>
					<div className="re-captcha">
						<ReCAPTCHA sitekey="6LfCp7sUAAAAAO33Zl25ZS_DiBfNjTdAgYrsjs6J" onChange={this.captchaOnChange}/>
					</div>
					<button type="submit">Zarejestruj się</button>
				</form>}
				{this.state.togglePasswordReset ? <form onSubmit={this.resetPassword}>
					<h2>Podaj adres e-mail</h2>
					<p>Na podany adres zostanie wysłany link resetujący hasło.</p>
					<Input type="email" placeholder="E-mail" label="Email" name="email" value={this.state.form.email} onChange={this.changeFormData}/>
					<button type="submit">Resetuj hasło</button>
				</form> : null}
				<div className="copy">
					<img src={Copy} alt="copy" />
				</div>
		</LoginContainer>
    );
  }
}

function mapStateToProps(state) {
	return {
		login: state.mainReducer.login,
		loginError: state.mainReducer.loginError
	}
}

export default connect(mapStateToProps, {registerToApp, loginToApp, clearLoginError, setProfile, addResetHash})(withCookies(Login));
