import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';

const modalStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 365,
    height: 340,
    display: 'flex',
    flexDirection: 'column',
  }
};

// Correct credentials:
// correct_login@example.com
// C0rr3Ct_P@55w0rd

export default class App extends Component {
  state = {
    modalOpen: false,
    login: '',
    password: '',
  }

  onClick = () => {
    if (this.state.modalOpen) {
      return;
    }

    this.setState({
      modalOpen: true,
    });
  }

  onLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { login, password } = this.state;
      const res = await fetch('https://recruitment-api.pyt1.stg.jmr.pl/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });
      const result = await res.json();
      console.log(result);
      if (result.status !== 'ok') {
        throw new Error(result.message);
      }
      alert(result.message);
    } catch (e) {
      alert(String(e));
    }
  }

  render() {
    return (
      <div className="app" onClick={this.onClick}>
        <Modal
          isOpen={this.state.modalOpen}
          style={modalStyles}
        >
          <h3>Are you a Raspberry Knight?</h3>
          <form className="login-form" onSubmit={this.onLoginSubmit}>
            <input
              onChange={e => this.setState({ login: e.target.value })}
              placeholder="Email"
              type="email"
              value={this.state.login}
            />
            <input
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="Password"
              type="password"
              value={this.state.password}
            />
            <button type="submit">Login</button>
          </form>
        </Modal>

      </div>
    );
  }
}
