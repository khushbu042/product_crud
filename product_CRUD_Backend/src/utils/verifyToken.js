const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    try{
        const decoded  =  jwt.verify(token, process.env.JWT_SECRET_KEY);
        return {success : true, decoded };
    }catch(error){
        return { success: false, error };
    }
}

module.exports = verifyToken