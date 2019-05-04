import React, { Component } from 'react'
import AuthService from '../../services/auth'

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name         : '',
      lastname     : '',
      email        : '',
      password     : '',
      errorMessage : ''
    }

    this.authUnRegister = null;
  }

  onChangeInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  componentWillUnmount() {
    this.authUnRegister && this.authUnRegister();
  }

  onLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    this.setState({errorMessage: ''});

    if(!email || !password) {
      this.setState({errorMessage: 'Email y password necesarios para login... no?? '});
      return;
    }

    const error = await AuthService.login(email, password)

    if(error) {
      this.setState({errorMessage: AuthService.getErrorMessage(error)});
    }
  }

  render() {
    const { email, password, errorMessage} = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onLogin}>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={this.onChangeInput} />
          </div>
          <div>
            <label>Contraseña</label>
            <input type="password" name="password" value={password} onChange={this.onChangeInput} />
          </div>
          <button>Sign In</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    )
  }
}
