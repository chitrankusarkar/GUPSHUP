import React, { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import { FaCommentDots } from "react-icons/fa";
import SendMessage from "./SendMessage";
import { setSelectedUser } from "../../store/slice/user/user.slice";

const MessageContainer = ({ onOpenSidebarMobile }) => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(state => state.userReducer);
    const { messages } = useSelector(state => state.messageReducer);

    useEffect(() => {
        if (selectedUser?._id) {
            dispatch(getMessageThunk({ receiverId: selectedUser._id }));
        }
    }, [selectedUser]);

    if (!selectedUser) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gray-900 text-white text-center px-4">
                <div className="flex justify-center mb-4 text-blue-400">
                    <FaCommentDots size={60} />
                </div>
                <h1 className="text-2xl font-semibold mb-2">No Conversation Selected</h1>
                <p className="text-white/60 text-sm">Select a user from the sidebar to start chatting</p>
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col bg-gray-900 text-white">
            <div className="flex items-center justify-between p-3 border-b border-b-white/10">
                <div className="md:hidden">
                    <button
                        className="text-white text-lg mr-2"
                        onClick={() => dispatch(setSelectedUser(null))}
                    >
                        ←
                    </button>
                </div>
                <User userDetails={selectedUser} isStatic={true} />

                <div className="md:hidden ml-auto">
                    <button onClick={onOpenSidebarMobile} className="text-sm underline">Users</button>
                </div>
            </div>


            <div className="flex-1 overflow-auto p-2">
                {messages?.map((messageDetails) => (
                    <Message key={messageDetails?._id} messageDetails={messageDetails} />
                ))}
            </div>
            <SendMessage />
        </div>
    );
};

export default MessageContainer;
