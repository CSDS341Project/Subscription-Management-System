import React, { Component, Fragment } from 'react';  
import { Modal } from 'react-bootstrap';  
import ws from "./socketConfig"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//enit this
class ModalPopup extends Component {  
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
  
    isShowModal = (status) => {  
        this.handleClose();  
        this.setState({ showModal: status });  
    }  

  
    handleClose = () => {  
        this.props.onPopupClose(false);  
    }  

    handleIDChange = (evt) => {
        this.setState({
            subscription_id: evt.target.value,
        })
    }

    handlePlatformChange = (evt) => {
        this.setState({
            platform: evt.target.value
        })
    }

    handleAmountChange = (evt) => {
        this.setState({
            card_num: evt.target.value,
        })   
    }

    handleCardChange = (evt) => {
        this.setState({
            card_num: evt.target.value,

        })
    }

    handleEmailChange = (evt) => {
        this.setState({
            email: evt.target.value,

        })
    }

    handleUsernameChange = (evt) => {
        this.setState({
            username: evt.target.value,
        })
    }

    handlePasswordChange = (evt) => {
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
                         email: this.state.email});
        this.handleClose();  
        this.isShowModal(true);
    }
  
  
    render() {  
        return (  
            <Fragment>  
                <Modal show={this.props.showModalPopup} onHide={this.handleClose}  
                    size="lg"  
                    aria-labelledby="contained-modal-title-vcenter"  
                    centered  
                >   
                    <form onSubmit={this.send}>
                    <Modal.Body>  
                        <TextField variant='filled' label='subscription ID' onChange={this.handleIDChange}/>
                        <TextField variant='filled' label='platform' onChange={this.handlePlatformChange}/>
                        <TextField variant='filled' label='Next Amount Due' onChange={this.handleAmountChange}/>
                        <TextField variant='filled' label='Card Number' onChange={this.handleCardChange}/>
                        <TextField variant='filled' label='Email' onChange={this.handleEmailChange}/>
                        <TextField variant='filled' label='Username' onChange={this.handleUsernameChange}/>
                        <TextField variant='filled' label='Password' onChange={this.handlePasswordChange}/>






                        <Button variant="contained" type="submit">Submit</Button>

                    </Modal.Body>  
                    </form>
                    <div className="signUp">  
                            <Button variant='outlined'  onClick={() => this.isShowModal(true)}> Close</Button>
                    </div> 
  
                </Modal >  
            </Fragment >  
  
        );  
    }  
}  
  
export default ModalPopup;  