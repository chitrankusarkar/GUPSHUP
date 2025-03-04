import React from "react";
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="min-h-screen flex justify-center items-center p-5">
            <div className="max-w-[50rem] w-full flex flex-col gap-2 bg-base-200 p-6 rounded-lg">
                <h2 className="text-2xl text-center pb-6">Please Signup :)</h2>
                <label class="input input-bordered flex items-center gap-2">
                    <FaUser />
                    <input type="text" class="grow" placeholder="Full Name" />
                </label>
                <label class="input input-bordered flex items-center gap-2">
                    <FaUser />
                    <input type="text" class="grow" placeholder="username" />
                </label>
                <label class="input input-bordered flex items-center gap-2">
                    <TbLockPassword />
                    <input type="password" class="grow" placeholder="Password"/>
                </label>
                <label class="input input-bordered flex items-center gap-2">
                    <TbLockPassword />
                    <input type="password" class="grow" placeholder="Confirm Password"/>
                </label>
                <button class="btn btn-dash">Signup</button>
                <p>
                    Already have an account? &nbsp;
                    <Link to='/login' className="underline">Log In</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;