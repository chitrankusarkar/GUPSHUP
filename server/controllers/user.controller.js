import User from '../models/user.model.js'
import { asyncHandler } from '../utilities/asyncHandler.utility.js'
import { errorHandler } from '../utilities/errorHandler.utility.js'

export const login = (req, res, next) => {
    res.send("Login route")
}

export const signup = asyncHandler((req, res, next) => {
        const { fullName, username, email, password, gender } = req.body;
        
        if(!fullName || !username || !email || !password || !gender) {
            return next(new errorHandler("All fields are required!", 400))
        }
        res.send("Hi, thanks for signing up")
})