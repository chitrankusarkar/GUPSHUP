import express from 'express'
import { getProfile, login, logout, signup } from '../controllers/user.controller.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js';
const router = express.Router(); 

router.post("/login", login);
router.post("/signup", signup)
router.get("/get-profile", isAuthenticated, getProfile)
router.post("/logout", isAuthenticated, logout)
export default router;