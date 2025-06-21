import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";
const User = ({ userDetails, onCloseMobile = () => {}, isStatic = false }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);

  const handleUserSelect = () => {
    dispatch(setSelectedUser(userDetails));
    onCloseMobile();
  };

  return (
    <div
      onClick={!isStatic ? handleUserSelect : undefined}
      className={`flex items-center gap-4 p-3 hover:bg-gray-700 cursor-pointer ${
        selectedUser?._id === userDetails?._id && "bg-gray-700"
      }`}
    >
      <img
        src={userDetails?.avatar}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <p className="text-white font-medium">{userDetails?.fullName}</p>
        <p className="text-white/60 text-sm">@{userDetails?.username}</p>
      </div>
    </div>
  );
};

export default User;
