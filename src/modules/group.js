import { mongoose } from "../helpers/db_connection.js";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    invites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }], // pending invites
    image: {
        type: String,
        default: null
    },
    conversationType: {
        type: String,
        default: "group"
    }
},
    {
        timestamps: true
    }
);

const groupCollection = mongoose.model('group', groupSchema);


export default groupCollection;