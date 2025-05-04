import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from "../../store/slice/user/user.thunk.js";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({
        username_or_email: "",
        password: "",
    });
    const { isAuthenticated } = useSelector(
        (state) => state.userReducer
    )

    useEffect(() => {
        if(isAuthenticated) navigate('/')
    }, [])
    const handleInputChange = (e) => {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    };

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const handleLogin = async () => {
        if (isLoggingIn) return;

        const { username_or_email, password } = loginData;
        if (!username_or_email.trim() || !password.trim()) {
            toast.error("Enter login details!");
            return;
        }
        setIsLoggingIn(true);

        const response = await dispatch(loginUserThunk(loginData));

        if (loginUserThunk.fulfilled.match(response)) {
            toast.success('Login Successful!');
        } else {
            console.error("Login failed:", response.payload);
        }

        setTimeout(() => {
            setIsLoggingIn(false);
        }, 3000);

        if (response?.payload?.success) {
            navigate('/')
        }
    };




    return (
        <div className="min-h-screen w-full flex justify-center items-center p-5">
            <div className="max-w-[50rem] flex flex-col gap-2 bg-base-200 p-6 rounded-lg">
                <h2 className="text-2xl text-center pb-6">Please Login :)</h2>
                <label className="input input-bordered flex items-center gap-2">
                    <FaUser />
                    <input type="text" name="username_or_email" className="grow" placeholder="Username or email" onChange={handleInputChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <TbLockPassword />
                    <input type="password" name="password" className="grow" placeholder="Password" onChange={handleInputChange} />
                </label>
                <button onClick={handleLogin} className="btn btn-dash" disabled={isLoggingIn}>
                    {isLoggingIn ? "Please wait..." : "Login"}
                </button>
                <p>
                    Don't have an account? &nbsp;
                    <Link to='/signup' className="underline">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;