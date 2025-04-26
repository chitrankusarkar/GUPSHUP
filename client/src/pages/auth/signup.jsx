import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { Link } from "react-router-dom";

const Signup = () => {
    const [signupData, setSignupData] = useState ({
            fullName : "",
            username: "",
            password : "",
            confirmPassword : "",
        });
    
    const handleInputChange = (e) => {
        setSignupData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    };
    return (
        <div className="min-h-screen flex justify-center items-center p-5">
            <div className="max-w-[50rem] w-full flex flex-col gap-2 bg-base-200 p-6 rounded-lg">
                <h2 className="text-2xl text-center pb-6">Please Signup :)</h2>
                <label className="input input-bordered flex items-center gap-2">
                    <FaUser />
                    <input type="text" name = "fullName" className="grow" placeholder="Full Name" onChange={handleInputChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <FaUser />
                    <input type="text" name = "username" className="grow" placeholder="username" onChange={handleInputChange}/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <TbLockPassword />
                    <input type="password" name = "password" className="grow" placeholder="Password" onChange={handleInputChange}/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <TbLockPassword />
                    <input type="password" name = "confirmPassword" className="grow" placeholder="Confirm Password" onChange={handleInputChange}/>
                </label>
                <button className="btn btn-dash">Signup</button>
                <p>
                    Already have an account? &nbsp;
                    <Link to='/login' className="underline">Log In</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;