import dotenv from "dotenv";
dotenv.config();
import fs from "fs"
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});


const sendEmail = async (data) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.USER_MAIL,
            to: data.to,
            subject: data.subject,
            html: `<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
                    <h2 style="color: #007BFF; text-align: center;">Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>
                        You recently requested to reset your password for your account. Please use the OTP below to reset your password. 
                        This OTP is valid for a single use and will expire in 1 minutes.
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <p style="font-size: 18px; font-weight: bold; color: #007BFF;">Your OTP: ${data.otp}</p>
                    </div>
                    <p>If you did not request a password reset, no further action is required. You can safely ignore this email.</p>
                    <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
                    <div style="text-align: center;">
                        <p style="font-size: 14px; color: #555;">Need Help? Contact us at <a href="mailto:support@smartfit.com" style="color: #007BFF;">support@netlink.com</a></p>
                    </div>
                    <p style="text-align: center; margin-top: 20px;">Best Regards,<br /><strong>SmartFit Pro Team</strong></p>
                </div>`
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
};



const send_email_verification = async (data) => {
    try {
        const info = await transporter.sendMail({
            from: `"SmartFit Pro" <${process.env.USER_MAIL}>`,
            to: data.to,
            subject: data.subject || "Email Verification OTP",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
                    <h2 style="color: #007BFF; text-align: center;">Verify Your Email Address</h2>
                    <p>Hello,</p>
                    <p>
                        Thank you for signing up. To complete your registration, please use the OTP below to verify your email address.
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <p style="font-size: 22px; font-weight: bold; color: #007BFF; background: #eef2ff; padding: 10px; border-radius: 5px; display: inline-block;">
                            ${data.otp}
                        </p>
                    </div>
                    <p>If you did not sign up, please ignore this email.</p>
                    <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
                    <div style="text-align: center;">
                        <p style="font-size: 14px; color: #555;">Need help? Contact us at 
                            <a href="mailto:support@netlink.com" style="color: #007BFF; text-decoration: none;">support@netlink.com</a>
                        </p>
                    </div>
                    <p style="text-align: center; margin-top: 20px;">Best Regards,<br />
                        <strong>SmartFit Pro Team</strong>
                    </p>
                </div>
            `
        });
    } catch (error) {
        console.error('Error Sending Verification Email:', error);
    }
};



const send_challenge_invite_email = async (data) => {
    try {
        const info = await transporter.sendMail({
            from: `"SmartFit Pro" <${process.env.USER_MAIL}>`,
            to: data.to,
            subject: data.subject || "You're Invited to Join a SmartFit Challenge!",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
                    <h2 style="color: #4CAF50; text-align: center;">You're Invited to Join a SmartFit Challenge!</h2>
                    <p>Hello,</p>
                    <p>
                        <strong>${data.inviter || 'A SmartFit user'}</strong> has invited you to participate in an exciting challenge on SmartFit.
                        It's your chance to stay active, motivated, and take on something new!
                    </p>

                    <div style="background: #eef9f1; padding: 15px; border-radius: 6px; margin: 20px 0;">
                        <p><strong>Challenge Name:</strong> ${data.challenge_name}</p>
                        <p><strong>Challenge Type:</strong> ${data.challenge_type}</p>
                        <p><strong>Duration:</strong> ${data.start_date} to ${data.end_date}</p>
                    </div>

                    <div style="background: #fff3cd; padding: 15px; border-radius: 6px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Challenge Summary:</h3>
                        <ul style="padding-left: 20px;">
                            <li><strong>Distance Goal:</strong> ${data.challenge_summary?.distance || 'N/A'}</li>
                            <li><strong>Vertical Ascent:</strong> ${data.challenge_summary?.vertical_ascent || 'N/A'}</li>
                            <li><strong>Time Bound:</strong> ${data.challenge_summary?.time_bound || 'N/A'}</li>
                            <li><strong>Event:</strong> ${data.challenge_summary?.event || 'N/A'}</li>
                        </ul>
                    </div>

                    <div style="background: #e8f0fe; padding: 15px; border-radius: 6px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Location:</h3>
                        <p>
                            ${data.challenge_location?.address_line_1 || ''}<br />
                            ${data.challenge_location?.address_line_2 || ''}<br />
                            ${data.challenge_location?.city || ''}, ${data.challenge_location?.country || ''} - ${data.challenge_location?.post_code || ''}
                        </p>
                    </div>

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${data.join_link}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px;">Join Challenge</a>
                    </div>

                    <p>If you're not a SmartFit user yet, just sign up using this email, and you’ll automatically be added to the challenge.</p>
                    <p>If this wasn't expected, feel free to ignore it.</p>

                    <hr style="border: 0; border-top: 1px solid #ddd; margin: 30px 0;" />
                    <div style="text-align: center; font-size: 14px; color: #555;">
                        Need help? Contact us at 
                        <a href="mailto:support@netlink.com" style="color: #007BFF;">support@netlink.com</a>
                    </div>
                    <p style="text-align: center; margin-top: 20px;">Best regards,<br />
                        <strong>SmartFit Pro Team</strong>
                    </p>
                </div>
            `
        });
    } catch (error) {
        console.error('Error Sending Invitation Email:', error);
    }
};



export { sendEmail, send_email_verification, send_challenge_invite_email };
