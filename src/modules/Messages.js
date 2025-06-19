import { mongoose } from "../helpers/db_connection.js";

const MessageSchema = new mongoose.Schema(
     {
          conversation_id: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Conversation'
          },
          isSenderId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User'
          },
          isReceiverId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User'
          },
          message: {
               type: String
          },
          fileUrl: {
               type: String
          },
          messageType: {
               type: String,
               enum: ["text", "image", "video", "file"],
               required: true
          },
          status: {
               type: String,
               enum: ["sent", "delivered", "read"],
               default: "sent"
          }
     },
     {
          timestamps: true
     }
);

const messageCollection = mongoose.model('messages', MessageSchema);

export default messageCollection
