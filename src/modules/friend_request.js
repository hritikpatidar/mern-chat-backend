import { mongoose } from "../helpers/db_connection.js";


const friend_request_schema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
},
  {
    timestamps: true
  }
);

const friendRequestCollection = mongoose.model('friend_request', friend_request_schema);

export default friendRequestCollection;
