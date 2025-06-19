import jwt from "jsonwebtoken";
import joi from "joi";
import sha1 from "sha1";

import { sendEmail, send_email_verification } from "../helpers/nodemailer.js";
import calculateAge from "../helpers/age_calculater.js";
import { uploadImageOnS3 } from "../helpers/s3_bucket.js";
import userCollection from "../modules/users.js";





const signup = async (req, res) => {
    try {
        const schema = joi.object({
            name: joi.string().required().messages({
                'string.empty': 'Name Cannot Be An Empty Field',
                'any.required': 'Name Is A Required Field',
            }),
            email: joi.string().email().required().messages({
                'string.empty': 'Email Cannot Be An Empty Field',
                'string.email': 'Email Must Be A Valid Email',
                'any.required': 'Email Is A Required Field',
            }),
            phone_no: joi.string().required().messages({
                'string.empty': 'Phone No Cannot Be An Empty Field',
                'any.required': 'Phone No Is A Required Field',
            }),
            dob: joi.string().required().messages({
                'string.empty': 'Date Of Birth Cannot Be An Empty Field',
                'any.required': 'Date Of Birth Is A Required Field',
            }),
            gender: joi.string().required().messages({
                'string.empty': 'Gender Cannot Be An Empty Field',
                'any.required': 'Gender Is A Required Field',
            }),
            password: joi.string().required().messages({
                'string.empty': 'Password Cannot Be An Empty Field',
                'any.required': 'Password Is A Required Field',
            }),
            phone_flg: joi.optional()
        });
        await schema.validateAsync(req.body);
        const { name, email, phone_no, dob, gender, password, phone_flg } = req.body;
        const set_data = { name, email, phone_no, dob, gender, password, phone_flg };
        set_data.password = sha1(password);
        set_data.login_with = "Self";
        set_data.age = calculateAge(dob);
        let random_code = Math.floor(1000 + Math.random() * 9000);
        let mailData = {
            to: email,
            subject: 'Email Verification Code',
            otp: random_code
        }
        // const existing_user = await userCollection.findOne({ email });
        const existing_user = await userCollection.findOne({ $or: [{ email }, { phone_no }] });
        if (existing_user) {
            if (existing_user.is_verify === false) {
                if (existing_user.email === null) {
                    delete set_data.phone_no;
                    set_data.otp = random_code;
                    await userCollection.updateOne({ phone_no }, set_data);
                    await send_email_verification(mailData);
                    return res.status(200).json({ status: false, message: "OTP has been Sent to Your Registered Email", is_verify: existing_user.is_verify });
                }
                else {
                    delete set_data.email;
                    set_data.otp = random_code;
                    await userCollection.updateOne({ email }, set_data);
                    await send_email_verification(mailData);
                    return res.status(200).json({ status: false, message: "OTP has been Sent to Your Registered Email", is_verify: existing_user.is_verify });
                }
            }
            else {
                return res.status(400).json({ status: false, message: "Email Or Phone No Already Exists.", is_verify: existing_user.is_verify });
            }
        }
        await userCollection.create(set_data);
        await userCollection.updateOne({ email }, { otp: random_code });
        await send_email_verification(mailData)
        return res.status(200).json({ status: true, message: "OTP has been Sent to Your Registered Email" });
    } catch (error) {
        console.error("signup error", error);
        if (error.isJoi) {
            return res.status(400).json({ status: false, message: error.details[0].message });
        }
        return res.status(500).json({ status: false, message: "Internal Server Error", error });
    }
}



const login = async (req, res) => {
    try {
        const schema = joi.object({
            email: joi.string().email().required().messages({
                'string.empty': 'Email Cannot Be An Empty Field',
                'string.email': 'Email Must Be A Valid Email',
                'any.required': 'Email Is A Required Field',
            }),
            password: joi.string().required().messages({
                'string.empty': 'Password Cannot Be An Empty Field',
                'any.required': 'Password Is A Required Field',
            }),
        });
        await schema.validateAsync(req.body);
        const find_user = await userCollection.findOne({ email: req.body.email });
        if (find_user && find_user.is_verify === true) {
            if (find_user.password === sha1(req.body.password)) {
                const token = jwt.sign(
                    {
                        user_id: find_user._id,
                        phone_no: find_user.phone_no,
                        email: find_user.email,
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: process.env.EXPIRE_KEY }
                );
                res.status(200).json({ status: true, message: "Logged in Successfully", token: token });
            }
            else {
                return res.status(400).json({ status: false, message: "Incorrect password, please check" });
            }
        }
        else {
            return res.status(404).json({ status: false, message: "Email does Not Exist." });
        }
    } catch (error) {
        console.error("login error", error);
        if (error.isJoi) {
            return res.status(400).json({ status: false, message: error.details[0].message });
        }
        return res.status(500).json({ status: false, message: "Internal Server Error", error });
    }
}



