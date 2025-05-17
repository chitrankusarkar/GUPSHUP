import React, { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import { FaCommentDots } from "react-icons/fa"; // Nice icon for chat apps
import SendMessage from "./SendMessage";

const MessageContainer = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(state => state.userReducer);
    const { messages } = useSelector(state => state.messageReducer)
    // console.log(selectedUser)
    useEffect(() => {
        if (selectedUser?._id) {
            dispatch(getMessageThunk({ receiverId: selectedUser._id }));
        }
    }, [selectedUser]);

    if (!selectedUser) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white text-center px-4">
                <div>
                    <div className="flex justify-center mb-4 text-blue-400">
                        <FaCommentDots size={60} />
                    </div>
                    <h1 className="text-2xl font-semibold mb-2">No Conversation Selected</h1>
                    <p className="text-white/60 text-sm">Select a user from the sidebar to start chatting</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex flex-col">
            <div className="p-3 border-b border-b-white/10">
                <User userDetails={selectedUser} isStatic={true} />
            </div>

            <div className="h-full overflow-auto p-2">
                {messages?.map(messageDetails=>{
                    return (
                        <Message key = {messageDetails?._id}messageDetails = {messageDetails}/>
                    )
                })}
            </div>
                <SendMessage/>
        </div>
    );
};

export default MessageContainer;
