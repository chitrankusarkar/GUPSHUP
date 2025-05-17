import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx"; // 🔄 Used instead of IoSearch
import User from "./User";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserThunk } from "../../store/slice/user/user.thunk.js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const UserSideBar = () => {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [users, setUsers] = useState([])
    const { otherUsers, userProfile } = useSelector(state => state.userReducer)
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        if (!searchValue) {
            setUsers(otherUsers)
        } else {
            setUsers(
                otherUsers.filter(user =>
                    user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
                    user.fullName.toLowerCase().includes(searchValue.toLowerCase())
                )
            )
        }
    }, [searchValue, otherUsers])

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
        }
    };

    return (
        <div className="max-w-[20em] w-full h-screen flex flex-col">
            <div className="flex items-center gap-5 px-4 mt-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                    <span className="text-white font-bold text-xl py-2">G</span>
                </div>
                <div className="text-2xl font-bold text-white tracking-wide pl-1">
                    GUPSHUP
                </div>
            </div>

            <div className="px-1 py-4">
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
            <div className="h-full overflow-y-auto px-3 flex flex-col gap-2">
                {users?.map(userDetails => (
                    <User key={userDetails?._id} userDetails={userDetails} />
                ))}
            </div>
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-4">
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring ring-offset-2 ">
                            <img src={userProfile?.avatar} />
                        </div>
                    </div>
                    <h2>{userProfile?.username}</h2>
                </div>
                <div className="p-2">
                    <button onClick={handleLogout} className="text-white hover:text-red-500 cursor-pointer">
                        <LuLogOut size={24} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserSideBar;
