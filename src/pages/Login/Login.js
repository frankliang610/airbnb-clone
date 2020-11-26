import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import swal from 'sweetalert2';
import openModal from '../../actions/openModal';
import loggedIn from '../../actions/loggedInAction';
import SignUp from './SignUp';
import './Login.css';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  changeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  changePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  submitLogin = async (e) => {
    e.preventDefault();

    const url = `${baseUrl}/users/login`;
    const data = {
      email: this.state.email,
      password: this.state.password
    }

    const response = await axios.post(url, data);

     /* ============================================ */
    // response.data.msg could be:
    // - badPass: valid username, but wrong passwrod
    // - noEmail: email is not registered
    // - loggedIn: logged in successfully {token, email}
    if (response.data.msg === 'badPass') {
      swal.fire({
        title: 'Wrong Password',
        text:
          'The email you provided is wrong. Please try another',
        icon: 'error',
      });
    } else if (response.data.msg === 'noEmail') {
      swal.fire({
        title: 'Invalid Email',
        text: 'The email you provided has not been registered, please register it first',
        icon: 'error',
      });
    } else if (response.data.msg === 'loggedIn') {
      swal.fire({
        title: 'Success!',
        icon: 'success',
      });

      this.props.loggedIn(response.data);
    }

  };

  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.submitLogin}>
          <button className="facebook-login">Connect With Facebook</button>
          <button className="google-login">Connect With Google</button>
          <div className="login-or center">
            <span>or</span>
            <div className="or-divider"></div>
          </div>
          <input
            type="text"
            className="browser-default"
            placeholder="Email address"
            value={this.email}
            onChange={this.changeEmail}
          />
          <input
            type="password"
            className="browser-default"
            placeholder="Password"
            value={this.password}
            onChange={this.changePassword}
          />
          <button className="sign-up-button">Login</button>
          <div className="divider"></div>
          <div>
            Don't have an account?{' '}
            <span
              className="text-link"
              onClick={() => {
                this.props.openModal('open', <SignUp />);
              }}
            >
              Sign Up
            </span>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openModal: openModal,
      loggedIn: loggedIn,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Login);
