import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

export const authMiddleware = asyncHandler((req, res, next) => {
    const accessToken = req.cookies?.accessToken;
 

        if (!accessToken) throw { status: 401, message: 'Unauthorized' };
        

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) throw { status: 403, message: 'Invalid or expired token' };

        req.user = decoded;
        next();
    });
        
   
    
});
