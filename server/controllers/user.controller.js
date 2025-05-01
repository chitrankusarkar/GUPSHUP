import User from '../models/user.model.js'
import { asyncHandler } from '../utilities/asyncHandler.utility.js'
import { errorHandler } from '../utilities/errorHandler.utility.js'

export const login = (req, res, next) => {
    res.send("Login route")
}

export const signup = asyncHandler(async (req, res, next) => {
        const { fullName, username, email, password, gender } = req.body;
        
        if(!fullName || !username || !email || !password || !gender) {
            return next(new errorHandler("All fields are required!", 400))
        }   
        const user = await User.findOne({$or: [{ username }, { email }]});
        if(user) {
            return next(new errorHandler("User already exists!", 400))
        }
        const newUser = await User.create({
            fullName,
            username,
            email,
            password,
            gender,
            avatar
        })

        res.status(200).json({
            success: true,
            responseData:{
                newUser
            }
        })
        res.send("Hi, thanks for signing up")
})