import React from 'react';
import './Modal.css';

export default class Modal extends React.Component {
    state = {
        isOpen: false
    }
    render() {
        return (
            <React.Fragment>    
                <button onClick={() => this.setState({isOpen: true})}>open</button>
                { this.state.isOpen && <div className='modal'>   
                    <div className='modal-body'> 
                        <h1>modal title</h1> 
                        <p>modal desc</p>  
                        <button onClick={() => this.setState({isOpen: false})}>close</button>
                    </div>
                </div>}
            </React.Fragment>
        )
    }
}