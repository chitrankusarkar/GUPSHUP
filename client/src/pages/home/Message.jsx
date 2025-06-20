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
                    {moment(messageDetails?.createdAt).format("h:mm A")} {/* ✅ formatted time */}
                </time>
            </div>
            <div className="chat-bubble">{messageDetails?.message}</div>
        </div>
    );
};

export default Message;
