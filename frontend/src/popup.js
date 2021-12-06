import React, { Component, Fragment } from 'react';  
import { Modal } from 'react-bootstrap';  
import ws from "./socketConfig"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
class Popup extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            showModal: false,
            subscription_id: "",
            platform: "",
            next_amount_due: 0,
            card_num: "",
            email: "",
            username: "",
            password: ""
        };  
    }  
  
    showingModal = (status) => {  
        this.close();  
        this.setState({ showModal: status });  
    }  

  
    close = () => {  
        this.props.onPopupClose(false);  
    }  

    changeID = (evt) => {
        this.setState({
            subscription_id: evt.target.value,
        })
    }

    changePlatform = (evt) => {
        this.setState({
            platform: evt.target.value
        })
    }

    changeAmount = (evt) => {
        this.setState({
            card_num: evt.target.value,
        })   
    }

    changeCard = (evt) => {
        this.setState({
            card_num: evt.target.value,

        })
    }

    changeEmail = (evt) => {
        this.setState({
            email: evt.target.value,

        })
    }

    changeUsername = (evt) => {
        this.setState({
            username: evt.target.value,
        })
    }

    changePassword = (evt) => {
        this.setState({
            password: evt.target.value
        })
    }

    send = (event) => {
        console.log("here")
        ws.emit('json', {command: "INSERT",
                         platform: this.state.platform,
                         username: this.state.username,
                         password: this.state.password,
                         email: this.state.email,
                        });
        this.close();  
        this.showingModal(true);
    }
  
  
    render() {  
        return (  
            <Fragment>  
                <Modal show={this.props.showModalPopup} onHide={this.close}  
                    size="lg"  
                    aria-labelledby="contained-modal-title-vcenter"  
                    centered  
                >   
                    <form onSubmit={this.send}>
                    <Modal.Body>  
                        <TextField variant='filled' label='subscription ID' onChange={this.changeID}/>
                        <TextField variant='filled' label='platform' onChange={this.changePlatform}/>
                        <TextField variant='filled' label='Next Amount Due' onChange={this.changeAmount}/>
                        <TextField variant='filled' label='Card Number' onChange={this.changeCard}/>
                        <TextField variant='filled' label='Email' onChange={this.changeEmail}/>
                        <TextField variant='filled' label='Username' onChange={this.changeUsername}/>
                        <TextField variant='filled' label='Password' onChange={this.changePassword}/>
                        <Button variant="contained" type="submit">Submit</Button>
                    </Modal.Body>  
                    </form>
                    <div className="signUp">  
                            <Button variant='outlined'  onClick={() => this.showingModal(true)}>Close</Button>
                    </div> 
  
                </Modal >  
            </Fragment >  
  
        );  
    }  
}  
  
export default Popup;  