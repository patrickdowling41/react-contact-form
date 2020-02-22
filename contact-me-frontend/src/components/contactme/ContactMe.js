import React, { Component } from 'react'
import BaseForm from './BaseForm'
import './contactMe.scss'

class ContactMe extends Component {
    render() {
        return (
            <>
                <div className="container contact-container">
                    <h2 id="contact-header">If you have any questions, send me through a message</h2>
                    <BaseForm/>
                </div>
            </>
        );
    }
}

export default ContactMe;