import { mongoose } from "../helpers/db_connection.js";

const user_schema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: null
        },
        user_name: {
            type: String,
            default: null
        },
        email: {
            type: String,
            default: null
        },
        phone_no: {
            type: String,
            default: null
        },
        dob: {
            type: String,
            default: null
        },
        age: {
            type: Number,
            default: null
        },
        gender: {
            type: String,
            require: false
        },
        language: {
            type: String,
            default: null
        },
        country: {
            type: String,
            default: null
        },
        profile: {
            type: String,
            default: null
        },
        password: {
            type: String,
            default: null
        },
        fcm_token: {
            type: String,
            default: null
        },
        otp: {
            type: Number,
            default: null
        },
        login_with: {
            type: String, //Self, Google, Facebook
            default: 'Self'
        },
        is_verify: {
            type: Boolean,
            default: false
        },
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        block: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
    },
    {
        timestamps: true
    }
);

const userCollection = mongoose.model('users', user_schema);

export default userCollection;