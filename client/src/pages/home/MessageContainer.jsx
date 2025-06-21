import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCommentDots } from "react-icons/fa";
import SendMessage from "./SendMessage";
import Message from "./Message";
import User from "./User";
import { setSelectedUser } from "../../store/slice/user/user.slice";
import moment from "moment";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import { clearMessages } from "../../store/slice/message/message.slice";

const MessageContainer = ({ onOpenSidebarMobile }) => {
  const dispatch = useDispatch();
  const { selectedUser, userProfile } = useSelector((state) => state.userReducer);
  const { messages, hasMore } = useSelector((state) => state.messageReducer);
  const [page, setPage] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const scrollContainerRef = useRef(null);
  const isFetching = useRef(false);

  const loadMessages = async (initial = false) => {
    if (!selectedUser?._id || isFetching.current || (!hasMore && !initial)) return;
    isFetching.current = true;

    await dispatch(getMessageThunk({ receiverId: selectedUser._id, page }));
    isFetching.current = false;

    if (initial) {
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (selectedUser?._id) {
      setPage(1);
      dispatch(clearMessages());
      loadMessages(true);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (page > 1) loadMessages();
  }, [page]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (el && el.scrollTop < 50 && hasMore && !isFetching.current) {
      setPage((prev) => prev + 1);
    }
  };

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

  const groupedMessages = {};
  messages.forEach((msg) => {
    const now = moment();
    const msgMoment = moment(msg.createdAt);
    let key = msgMoment.format("MMMM D");
    if (now.isSame(msgMoment, 'day')) key = "Today";
    else if (now.clone().subtract(1, 'day').isSame(msgMoment, 'day')) key = "Yesterday";
    if (!groupedMessages[key]) groupedMessages[key] = [];
    groupedMessages[key].push(msg);
  });

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
        <User userDetails={selectedUser} isStatic={true} onCloseMobile={onOpenSidebarMobile} />
        <div className="md:hidden ml-auto">
          <button onClick={onOpenSidebarMobile} className="text-sm underline">Users</button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-auto p-2 space-y-4"
      >
        {Object.entries(groupedMessages).map(([sectionTitle, msgs]) => (
          <div key={sectionTitle}>
            <div className="text-center text-xs text-white/50 py-2 sticky top-0 bg-gray-900 z-10">
              {sectionTitle}
            </div>
            {msgs.map((msg) => (
              <Message key={msg._id} messageDetails={msg} />
            ))}
          </div>
        ))}
        {isTyping && (
          <div className="px-4 text-sm text-white/70 italic">Typing...</div>
        )}
      </div>

      <SendMessage />
    </div>
  );
};

export default MessageContainer;
