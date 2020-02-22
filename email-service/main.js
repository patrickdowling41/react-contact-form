var nodemailer = require('nodemailer')
let aws = require('aws-sdk')
const Joi = require('@hapi/joi')
let bodyParser = require('body-parser')
let express = require('express')
let app = express()

// configure AWS SDK 
aws.config.loadFromPath('../../config.json')

// parse application/json
app.use(bodyParser.json())

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01'
    })
})

// post request to send through email to user who filled in contact form.
app.post('/api/v1/email-confirmation', (req, res) => {
    if(validateRequest(req.body))
    {
        sendResponseEmail(transporter, req.body.email)
        res.status(200).send('Success.')
    }
    else
    {
        res.status(400).send('Failure. Request body invalid.')
    }
})

// post request to send through email to my own email
app.post('/api/v1/email-info', (req, res) => {
    if(validateRequest(req.body))
    {
        sendContactFormInfo(transporter, req.body.name, req.body.email, req.body.phoneNo, req.body.message)
        res.status(200).send('Success.')
    }
    else
    {
        res.status(400).send('Failure. Request body invalid.')
    }   
})

// send email to user, validating they have completed the contact form.
function sendResponseEmail(transporter, email) {

    const contactMessage = `Thank you for contacting me, I will be in touch with you as soon as possible.
        
Kind Regards,
Patrick Dowling`

    transporter.sendMail({
        from: 'noreply@patdowling.net',
        to: email,
        subject: 'Thank you for contacting me!',
        text: contactMessage
    }, (err, info) => {
        console.log("Error: " + err)
        console.log("Info: " + info)
    })
}

// send email to myself, sending me their contact information.
function sendContactFormInfo(transporter, name, email, phoneNo, message) {

    const contactMessage = `Contacted by ${name}
Contact email left: ${email}
Contact number left:  ${phoneNo}
Message left: ${message}`

    transporter.sendMail({
        from: 'noreply@patdowling.net',
        to: 'patrick@patdowling.net',
        subject: 'New contact request',
        text: contactMessage
    }, (err, info) => {
        console.log("Error: " + err)
        console.log("Info: " + info)
    })
}

// checks post request against schema to ensure format is correct.
function validateRequest(data) {
    // define the validation schema
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNo: Joi.string().required(),
        message: Joi.string()
    });

    const {error, value} = schema.validate(data)
    if (error)
    {
        return false
    }
    else
    {
        return true
    }
}

app.listen(3000)