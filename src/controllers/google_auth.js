import dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';


import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import Users from "../modules/users.js";


const initGoogleAuth = (app) => {
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                const existing_user = await Users.findOne({ login_with_id: profile.id });
                if (existing_user) {
                    return done(null, profile);
                }
                else {
                    let set_data = {
                        login_with: "Google",
                        login_with_id: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value
                    }
                    let new_user = await Users.create(set_data);
                    return done(null, new_user);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    app.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("google", { failureRedirect: process.env.GOOGLE_CANCLE_URL }),
        async (req, res) => {
            const user = req.user;
            const token = jwt.sign(
                {
                    user_id: user._id,
                    phone_no: user.phone_no,
                    email: user.email,
                },
                process.env.SECRET_KEY,
                { expiresIn: process.env.EXPIRE_KEY }
            );
            res.redirect(`myapp://login?token=${token}`);
        }
    );
};

export default initGoogleAuth;