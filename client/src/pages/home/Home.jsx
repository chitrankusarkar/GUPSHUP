import React, { useEffect, useState } from "react";
import UserSideBar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { initializeSocket, setOnlineUsers } from "../../store/slice/socket/socket.slice";
import { setNewMessage } from "../../store/slice/message/message.slice";
import { getOtherUsersThunk } from "../../store/slice/user/user.thunk";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userProfile, selectedUser } = useSelector((state) => state.userReducer);
  const { socket } = useSelector((state) => state.socketReducer);

  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getOtherUsersThunk());
      dispatch(initializeSocket(userProfile?._id));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;

    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage));
    });

    return () => {
      socket.close();
    };
  }, [socket]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full relative">
      {/* Sidebar (toggleable on small screens) */}
      <div className={`${showSidebar ? "block" : "hidden"} md:block absolute md:static z-10 w-full md:w-[20em] h-full`}>
        <UserSideBar onCloseMobile={() => setShowSidebar(false)} />
      </div>

      <div className="flex-1 relative h-full">
        <MessageContainer onOpenSidebarMobile={() => setShowSidebar(true)} />
      </div>
    </div>
  );
};

export default Home;
