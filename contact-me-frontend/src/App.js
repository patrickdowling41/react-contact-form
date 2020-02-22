import React, { Component } from 'react'
import ContactMe from './components/contactme/ContactMe'
import './app.scss'
import './bootstrap.css'

class App extends Component {
  render() {
    return (
      <div className="contact-me-component">
        <ContactMe/>
      </div>
    )
  }
}

export default App;