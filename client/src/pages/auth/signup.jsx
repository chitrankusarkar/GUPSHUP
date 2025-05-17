import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
import { PiGenderIntersexThin } from "react-icons/pi";
import { FaInfoCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUserThunk, getOtherUsersThunk } from "../../store/slice/user/user.thunk";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPasswordPolicy, setShowPasswordPolicy] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signupData, setSignupData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "" 
    });

    const handleInputChange = (e) => {
        setSignupData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const { isAuthenticated } = useSelector(
        (state) => state.userReducer
    )

    useEffect(() => {
        if (isAuthenticated) navigate('/')
    }, [])

    const [isSigningUp, setIsSigningUp] = useState(false);
    const handleSignup = async () => {
        const fullNameRegex = /^[a-zA-Z\s]{2,}$/;
        if (!fullNameRegex.test(signupData.fullName)) {
            toast.error('Full name must be at least 2 characters!');
            return;
        }

        const usernameRegex = /^[a-z][a-z0-9._]{2,15}$/;
        if (!usernameRegex.test(signupData.username)) {
            toast.error('Username must be 3–16 characters and lowercase!');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(signupData.email)) {
            toast.error('Please enter a valid email address!');
            return;
        }

        if (!signupData.password) {
            toast.error('Enter password!');
            return;
        }

        const password = signupData.password;

        if (password.length < 6 || password.length > 12 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            toast.error('Enter a valid password');
            return;
        }

        if (signupData.password !== signupData.confirmPassword) {
            toast.error('Password and confirm password should be the same');
            return;
        }

        // Gender validation
        if (!signupData.gender) {
            toast.error('Please select your gender');
            return;
        }

        if (isSigningUp) return;

        setIsSigningUp(true);
        const response = await dispatch(signUpUserThunk(signupData));

        if (signUpUserThunk.fulfilled.match(response)) {
            toast.success('Account created successfully!');
        } else {
            toast.error('Signup failed. Please try again.');
            console.error("Signup failed:", response.payload);
        }

        setTimeout(() => {
            setIsSigningUp(false);
        }, 3000);

        if (response?.payload?.success) {
            dispatch(getOtherUsersThunk())
            navigate('/');
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
                    <input type="text" name="username" className="grow" placeholder="Username" onChange={handleInputChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <MdAlternateEmail />
                    <input type="text" name="email" className="grow" placeholder="E-mail" onChange={handleInputChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <TbLockPassword />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="grow"
                        placeholder="Password"
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        className="ml-2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button
                        type="button"
                        className="ml-2 text-gray-500"
                        onClick={() => setShowPasswordPolicy(!showPasswordPolicy)}
                    >
                        <FaInfoCircle />
                    </button>
                </label>
                {showPasswordPolicy && (
                    <div className="text-sm text-gray-600 mt-2">
                        <ul>
                            <li>Password must be between 6 and 12 characters long</li>
                            <li>At least one lowercase letter required</li>
                            <li>At least one uppercase letter required</li>
                            <li>At least one digit required</li>
                            <li>At least one special character required (e.g., !@#$%^&*)</li>
                        </ul>
                    </div>
                )}
                <label className="input input-bordered flex items-center gap-2">
                    <TbLockPassword />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className="grow"
                        placeholder="Confirm Password"
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        className="ml-2 text-gray-500"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
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
    );
};

export default Signup;
