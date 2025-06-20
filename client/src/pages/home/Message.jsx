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
    const formatMessageTime = (timestamp) => {
        const now = moment();
        const time = moment(timestamp);

        if (now.isSame(time, 'day')) {
            return time.format('h:mm A'); 
        } else if (now.clone().subtract(1, 'day').isSame(time, 'day')) {
            return 'Yesterday';
        } else if (now.diff(time, 'days') < 7) {
            return time.format('dddd'); 
        } else {
            return time.format('MMM D'); 
        }
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
                <time className="text-xs opacity-50">
                    {formatMessageTime(messageDetails?.createdAt)} 
                </time>
            </div>
            <div className="chat-bubble">{messageDetails?.message}</div>
        </div>
    );
};

export default Message;
