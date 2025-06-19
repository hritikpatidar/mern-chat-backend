import passport from "passport";
import { Strategy as AppleStrategy } from "passport-apple";
import fs from "fs";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const initAppleAuth = (app) => {
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
        new AppleStrategy(
            {
                clientID: "com.smartfitpro.web",
                teamID: "7PA3NZ5P34",
                keyID: "Q884YWWLN5",
                callbackURL: "https://dev.smartfitpro.co/api/auth/apple/callback",
                privateKey: fs.readFileSync('public/AuthKey_Q884YWWLN5.p8'), // e.g., './AuthKey.p8'
                // clientID: process.env.APPLE_CLIENT_ID,
                // teamID: process.env.APPLE_TEAM_ID,
                // keyID: process.env.APPLE_KEY_ID,
                // callbackURL: process.env.APPLE_CALLBACK_URL,
                // privateKey: fs.readFileSync(process.env.APPLE_PRIVATE_KEY_PATH), // e.g., './AuthKey.p8'
                response_mode: "form_post",      // form_post is safer
                scope: ["name", "email"],
            },
            (accessToken, refreshToken, idToken, profile, done) => {
                console.log("accessToken", accessToken)
                profile.accessToken = accessToken;
                // profile = decoded JWT
                return done(null, profile);
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    app.get("/auth/apple", passport.authenticate("apple"));

    app.post(
        "/auth/apple/callback",
        passport.authenticate("apple", {
            successRedirect: "https://dev.smartfitpro.co",
            failureRedirect: "https://dev.smartfitpro.co/login",
        })
    );
};

export default initAppleAuth;
