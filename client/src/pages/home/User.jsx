import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from "../../store/slice/user/user.slice";

const User = ({ userDetails, isStatic = false }) => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(state => state.userReducer)
    const handleUserClick = () => {
        if (!isStatic) {
            dispatch(setSelectedUser(userDetails));
        }
    }
    const isSelected = userDetails?._id === selectedUser?._id;

    return (
        <div
            onClick={handleUserClick}
            className={`flex gap-6 items-center rounded-lg py-1 px-2 ${!isStatic ? 'hover:bg-gray-600 cursor-pointer' : ''
                } ${isSelected && !isStatic ? 'bg-gray-600' : ''}`}
        >
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <img src={userDetails?.avatar} />
                </div>
            </div>
            <div>
                <h2 className="line-clamp-1">{userDetails?.fullName}</h2>
                <p className="text-xs">{userDetails?.username}</p>
            </div>
        </div>
    )
}
export default User