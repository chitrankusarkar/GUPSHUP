import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import User from "./User";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from "../../store/slice/user/user.thunk.js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from "react-router-dom"; // <-- added

const UserSideBar = ({ onCloseMobile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // <-- added
    const [searchValue, setSearchValue] = useState('');
    const [users, setUsers] = useState([]);
    const { otherUsers, userProfile } = useSelector(state => state.userReducer);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        if (!searchValue) {
            setUsers(otherUsers);
        } else {
            setUsers(
                otherUsers.filter(user =>
                    user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
                    user.fullName.toLowerCase().includes(searchValue.toLowerCase())
                )
            );
        }
    }, [searchValue, otherUsers]);

    const handleLogout = async () => {
        const result = await MySwal.fire({
            title: '<p style="font-size:1.2rem;">Log out of GUPSHUP?</p>',
            text: "You will need to log in again to access your account.",
            icon: 'warning',
            background: '#1f2937',
            color: '#f3f4f6',
            iconColor: '#facc15',
            showCancelButton: true,
            confirmButtonColor: '#6366f1',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'rounded-xl px-6 py-5',
                title: 'text-lg font-semibold',
                confirmButton: 'px-5 py-2',
                cancelButton: 'px-5 py-2'
            },
            width: '28em'
        });

        if (result.isConfirmed) {
            await dispatch(logoutUserThunk());
            MySwal.fire({
                title: 'Logged out',
                text: 'You have successfully logged out.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#1f2937',
                color: '#f3f4f6'
            });
            navigate("/login"); // <-- added
        }
    };

    return (
        <div className="w-full md:max-w-[20em] h-full md:h-screen flex flex-col bg-gray-800 text-white shadow-lg z-20">
            <div className="md:hidden flex justify-between items-center px-4 py-3 bg-gray-900">
                <div className="text-xl font-bold">GUPSHUP</div>
                <button onClick={onCloseMobile} className="text-white">
                    <RxCross2 size={24} />
                </button>
            </div>

            <div className="hidden md:flex items-center gap-5 px-4 mt-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                    <span className="text-white font-bold text-xl py-2">G</span>
                </div>
                <div className="text-2xl font-bold tracking-wide">GUPSHUP</div>
            </div>

            <div className="px-3 py-4">
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                        type="text"
                        className="grow bg-transparent outline-none"
                        placeholder="Search"
                    />
                    {searchValue && (
                        <button
                            type="button"
                            onClick={() => setSearchValue('')}
                            className="text-white hover:text-red-400"
                        >
                            <RxCross2 size={20} />
                        </button>
                    )}
                </label>
            </div>

            {/* ✅ Updated to pass onCloseMobile */}
            <div className="h-full overflow-y-auto px-3 flex flex-col gap-2">
                {users?.map(userDetails => (
                    <User key={userDetails?._id} userDetails={userDetails} onCloseMobile={onCloseMobile} />
                ))}
            </div>

            <div className="flex items-center justify-between p-3 border-t border-white/10">
                <div className="flex items-center gap-4">
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring ring-offset-2">
                            <img src={userProfile?.avatar} />
                        </div>
                    </div>
                    <h2 className="text-sm">{userProfile?.username}</h2>
                </div>
                <button onClick={handleLogout} className="text-white hover:text-red-500">
                    <LuLogOut size={22} />
                </button>
            </div>
        </div>
    );
};

export default UserSideBar;
