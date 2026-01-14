import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../Models/User.js";


const authUser = express.Router();

// Middleware to validate request body
const auth = (req, res, next) => {
    const { name, email, password ,pic} = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({
            success: false,
            message: "Name, email and password are required"
        });
    }
    next();
};

authUser.post("/login",async (req, res) => {
    try {
        const checkUser = await User.findOne({ email: req.body.email });
        if (!checkUser) {
           return res.status(404).json({
                success: false,
                error: " User Not Found",
                // message:"Not Found"
            })
        }
        const validPass= await bcrypt.compare(req.body.password,checkUser.password);
        if(!validPass) return res.status(400).json({message:"Invalid Password"});

        const token=jwt.sign({id:checkUser._id,username:checkUser.name},process.env.JWT_SECRET,{
            expiresIn:"30d"
        })
        return res.json({
            success: true,
            message: "Logged Succusfull",
            data: {
                name: checkUser.name,
                email: checkUser.email,
                token: token
            }
        })

    } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message
    });
}
})
// Signup route
authUser.post("/signup", auth, async (req, res) => {
    try {
        // check if email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists, please login"
            });
        }
        const {name,email,password}=req.body;
        const hashedpassword= await bcrypt.hash(password,10);
        // create new user
        const user = new User({name,email,password:hashedpassword});
        await user.save();

        return res.json({
            success: true,
            message: "User registered successfully",
            data: {
                // id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error("Signup error:", err.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
});

export default authUser;
