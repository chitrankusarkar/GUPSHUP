import React from "react";
import UserSideBar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
const Home = () => {
    return (
        <div className = 'flex'>
            <UserSideBar/>
            <MessageContainer/>
        </div>
    )
}

export default Home;