import React, { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { socket } = useSelector((state) => state.socketReducer);

  const [message, setMessage] = useState("");
  const typingTimeout = useRef(null);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedUser?._id) return;
    dispatch(sendMessageThunk({ receiverId: selectedUser._id, message }));
    setMessage("");

    if (socket) socket.emit("stopTyping", { to: selectedUser._id });
  };

  const handleTyping = () => {
    if (!socket || !selectedUser?._id) return;

    socket.emit("typing", { to: selectedUser._id });

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", { to: selectedUser._id });
    }, 2000); 
  };

  return (
    <div className="w-full p-2">
      <div className="flex items-center bg-gray-800 rounded-lg px-2">
        <input
          type="text"
          placeholder="Type here..."
          className="flex-grow bg-transparent input-md outline-none text-white p-2"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
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
