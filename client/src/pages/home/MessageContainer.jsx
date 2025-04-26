import React from "react";
import User from "./User";
import Message from "./Message";
import { IoIosSend } from "react-icons/io";

const MessageContainer = () => {
    return (
        <>
            <div className="h-screen w-full flex flex-col">
                <div className="p-3 border-b border-b-white/10">
                    <User />
                </div>

                <div className="h-full overflow-auto p-2">
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                </div>
                <div className="w-full p-2">
                    <div className="flex items-center bg-gray-800 rounded-lg px-2">
                        <input
                            type="text"
                            placeholder="Type here..."
                            className="flex-grow bg-transparent input-md outline-none text-white p-2"
                        />
                        <button className="text-blue-500 p-2 hover:text-blue-700">
                            <IoIosSend size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessageContainer;
