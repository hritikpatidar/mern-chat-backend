import express from "express";
const router = express.Router();

import initGoogleAuth from "../controllers/google_auth.js";

import { decodedToken } from "../helpers/user_jwt.js";

import {
    signup,
    login,
    forget_password,
    verify_otp,
    reset_password,
    profile,
    resend_otp,
    update_profile,
    create_group

} from "../controllers/user_controller.js";

router.post('/signup', signup);
router.post('/login', login);
router.post('/forget-password', forget_password);
router.post('/verify-otp', verify_otp);
router.post('/resend-otp', resend_otp)
router.post('/reset-password', reset_password);
router.get("/profile", decodedToken, profile);
router.put('/update-profile', decodedToken, update_profile);
router.post('/create-group', decodedToken, create_group);

initGoogleAuth(router);


export default router;