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
            platform: ""
        };  
    }  
  
    isShowModal = (status) => {  
        this.handleClose();  
        this.setState({ showModal: status });  
    }  

  
    handleClose = () => {  
        this.props.onPopupClose(false);  
    }  

    handlePlatformChange = (evt) => {
        this.setState({
            platform: evt.target.value
        })
    }

    send = (event) => {
        console.log("here")
        ws.emit('json', {command: "INSERT",
                         platform: this.state.platform});
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
                        <TextField variant='filled' label='platform' onChange={this.handlePlatformChange}/>
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