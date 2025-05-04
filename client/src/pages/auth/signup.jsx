import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
import { PiGenderIntersexThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { signUpUserThunk } from "../../store/slice/user/user.thunk";

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [signupData, setSignupData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "male"
    });

    const handleInputChange = (e) => {
        setSignupData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    };

    const [isSigningUp, setIsSigningUp] = useState(false);
    const handleSignup = async () => {
        if (signupData.password != signupData.confirmPassword) {
            toast.error('Password and confirm password should be same')
            return
        }
        if (isSigningUp) return;

        setIsSigningUp(true);
        const response = await dispatch(signUpUserThunk(signupData));

        if (signUpUserThunk.fulfilled.match(response)) {
            toast.success('Account created successfully!');
        } else {
            console.error("Signup failed:", response.payload);
        }

        setTimeout(() => {
            setIsSigningUp(false);
        }, 3000);
        if(response?.payload?.success) {
            navigate('/')
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-5">
            <div className="max-w-[50rem] w-full flex flex-col gap-2 bg-base-200 p-6 rounded-lg">
                <h2 className="text-2xl text-center pb-6">Please Signup :)</h2>
                <label className="input input-bordered flex items-center gap-2">
                    <FaUser />
                    <input type="text" name="fullName" className="grow" placeholder="Full Name" onChange={handleInputChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <FaUser />
                    <input type="text" name="username" className="grow" placeholder="username" onChange={handleInputChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <MdAlternateEmail />
                    <input type="text" name="email" className="grow" placeholder="E-mail" onChange={handleInputChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <TbLockPassword />
                    <input type="password" name="password" className="grow" placeholder="Password" onChange={handleInputChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <TbLockPassword />
                    <input type="password" name="confirmPassword" className="grow" placeholder="Confirm Password" onChange={handleInputChange} />
                </label>
                <div className="input input-bordered flex items-center gap-5">
                    <PiGenderIntersexThin />
                    <label htmlFor="male" className="flex gap-2 items-center">
                        <input id="male" type="radio" name="gender" value="male" className="radio cursor-pointer" onChange={handleInputChange} />
                        Male
                    </label>
                    <label htmlFor="female" className="flex gap-2 items-center">
                        <input id="female" type="radio" name="gender" value="female" className="radio cursor-pointer" onChange={handleInputChange} />
                        Female
                    </label>
                </div>
                <button onClick={handleSignup} className="btn btn-dash" disabled={isSigningUp}>
                    {isSigningUp ? "Signing up..." : "Signup"}
                </button>
                <p>
                    Already have an account? &nbsp;
                    <Link to='/login' className="underline">Log In</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;