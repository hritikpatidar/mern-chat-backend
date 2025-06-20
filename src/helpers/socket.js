import { Server as SocketIOServer } from "socket.io";
import groupCollection from "../modules/group.js";
import messageCollection from "../modules/Messages.js";
import groupMessageCollection from "../modules/GroupMessage.js";
import Conversation from "../modules/Conversation.js";

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: `http://localhost:${process.env.PORT}`,
            methods: ["GET", "POST"],
            credentials: true,
        },
        connectionStateRecovery: {}
    });

    const userSocketMap = new Map();
    const userLastSeenMap = new Map();

    const getUserStatus = () => {
        const onlineUsers = Array.from(userSocketMap.keys());
        const lastSeen = {};
        for (const [userId, timestamp] of userLastSeenMap.entries()) {
            if (!onlineUsers.includes(userId)) {
                lastSeen[userId] = timestamp;
            }
        }
        return { onlineUsers, lastSeen };
    };



    const disconnect = (socket) => {
        for (const [userId, socketIds] of userSocketMap.entries()) {
            const index = socketIds.indexOf(socket.id);
            if (index !== -1) {
                socketIds.splice(index, 1);
                if (socketIds.length === 0) {
                    userSocketMap.delete(userId);
                    userLastSeenMap.set(userId, new Date().toISOString());
                    console.log("Socket disConnected:", socket.id);
                }
                break;
            }
        }
        console.log("online", getUserStatus())
        io.emit("updateUserStatus", getUserStatus());

    };

    io.on("connection", (socket) => {
        console.log("Socket Connected:", socket.id);

        socket.on("registerUser", (userId) => {
            if (!userSocketMap.has(userId)) {
                userSocketMap.set(userId, []);
            }
            userSocketMap.get(userId).push(socket.id);
            userLastSeenMap.delete(userId);
            io.emit("updateUserStatus", getUserStatus());
        });


        socket.on("groupConversation", async (userId) => {
            try {
                let conversations = await groupCollection
                    .find({ members: { $in: [userId] } })
                    .populate({
                        path: 'members',
                        select: 'name email phone_no profile'
                    })
                    .lean();

                if (!conversations.length) {
                    io.emit("groupConversationResults", {
                        status: false,
                        message: "No groups found.",
                    });
                    return;
                }


                const value = await Promise.all(conversations.map(async (conversation) => {

                    const unReadMessages = await groupMessageCollection.countDocuments({
                        groupId: conversation._id,
                        status: "sent",
                    })

                    const latestMessage = await groupMessageCollection.findOne({ groupId: conversation._id }).sort({
                        createdAt: -1,
                    }).lean();

                    if (latestMessage) {
                        const lastMessage = {
                            message: latestMessage.message,
                            unReadMessages,
                            timestamp: latestMessage.createdAt || new Date(0),
                            isSenderId: latestMessage.senderId,
                            messageType: latestMessage.messageType,
                        }
                        return {
                            ...conversation,
                            lastMessageDetails: lastMessage
                        }
                    } else {
                        return conversation
                    }
                }))
                io.to(socket.id).emit("groupConversationResults", { value });
            } catch (error) {
                console.error("Error fetching conversations:", error);
                io.emit("groupConversationResults", {
                    status: false,
                    message: "Internal server error.",
                });
            }
        });

        socket.on("conversation", async (userId) => {
            try {
                let conversations = await Conversation.find({ members: { $in: [userId] } })
                    .populate({
                        path: 'members',
                        select: 'name email phone_no profile'
                    })
                    .lean();
                if (!conversations.length) {
                    io.emit("conversationResults", {
                        status: false,
                        message: "No groups found.",
                    });
                    return;
                }

                const value = await Promise.all(conversations.map(async (conversation) => {

                    const unReadMessages = await messageCollection.countDocuments({
                        conversation_id: conversation._id,
                        isReceiverId: userId,
                        status: "sent",
                    })

                    const latestMessage = await messageCollection.findOne({ conversation_id: conversation._id }).sort({
                        createdAt: -1,
                    }).lean();

                    if (latestMessage) {
                        const lastMessage = {
                            message: latestMessage.message,
                            unReadMessages,
                            timestamp: latestMessage.createdAt || new Date(0),
                            isSenderId: latestMessage.isSenderId,
                            messageType: latestMessage.messageType,
                        }
                        return {
                            ...conversation,
                            lastMessageDetails: lastMessage
                        }
                    } else {
                        return conversation
                    }
                }))

                io.to(socket.id).emit("conversationResults", { value });
            } catch (error) {
                console.error("Error fetching conversations:", error);
                io.emit("conversationResults", {
                    status: false,
                    message: "Internal server error.",
                });
            }
        });

        socket.on('sendMessage', async (msgContent) => {
            const {
                conversationId,
                isSenderId,
                isReceiverId,
                groupId,
                message,
                fileUrl,
                messageType, // "text" | "image" | "video" | "file"
                status,      // "sent" | "delivered" | "read"
            } = msgContent;

            if (!messageType) {
                console.log(`Message type is empty. Message not sent.`);
                return;
            }

            // Common utility
            const sendMessageToSockets = (sockets, event, data) => {
                sockets.forEach((socketId) => io.to(socketId).emit(event, data));
            };

            if (groupId) {
                // 👥 GROUP CHAT
                const addedGroupMsg = await groupMessageCollection.create({
                    groupId,
                    senderId: isSenderId,
                    message,
                    fileUrl,
                    messageType,
                    status,
                });

                const groupData = {
                    groupId,
                    _id: addedGroupMsg._id,
                    isSenderId,
                    message,
                    fileUrl,
                    messageType,
                    status,
                };

                const group = await groupCollection.findById({ _id: groupId });
                if (!group) return;

                // Emit to all members
                for (let memberId of group.members) {
                    const memberSockets = userSocketMap.get(memberId.toString()) || [];
                    sendMessageToSockets(memberSockets, "receiveMessage", groupData);
                }

            } else {
                //create conversation if it doesn't exist
                let getConversation = await Conversation.findOne({
                    members: { $all: [isSenderId, isReceiverId] }
                }).lean();

                if (!getConversation) {
                    let newConversation = await Conversation.create({
                        members: [isSenderId, isReceiverId]
                    });
                    getConversation = newConversation.toObject();
                    io.emit("conversationCreateResult", newConversation.toObject());
                }
                // 💬 SINGLE CHAT
                const addedMessage = await messageCollection.create({
                    conversation_id: getConversation._id,
                    isSenderId,
                    isReceiverId,
                    message,
                    fileUrl,
                    messageType,
                    status,
                });

                const unReadMessages = await messageCollection.countDocuments({
                    conversation_id: conversationId,
                    isReceiverId: isSenderId,
                    status: "sent",
                });


                const messageData = {
                    conversation_id: conversationId,
                    _id: addedMessage._id,
                    isSenderId,
                    isReceiverId,
                    message,
                    fileUrl,
                    messageType,
                    status,
                    unReadMessages,
                };

                const receiverSockets = userSocketMap.get(isReceiverId) || [];
                const senderSockets = userSocketMap.get(isSenderId) || [];
                sendMessageToSockets(senderSockets, "receiveMessage", messageData);
                sendMessageToSockets(receiverSockets, "receiveMessage", messageData);
            }
        });

        socket.on("disconnect", () => disconnect(socket));
    });
};

export default setupSocket;
