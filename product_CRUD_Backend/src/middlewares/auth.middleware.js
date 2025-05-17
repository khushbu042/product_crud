const sendResponse = require("../utils/sendResponse");
const verifyToken = require("../utils/verifyToken");

const authMiddleware = (req,res,next) => {
    console.log("cookies are : ",req.cookies)
    const jwtToken = req.cookies.jwtToken;
    console.log(jwtToken);
    if(!jwtToken){
        // return res.status(402).send("Login First")
        console.log("if not login then this fuction is runing");
        return sendResponse(res, false, "Login first", null, 401);

    }

    try {
        const {success,decoded,error} = verifyToken(jwtToken);
        if(!success){
            return sendResponse(res, false, "Invalid or expired token", null, 401);
        }
        req.user=decoded
        // console.log("authmiddleware run")
        next();           
    } catch (error) {
        console.log(error);
        // return res.status(401).send("Invalid token");
        return sendResponse(res, false, "Invalid or expired token", null, 401);
    }
}

module.exports = authMiddleware;