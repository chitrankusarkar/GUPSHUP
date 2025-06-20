import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const Message = ({ messageDetails }) => {
    const msgRef = useRef(null);
    const { userProfile, selectedUser } = useSelector(state => state.userReducer);

    useEffect(() => {
        if (msgRef.current) {
            msgRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    const isSender = userProfile?._id === messageDetails?.senderId;
    const avatar = isSender ? userProfile?.avatar : selectedUser?.avatar;

    const formatTime = (timestamp) => {
        const now = moment();
        const msgTime = moment(timestamp);
        if (now.isSame(msgTime, 'day')) return msgTime.format('h:mm A');
        if (now.clone().subtract(1, 'day').isSame(msgTime, 'day')) return `Yesterday, ${msgTime.format('h:mm A')}`;
        return msgTime.format('MMMM D, h:mm A');
    };

    return (
        <div
            ref={msgRef}
            className={`chat ${isSender ? "chat-end" : "chat-start"}`}
        >
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="User Avatar" src={avatar} />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50">{formatTime(messageDetails?.createdAt)}</time>
            </div>
            <div className="chat-bubble">
                {messageDetails?.message}
                {isSender && (
                    <span
                        className={`text-[10px] ml-2 ${
                            messageDetails?.status === "read" ? "text-blue-500" : "text-gray-400"
                        }`}
                    >
                        {messageDetails?.status === "read"
                            ? "✓✓"
                            : messageDetails?.status === "delivered"
                            ? "✓✓"
                            : "✓"}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Message;
