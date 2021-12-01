import React, {Component} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ws from "./socketConfig"
import { useNavigate } from "react-router";

class HomePage extends Component {
    constructor() {
      super();
      this.state = {
       
      };
    }
  
    render() {

      return (
        <div className="HomePage">
          Wow, you've successfully logged in.
        </div>
      );
    }
  }
  
  export default HomePage;