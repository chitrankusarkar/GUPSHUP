import React from "react";
import { IoSearch } from "react-icons/io5";
import User from "./User";
const UserSideBar = () => {
    return (
        <div className="max-w-[20em] w-full h-screen flex flex-col">
            <div className="flex items-center gap-5 px-4 py-1">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                    <span className="text-white font-bold text-xl">G</span>
                </div>
                <div className="text-2xl font-bold text-white tracking-wide pl-1">
                    GUPSHUP
                </div>
            </div>

            <div className="px-1 py-4">
                <label class="input input-bordered flex items-center gap-2">
                    <input type="text" class="grow" placeholder="Search" />
                    <IoSearch />
                </label>
            </div>
            <div className="h-full overflow-y-auto px-3">
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
            </div>
            <div className="flex items-center justify-between p-3">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-9 rounded-full ring ring-offset-2 ">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <button class="btn btn-active btn-neutral px-3">Logout</button>

            </div>
        </div>
    )
}
export default UserSideBar