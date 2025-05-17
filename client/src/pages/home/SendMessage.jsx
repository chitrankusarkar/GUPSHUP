import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";

const SendMessage = () => {
    const dispath = useDispatch()
    const { selectedUser } = useSelector((state) => state.userReducer)
    const [message, setMessage] = useState("")
    const handleSendMessage = () => {
        dispath(sendMessageThunk({ receiverId: selectedUser?._id, message }))
        setMessage('');
    }
    return (
        <>
            <div className="w-full p-2">
                <div className="flex items-center bg-gray-800 rounded-lg px-2">
                    <input
                        type="text"
                        placeholder="Type here..."
                        className="flex-grow bg-transparent input-md outline-none text-white p-2 "
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage} className="text-blue-500 p-2 hover:text-blue-700">
                        <IoIosSend size={24} />
                    </button>
                </div>
            </div>
        </>
    )
}
export default SendMessage;