const otpGenerator = require('otp-generator');
const { client } = require('../config/twillio');

const { MessagingResponse } = require('twilio').twiml;

exports.sentOTP = (phone) => {
    try {
        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        client.messages.create({
                body: `${otp}`,
                from: process.env.TWILIO_PHONE,
                to: phone
            })
            .then(() => console.log("OTP Sent"))
            .catch(error => console.log("OTP Failed", error))
        // const twiml = new MessagingResponse();
        // twiml.message(`Your OTP is ${otp}`);
        return { status: 200, otp };
    } catch (error) {
        console.log("OTP Failed", error);
        return { status: 500, error };
    }
}

exports.sentMessage = (phone, ticketId) => {
    try {
        client.messages.create({
                body: `Your ticket ${ticketId} has been resolved successfully. If any issue please let us know. Happy Helping`,
                from: process.env.TWILIO_PHONE,
                to: phone
            })
            .then(() => console.log("Message Sent"))
            .catch(error => console.log("Message Failed", error))
        return { status: 200 };
    } catch (error) {
        console.log("Message Failed", error);
        return { status: 500, error };
    }
}