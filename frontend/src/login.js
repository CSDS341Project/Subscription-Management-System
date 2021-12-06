import React, {Component} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ws from "./socketConfig"
import logo from './logo.svg';


class Login extends Component {
    constructor(props) {
      super();
      this.state = {
        username: '',
        password: '',
        er: '',
      };

  
      this.usernameChange = this.usernameChange.bind(this);
      this.passwordChange = this.passwordChange.bind(this);
      this.pass = this.pass.bind(this);
      this.performSubmit = this.performSubmit.bind(this);
    }
  
    performSubmit(evt) {
      evt.preventDefault();
      if (!this.state.username) {
        return this.setState({ er: 'Enter your username.' });
      }
      if (!this.state.password) {
        return this.setState({ er: 'Enter your password.' });
      }

      ws.emit('json', {command: "login",
                              username: evt.target[0].value,
                              password: evt.target[1].value});
      
    }
  
    usernameChange(evt) {
      this.setState({
        username: evt.target.value,
      });
    };
  
    passwordChange(evt) {
      this.setState({
        password: evt.target.value,
      });
    }
  
    pass() {
      this.setState({ er: '' });
    }
  
    render() {
  
      return (
        <><img src={logo} className="App-logo" alt="logo" /><div className="Login">
          <form onSubmit={this.performSubmit}>
            {this.state.er &&
              <h3 data-test="er" onClick={this.pass}>
                <button onClick={this.pass}>✖</button>
                {this.state.er}
              </h3>}
            <TextField type="text" label="username" variant="filled" data-test="username" value={this.state.username} onChange={this.usernameChange} />

            <TextField type="password" label="password" variant="filled" data-test="password" value={this.state.password} onChange={this.passwordChange} />

            <Button variant="contained" type="submit" value="Log In" data-test="submit">Log In</Button>
          </form>

        </div></>
      );
    }
  }
  
  export default Login;