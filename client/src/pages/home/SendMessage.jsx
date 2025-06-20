import React, { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";

const SendMessage = ({ socket }) => {
    const dispatch = useDispatch();
    const { selectedUser, userProfile } = useSelector((state) => state.userReducer);
    const [message, setMessage] = useState("");
    const typingTimeoutRef = useRef(null);

    const handleSendMessage = () => {
        if (!message.trim()) return;
        dispatch(sendMessageThunk({ receiverId: selectedUser?._id, message }));
        setMessage('');
        socket?.emit("stopTyping", { to: selectedUser?._id });
    };

    const handleTyping = (e) => {
        const val = e.target.value;
        setMessage(val);

        if (socket && selectedUser?._id) {
            socket.emit("typing", { to: selectedUser._id });

            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }

            typingTimeoutRef.current = setTimeout(() => {
                socket.emit("stopTyping", { to: selectedUser._id });
            }, 1000);
        }
    };

    return (
        <div className="w-full p-2">
            <div className="flex items-center bg-gray-800 rounded-lg px-2">
                <input
                    type="text"
                    placeholder="Type here..."
                    className="flex-grow bg-transparent input-md outline-none text-white p-2"
                    value={message}
                    onChange={handleTyping}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                    }}
                />
                <button onClick={handleSendMessage} className="text-blue-500 p-2 hover:text-blue-700">
                    <IoIosSend size={24} />
                </button>
            </div>
        </div>
    );
};

export default SendMessage;