const forget_password = async (req, res) => {
    try {
        const schema = joi.object({
            email: joi.string().email().required().messages({
                'string.empty': 'Email Cannot Be An Empty Field',
                'string.email': 'Email Must Be A Valid Email',
                'any.required': 'Email Is A Required Field',
            })
        });
        await schema.validateAsync(req.body);
        let email = req.body.email;
        const find_user = await userCollection.findOne({ email });
        if (find_user) {
            let random_code = Math.floor(1000 + Math.random() * 9000);
            const is_expires = Date.now() + 60 * 1000;
            await userCollection.updateOne({ email }, { otp: random_code, is_expires });
            let mailData = {
                to: email,
                subject: 'Password Reset Verification Code',
                otp: random_code
            }
            await sendEmail(mailData)
            res.status(200).json({ status: true, message: "OTP has been Sent to Your Registered Email", email: email });
        }
        else {
            res.status(404).json({ status: false, message: "Email does Not Exist" });
        }
    } catch (error) {
        console.error("forget_password error", error);
        if (error.isJoi) {
            return res.status(400).json({ status: false, message: error.details[0].message });
        }
        return res.status(500).json({ status: false, message: "Internal Server Error", error });
    }
}



const verify_otp = async (req, res) => {
    try {
        const schema = joi.object({
            email: joi.string().email().required().messages({
                'string.empty': 'Email Cannot Be An Empty Field',
                'any.required': 'Email Is A Required Field',
                'string.email': 'Email Must Be A Valid Email Address'
            }),
            otp: joi.number().required().messages({
                'number.empty': 'OTP Cannot Be An Empty Field',
                'any.required': 'OTP Is A Required Field',
            }),
        });
        await schema.validateAsync(req.body);
        let email = req.body.email;
        let otp = req.body.otp
        const find_user = await userCollection.findOne({ email });
        if (find_user) {
            if (find_user && find_user.otp == otp) {
                if (find_user.is_verify === false) {
                    await userCollection.updateOne({ email }, { is_verify: true });
                    const token = jwt.sign(
                        {
                            user_id: find_user._id,
                            phone_no: find_user.phone_no,
                            email: find_user.email,
                        },
                        process.env.SECRET_KEY,
                        { expiresIn: process.env.EXPIRE_KEY }
                    );
                    res.status(200).json({ status: true, message: "Signed Up Successfully", email: email, token: token });
                }
                else {
                    if (Number(Date.now()) > Number(find_user.is_expires)) {
                        res.status(400).json({ status: false, message: "OTP is expired" });
                    }
                    else {
                        await userCollection.updateOne({ email }, { is_verify: true });
                        res.status(200).json({ status: true, message: "OTP Verified", email: email });
                    }
                }
            }
            else {
                res.status(400).json({ status: false, message: "Incorrect code, try again" });
            }
        }
        else {
            res.status(404).json({ status: false, message: "Email does Not Exist" });
        }
    } catch (error) {
        console.error("verify_otp error", error);
        if (error.isJoi) {
            return res.status(400).json({ status: false, message: error.details[0].message });
        }
        return res.status(500).json({ status: false, message: "Internal Server Error", error });
    }
}



const resend_otp = async (req, res) => {
    try {
        const schema = joi.object({
            email: joi.string().email().required().messages({
                'string.empty': 'Email Cannot Be An Empty Field',
                'string.email': 'Email Must Be A Valid Email',
                'any.required': 'Email Is A Required Field',
            })
        });
        await schema.validateAsync(req.body);
        let email = req.body.email;
        const find_user = await userCollection.findOne({ email });
        if (find_user) {
            let random_code = Math.floor(1000 + Math.random() * 9000);
            await userCollection.updateOne({ email }, { otp: random_code });
            let mailData = {
                to: email,
                subject: 'Email Verification Code',
                otp: random_code
            }
            await send_email_verification(mailData)
            res.status(200).json({ status: true, message: "OTP has been Sent to Your Registered Email", email: email });
        }
        else {
            res.status(404).json({ status: false, message: "Email does Not Exist" });
        }
    } catch (error) {
        console.error("forget_password error", error);
        if (error.isJoi) {
            return res.status(400).json({ status: false, message: error.details[0].message });
        }
        return res.status(500).json({ status: false, message: "Internal Server Error", error });
    }
}



const reset_password = async (req, res) => {
    try {
        const schema = joi.object({
            email: joi.string().email().required().messages({
                'string.empty': 'Email Cannot Be An Empty Field',
                'any.required': 'Email Is A Required Field',
                'string.email': 'Email Must Be A Valid Email Address'
            }),
            password: joi.string().required().messages({
                'string.empty': 'Password Cannot Be An Empty Field',
                'any.required': 'Password Is A Required Field'
            })
        });
        await schema.validateAsync(req.body);
        const email = req.body.email;
        const password = sha1(req.body.password);
        const find_user = await userCollection.findOne({ email });
        if (find_user) {
            await userCollection.updateOne({ email }, { password });
            res.status(200).json({ status: true, message: "Password Updated Successfully" });
        }
        else {
            res.status(404).json({ status: false, message: "Email does Not Exist" });
        }
    } catch (error) {
        console.log("reset_password error", error);
        return res.status(500).json({ status: false, message: "Internal Server Error", error });
    }
}



