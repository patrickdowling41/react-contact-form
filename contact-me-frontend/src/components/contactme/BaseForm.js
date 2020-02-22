import React, { Component } from 'react'
import { Formik, Field, Form} from 'formik'
import * as yup from 'yup'
import Modal from 'react-modal'
import './contactMe.scss'

const validationSchema = yup.object({
    name: yup
    .string()
    .required()
    .min(2, "Please include your full name"),
    email: yup
    .string()
    .required()
    .email("Please include a valid email"),
    phoneNo: yup
    .string()
    .required()
    // Regular expression for valid phone number
    .matches(/^(?:\+?([0-9]{2}))? ?(?:\((?=.*\)))?([0,1]?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,"Please include a valid phone number")
});

Modal.setAppElement('#root')

class BaseForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal () {
        this.setState({ modalIsOpen: true });
    }
    
    closeModal () {
        this.setState({ modalIsOpen: false });
    }

    render() {
        
        return ( 
            <>
                    <Modal 
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className="contact-modal"
                    overlayClassName="contact-submit-overlay"
                    >
                    </Modal>

                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            phoneNo: "",
                            message: ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={({}) => {
                            console.log(this.state.showModal)
                            this.openModal()
                            console.log(this.state.showModal)
                        }}
                    >
                    {({ 
                        values, 
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        }) => (
                        <Form>
                            <div className="form-element">
                                <label className="form-label">Full Name*</label>
                                <Field
                                    type="text"
                                    name="name"
                                    className={touched.name && errors.name ? "field-error" : "contact-text-field"}
                                />
                                <div className={touched.name && errors.name ? "icon-alert" : "icon-hidden"}>!</div>
                            </div>
                            
                            <div className="form-element">
                                <label className="form-label">Email*</label>
                                <Field 
                                    type="text"
                                    name="email"
                                    className={touched.email && errors.email ? "field-error" : "contact-text-field"}
                                />
                            <div className={touched.email && errors.email ? "icon-alert" : "icon-hidden"}>!</div>
                            </div>

                            <div className="form-element">
                                <label className="form-label">Phone No.*</label>
                                <Field 
                                    type="text"
                                    name="phoneNo"
                                    className={touched.phoneNo && errors.phoneNo ? "field-error" : "contact-text-field"}
                                />
                                <div className={touched.phoneNo && errors.phoneNo ? "icon-alert" : "icon-hidden"}>!</div>
                            </div>

                            <div className="form-element">
                                <label className="form-label">Message</label>
                                <textarea 
                                    name="message" 
                                    className="contact-message-field"
                                    value={values.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            
                            <button type="submit" id="contact-submit">Send</button>

                        </Form>
                    )} 

                    </Formik>

                    
            </>
        )
    }
}
export default BaseForm