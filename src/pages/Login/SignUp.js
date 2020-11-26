import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import swal from 'sweetalert2';

import openModal from '../../actions/openModal';
import registerAction from '../../actions/registerAction';
import Login from './Login';
import './Login.css';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      lowerPartOfForm: (
        <button
          type="button"
          onClick={this.showInputs}
          className="sign-up-button"
        >
          Sign up with email
        </button>
      ),
    };
  }
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

  showInputs = () => {
    this.setState({
      lowerPartOfForm: (
        <SignUpInputFields
          changeEmail={this.changeEmail}
          changePassword={this.changePassword}
        />
      ),
    });
  };

  submitLogin = async (e) => {
    e.preventDefault();

    const url = `${baseUrl}/users/signup`;
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    const response = await axios.post(url, data);

    /* ============================================ */
    // response.data.msg could be:
    // - invalidData
    // - userExists
    // - userAdded
    if (response.data.msg === 'userExists') {
      swal.fire({
        title: 'Email Exists',
        text:
          'The email you provided is already reigstered. Please try another',
        icon: 'error',
      });
    } else if (response.data.msg === 'invalidData') {
      swal.fire({
        title: 'Invalid Email/Password',
        text: 'Please provide a valid email and password',
        icon: 'error',
      });
    } else if (response.data.msg === 'userAdded') {
      swal.fire({
        title: 'Success!',
        text: 'Signed up successfully',
        icon: 'success',
      });

      // Call reigster action to update auth reducer!
      this.props.registerAction(response.data);
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
          {this.state.lowerPartOfForm}
          <div className="divider"></div>
          <div>
            Already have an account?{' '}
            <span
              className="text-link"
              onClick={() => {
                this.props.openModal('open', <Login />);
              }}
            >
              Log in
            </span>
          </div>
        </form>
      </div>
    );
  }
}

const SignUpInputFields = (props) => {
  return (
    <div className="sign-up-wrapper">
      <div className="col m12">
        <div className="input-field" id="email">
          <div className="form-label">Email</div>
          <input type="text" placeholder="Email" onChange={props.changeEmail} />
        </div>
      </div>
      <div className="col m12">
        <div className="input-field" id="password">
          <div className="form-label">Password</div>
          <input
            type="password"
            placeholder="Password"
            onChange={props.changePassword}
          />
        </div>
      </div>
      <div className="col m12">
        <button type="submit" className="btn red accent-2">
          Sign Up!
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openModal: openModal,
      registerAction: registerAction,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
