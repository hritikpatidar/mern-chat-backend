import twilio from 'twilio';
dotenv.config();
import dotenv from "dotenv";


const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;


const sendSMS = (data, phone_no) => {
    console.log('phone_no', phone_no.replace(/\s/g, ''));
    const client = twilio(accountSid, authToken);
    const message = `
        You've been invited to join "${data.challenge_name}" on SmartFit!

        📅 ${data.start_date} to ${data.end_date}
        📍 ${data.challenge_location.city}, ${data.challenge_location.country}
        – SmartFit Pro
        `;

    // 🏁 Goal: ${data.challenge_summary.distance}, ${data.challenge_summary.vertical_ascent}, ${data.challenge_summary.time_bound}
    // Join: ${data.join_link}

    client.messages
        .create({
            body: message,
            from: process.env.TWILIO_FROM,
            to: phone_no.replace(/\s/g, '')
            // +44 7778 592598 +18777804236
        })
        .then(msg => console.log('SMS Sent:', msg.sid))
        .catch(err => console.error('SMS Error:', err));
}

export default sendSMS 