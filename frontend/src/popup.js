import React, { Component, Fragment } from 'react';  
import { Modal } from 'react-bootstrap';  
import ws from "./socketConfig"
//enit this
class ModalPopup extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            showModal: false  
        };  
    }  
  
    isShowModal = (status) => {  
        this.handleClose();  
        this.setState({ showModal: status });  
    }  

  
    handleClose = () => {  
        this.props.onPopupClose(false);  
    }  
  
  
    render() {  
        return (  
            <Fragment>  
                <Modal show={this.props.showModalPopup} onHide={this.handleClose}  
                    size="lg"  
                    aria-labelledby="contained-modal-title-vcenter"  
                    centered  
                >   
                    <Modal.Body>  
                        <hr />  
                        <div className="signUp">  
                            <p>Platform Name:</p>  
                            <button type="button" className="link-button" onClick={() => this.isShowModal(true)}> Close</button>

                        </div>  
                    </Modal.Body>  
  
                </Modal >  
            </Fragment >  
  
        );  
    }  
}  
  
export default ModalPopup;  