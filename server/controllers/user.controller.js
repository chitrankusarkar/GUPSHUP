import User from '../models/user.model.js'
import { asyncHandler } from '../utilities/asyncHandler.utility.js'
import { errorHandler } from '../utilities/errorHandler.utility.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = asyncHandler(async (req, res, next) => {
    const { fullName, username, email, password, gender } = req.body;
    if (!fullName || !username || !email || !password || !gender) {
        return next(new errorHandler("All fields are required!", 400))
    }
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
        return next(new errorHandler("User already exists!", 400))
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const avatarType = gender === "male" ? "boy" : "girl"
    const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`

    const newUser = await User.create({
        fullName,
        username,
        email,
        password: hashedPassword,
        gender,
        avatar
    })

    const tokenData = {
        _id: newUser?._id
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })

    res
        .status(200)
        .cookie("token", token, {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'None'
        })
        .json({
            success: true,
            responseData: {
                newUser,
                token
            }
        })
    res.send("Hi, thanks for signing up")
})

export const login = asyncHandler(async (req, res, next) => {
    const { fullName, username, email, password, gender } = req.body;
    if ((!username && !email) || !password) {
        return next(new errorHandler("Please enter credentials!", 400))
    }
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        return next(new errorHandler("Please enter a valid username or password!", 400))
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
        return next(new errorHandler("Incorrect password!", 400))
    }

    const tokenData = {
        _id: user?._id
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })


    res
        .status(200)
        .cookie("token", token, {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'None'
        })
        .json({
            success: true,
            responseData: {
                user,
                token
            }
        })
})

export const getProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id
    const profile = await User.findById(userId)

    res.status(200).json({
        success: true,
        responseData: profile
    })
})

export const logout = asyncHandler(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .json({
            success: true,
            message: "Logout successful!"
        })
})