const profile = async (req, res) => {
    try {
        const user_id = req.user_id;
        if (!user_id) {
            return res.status(400).json({ message: "User ID is Required" });
        }
        const user_profile = await userCollection.findOne(
            { _id: user_id },
            { password: 0, fcm_token: 0, otp: 0 }
        );
        if (!user_profile) {
            return res.status(404).json({ status: false, message: "User Profile Not Found" });
        }
        if (user_profile.weight && user_profile.height) {
            const { weight, height, measurement_unit: isMetric, dob } = user_profile;
            const value_1 = weight.value_1 || 0;
            const value_2 = weight.value_2 || 0;
            const value_11 = height.value_11 || 0;
            const value_12 = height.value_12 || 0;
            let totalWeightLbs = 0;
            let totalHeightInches = 0;
            if (isMetric === "Metric") {
                const totalWeightKg = value_1 + value_2 / 1000;
                totalWeightLbs = totalWeightKg * 2.20462;
                totalHeightInches = value_11 / 2.54;
            } else if (isMetric === "Imperial") {
                totalWeightLbs = value_1 * 14 + value_2;
                totalHeightInches = value_11 * 12 + value_12;
            }
            if (totalWeightLbs > 0 && totalHeightInches > 0) {
                const bmi = (totalWeightLbs * 703) / totalHeightInches ** 2;
                user_profile.body_mass_index = bmi.toFixed(2);
                await userCollection.updateOne({ _id: user_id }, { body_mass_index: user_profile.body_mass_index });
            }
        }
        const age = calculateAge(user_profile.dob);
        await userCollection.updateOne({ _id: user_id }, { age });
        user_profile.age = age;
        res.status(200).json({ status: true, message: "User Profile", data: user_profile });
    } catch (error) {
        console.error("Profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const update_profile = async (req, res) => {
    try {
        if (typeof req.body.phone_no === 'string') {
            req.body.phone_no = JSON.parse(req.body.phone_no);
        }
        if (typeof req.body.country === 'string') {
            req.body.country = JSON.parse(req.body.country);
        }
        const user_id = req.user_id;
        let setData = {}
        if (req.body.name) {
            setData.name = req.body.name
        }
        if (req.body.nick_name) {
            setData.nick_name = req.body.nick_name
        }
        if (req.body.phone_no) {
            const phoneData = req.body.phone_no
            if (phoneData.phone_no) {
                setData.phone_no = phoneData.phone_no
            }
            if (phoneData.phone_flg) {
                setData.phone_flg = phoneData.phone_flg
            }
        }
        if (req.body.dob) {
            setData.dob = req.body.dob
        }
        if (req.body.gender) {
            setData.gender = req.body.gender
        }
        if (req.body.measurement_unit) {
            setData.measurement_unit = req.body.measurement_unit
        }
        if (req.body.weight) {
            setData.weight = JSON.parse(req.body.weight)
        }
        if (req.body.height) {
            setData.height = JSON.parse(req.body.height)
        }
        if (req.body.language) {
            setData.language = req.body.language
        }
        if (req.body.ethnicity) {
            setData.ethnicity = req.body.ethnicity
        }
        if (req.body.country) {
            const countryData = req.body.country
            if (countryData.country) {
                setData.country = countryData.country
            }
            if (countryData.country_flg) {
                setData.country_flg = countryData.country_flg
            }
        }
        if (user_id) {
            if (req.files) {
                // setData.profile = await upload_img(req.files.profile, req);
                setData.profile = await uploadImageOnS3(req.files.profile);
            }
            const user_rofile = await userCollection.findOne({ _id: user_id });
            if (user_rofile) {
                const updateProfile = await userCollection.updateOne({ _id: user_id }, setData);
                if (updateProfile) {
                    res.status(200).json({ status: true, message: "Profile Updated Successfully" });
                }
                else {
                    res.status(400).json({ status: false, message: "Please Try Again" });
                }
            }
            else {
                res.status(404).json({ status: false, message: "Profile Not Found" });
            }
        }
        else {
            res.status(400).json({ message: "Token Is Required" });
        }
    } catch (error) {
        console.log('update_profile error', error);
        return res.status(500).json({ status: false, message: "Internal Server Error", error });
    }
}





export {
    signup,
    login,
    forget_password,
    verify_otp,
    resend_otp,
    reset_password,
    profile,
    update_profile,
}