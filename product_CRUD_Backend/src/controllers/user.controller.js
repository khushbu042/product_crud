const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model")
const sendResponse = require("../utils/sendResponse");
const verifyToken = require("../utils/verifyToken");

const signUp = async (req,res) => {
    try {
        const { username, email, password} = req.body;
        if (!(username && email && password)) {
            // return res.status(400).send("username, email and password are required");
            return sendResponse(res,false,"username, email and password are required",null,400);
        }
        //finding a email in database if it found login is required
        //Check if user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            // return res.status(409).send("User is already registerd please login")
            return sendResponse(res,false,"User is already registerd please login",null,409);
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //now i will store in database or create a User
        const user = await User.create({
            username: username,
            password:hashedPassword,
            email:email
        });

        if(!user){
            // return res.status(401).send("something wrong when user is created")
            return sendResponse(res,false,"something wrong when user is created",null,401);
        }
        
        // res.status(201).json({
        //     message: "User created successfully",
        //     userId: user._id,
        // });
        // const createdUser = user.select("-password");
        return sendResponse(res,true,"User created successfully",user,201);


    }catch(error){
        console.log("catch block error")
        console.error(error);
    
        // return res.status(500).send("Internal Server Error");
        return sendResponse(res,false,"Internal Server Error",null,500);
    }
}

const login = async (req, res) => {
    try{
        const{email, password}= req.body
        if(!(email && password)){
            // return res.status(400).send("Email and Password is required");
            return sendResponse(res,false,"Email and Password is required",null,400);

        }

        //finding email in database
        const existingUser = await User.findOne({email})
        if(!existingUser){
            // return res.status(401).send("user is not registered please register");
            return sendResponse(res,false,"user is not registered please register",null,401);

        }

        // comapre password 
        const validPassword = await bcrypt.compare(password,existingUser.password) // complete it
       
        if(!validPassword){
            // return res.status(401).send("password is incorrect")
            return sendResponse(res,false,"password is incorrect",null,401);

        }

        // create a json Web token 
        const jwtToken = jwt.sign(
            {userId: existingUser._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"1h"}
        );  

        // send token in cookie or header
        res.cookie("jwtToken",jwtToken, {
            httpOnly: true,       // JS se access na ho
            secure: false,        // true in production with HTTPS
            sameSite: "lax",   // CSRF attack safe
            maxAge: 60 * 60 * 1000 // 1 hour
        });
        // return res.status(200).json({
        //     message: "Login successful",
        // });
        return sendResponse(res,true,"Login successful",existingUser,200);

    }catch(error){
        console.log(error)
        // return res.status(500).send("Internal Server Error");
        return sendResponse(res,false,"Internal Server Error",null,500);

    }
}

const isLoggedIn = async (req,res) => {
    try {
            const jwtToken = req.cookies.jwtToken;
            if(!jwtToken){
                return sendResponse(res, false, "Login first", null, 401);
            }
            const {success,decoded} = verifyToken(jwtToken);
            if(!success){
                return sendResponse(res,false,"Invalid or expired token", null,401);
            }
            // Optional: find user info
            const user = await User.findById(decoded.userId).select("-password");
            if (!user) {
                return sendResponse(res, false, "User not found", null, 404);
            }
            return sendResponse(res, true, "User is logged in", user, 200);
    } catch (error) {
        console.log(error)
        // return res.status(500).send("Internal Server Error");
        return sendResponse(res,false,"Internal Server Error",null,500);
    }
}
const logout = (req, res) => {
    res.clearCookie("jwtToken");
    return sendResponse(res, true, "Logout successful", null, 200);
};

module.exports = { signUp, login, logout, isLoggedIn };


