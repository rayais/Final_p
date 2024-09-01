const jwt = require('jsonwebtoken');
const userschema = require('../model/userschema');

exports.verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the header
    if (!token) {
        return res.status(401).send({ msg: "No token provided" });
    }
  
    try {
        const decoded = jwt.verify(token, '1234'); // Verify the token
        req.userId = decoded.id; // Attach the user ID to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(401).send({ msg: "Invalid token" });
    }
  };
