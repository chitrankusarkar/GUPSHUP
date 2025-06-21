import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import { getSocketId, io } from "../socket/socket.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
    const senderId = req.user._id;
    const receiverId = req.params.receiverId;
    const message = req.body.message;

    if (!senderId || !receiverId || !message) {
        return next(new errorHandler("All fields are required", 400));
    }

    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        });
    }

    let newMessage = await Message.create({
        senderId,
        receiverId,
        message,
        status: "sent",
    });

    if (newMessage) {
        conversation.messages.push(newMessage._id);
        await conversation.save();
    }

    const receiverSocketId = getSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);

        await Message.findByIdAndUpdate(newMessage._id, { status: "delivered" });
        newMessage.status = "delivered";
    }

    res.status(200).json({
        success: true,
        responseData: newMessage,
    });
});

export const getMessages = asyncHandler(async (req, res, next) => {
    const myId = req.user._id;
    const otherId = req.params.otherParticipantId;

    if (!myId || !otherId) {
        return next(new errorHandler("All fields are required", 400));
    }

    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const conversation = await Conversation.findOne({
        participants: { $all: [myId, otherId] },
    });

    if (!conversation) {
        return res.status(200).json({
            success: true,
            responseData: {
                messages: [],
                hasMore: false
            }
        });
    }

    const totalMessages = conversation.messages.length;

    const messages = await Message.find({ _id: { $in: conversation.messages } })
        .sort({ createdAt: -1 }) 
        .skip(skip)
        .limit(Number(limit));

    const finalMessages = messages.reverse(); 

    await Message.updateMany(
        {
            _id: { $in: finalMessages.map((m) => m._id) },
            receiverId: myId,
            status: { $in: ["sent", "delivered"] },
        },
        { $set: { status: "read" } }
    );

    finalMessages.forEach((msg) => {
        if (msg.receiverId.toString() === myId.toString()) {
            const senderSocketId = getSocketId(msg.senderId.toString());
            if (senderSocketId) {
                io.to(senderSocketId).emit("messageRead", {
                    messageId: msg._id,
                    readerId: myId
                });
            }
        }
    });

    res.status(200).json({
        success: true,
        responseData: {
            messages: finalMessages,
            hasMore: skip + limit < totalMessages
        }
    });
});
