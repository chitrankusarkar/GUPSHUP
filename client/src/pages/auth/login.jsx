import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { Link } from "react-router-dom";

const Login = () => {
    const [loginData, setLoginData] = useState ({
        username : "",
        password : "",
    });

const handleInputChange = (e) => {
    setLoginData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
    }))
};
    // console.log(loginData)
    return (
        <div className="min-h-screen w-full flex justify-center items-center p-5">
            <div className="max-w-[50rem] flex flex-col gap-2 bg-base-200 p-6 rounded-lg">
                <h2 className="text-2xl text-center pb-6">Please Login :)</h2>
                <label className="input input-bordered flex items-center gap-2">
                    <FaUser />
                    <input type="text" name="username" className="grow" placeholder="Username" onChange={handleInputChange}/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <TbLockPassword />
                    <input type="password" name="password" className="grow" placeholder="Password" onChange={handleInputChange}/>
                </label>
                <button className="btn btn-dash">Login</button>
                <p>
                    Don't have an account? &nbsp;
                    <Link to='/signup' className="underline">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;