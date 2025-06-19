import { mongoose } from "../helpers/db_connection.js";

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
            require: true,
            ref: 'users'
        },
        message: {
            type: String,
            require: true
        },
        status: {
            type: String,
            default: "sent"
        },
        isChatDisabled: {
            type: Boolean,
            default: false
        },
        lastMessageDetails: {
            type: Object,
            require: false
        },
    },
    { timestamps: true }
);
const Conversation = mongoose.model('conversations', ConversationSchema);

export default Conversation;
