import React, {Component} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ws from "./socketConfig"
import logo from './logo.svg';


class LoginPage extends Component {
    constructor(props) {
      super();
      this.state = {
        username: '',
        password: '',
        er: '',
      };

  
      this.handleUserChange = this.handleUserChange.bind(this);
      this.handlePassChange = this.handlePassChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.ignoreError = this.ignoreError.bind(this);
    }
  
    handleSubmit(evt) {
      evt.preventDefault();
  
      if (!this.state.username) {
        return this.setState({ er: 'Please Enter Your Username' });
      }
  
      if (!this.state.password) {
        return this.setState({ er: 'Please Enter Your Password' });
      }

      ws.emit('json', {command: "login",
                              username: evt.target[0].value,
                              password: evt.target[1].value});
      
    }
  
    handleUserChange(evt) {
      this.setState({
        username: evt.target.value,
      });
    };
  
    handlePassChange(evt) {
      this.setState({
        password: evt.target.value,
      });
    }
  
    ignoreError() {
      this.setState({ er: '' });
    }
  
    render() {
  
      return (
        <><img src={logo} className="App-logo" alt="logo" /><div className="Login">
          <form onSubmit={this.handleSubmit}>
            {this.state.er &&
              <h3 data-test="er" onClick={this.ignoreError}>
                <button onClick={this.ignoreError}>✖</button>
                {this.state.er}
              </h3>}
            <TextField type="text" label="username" variant="filled" data-test="username" value={this.state.username} onChange={this.handleUserChange} />

            <TextField type="password" label="password" variant="filled" data-test="password" value={this.state.password} onChange={this.handlePassChange} />

            <Button variant="contained" type="submit" value="Log In" data-test="submit">Log In</Button>
          </form>

        </div></>
      );
    }
  }
  
  export default LoginPage;