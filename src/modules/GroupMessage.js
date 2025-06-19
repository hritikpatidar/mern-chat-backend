import { mongoose } from "../helpers/db_connection.js";

const GroupMessageSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
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
    },
  },
  {
    timestamps: true
  }
);

const groupMessageCollection = mongoose.model('group_messages', GroupMessageSchema);

export default groupMessageCollection
