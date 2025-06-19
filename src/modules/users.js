import { mongoose } from "../helpers/db_connection.js";

const user_schema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: null
        },
        nick_name: {
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
        measurement_unit: {
            type: String,
            default: null
        },
        weight: {
            type: Object,
            default: null
        },
        height: {
            type: Object,
            default: null
        },
        body_mass_index: {
            type: String,
            default: null
        },
        language: {
            type: String,
            default: null
        },
        ethnicity: {
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
        is_expires: {
            type: Number,
            default: null
        },
        terra_user_id: {
            type: String,
            default: null
        },
        terra_connections: {
            type: Boolean,
            default: false
        },
        login_with_id: {
            type: String,
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
        stripe_customer: {
            type: String,
            default: null
        },
        active_plan: {
            type: String,
            default: "Free", //Expired, Free, Subscription name
        },
        phone_flg: {
            type: String,
            default: null
        },
        country_flg: {
            type: String,
            default: null
        },
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        block: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        who_can_find_me: {
            type: String,
            default: null
        },
        who_can_see_my_personal_data: {
            type: String,
            default: null
        },
        who_can_view_my_profile: {
            type: String,
            default: null
        },
        who_can_message_me: {
            type: String,
            default: null
        },
        who_can_leave_comment: {
            type: String,
            default: null
        },
        share_my_activities_with: {
            type: String,
            default: null
        },
        share_my_challenges_with: {
            type: String,
            default: null
        },
        share_my_events_with: {
            type: String,
            default: null
        },
        share_my_achivements_with: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const userCollection = mongoose.model('users', user_schema);

export default userCollection;