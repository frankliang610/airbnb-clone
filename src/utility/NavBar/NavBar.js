import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import Login from '../../pages/Login/Login';
import SignUp from '../../pages/Login/SignUp';

import './NavBar.css';
import openModal from '../../actions/openModal';
import logoutAction from '../../actions/logoutAction';

class NavBar extends Component {
  componentDidUpdate(oldProps) {
    if (oldProps.auth.token !== this.props.auth.token) {
      this.props.openModal('close', '');
    }
  }

  render() {
    const isHomePage = this.props.location.pathname === '/';
    const navColor = isHomePage ? 'transparent' : 'black';
    return (
      <div className="container-fluid nav">
        <div className="row">
          <nav className={navColor}>
            <div className="nav-wrapper">
              <Link to="/" className="left">
                airbnb
              </Link>
              <ul className="right" id="nav-mobile">
                <li>
                  <Link to="/language">English (US)</Link>
                </li>
                <li>
                  <Link to="/currency">$ US</Link>
                </li>
                <li>
                  <Link to="/host">Become a host</Link>
                </li>
                <li>
                  <Link to="/help">Help</Link>
                </li>
                {this.props.auth.email ? (
                  <>
                    <li className="login-signup">Hello, {this.props.auth.email}</li>
                    <li className="login-signup" onClick={() => {this.props.logoutAction()}}>Logout</li>
                  </>
                ) : (
                  <>
                    <li
                      className="login-signup"
                      onClick={() => {
                        this.props.openModal('open', <SignUp />);
                      }}
                    >
                      Sign up
                    </li>
                    <li
                      className="login-signup"
                      onClick={() => {
                        this.props.openModal('open', <Login />);
                      }}
                    >
                      Log in
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openModal: openModal,
      logoutAction: logoutAction,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
