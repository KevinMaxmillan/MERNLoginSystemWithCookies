import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) throw { status: 401, message: 'Unauthorized' };

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) throw { status: 403, message: 'Invalid or expired token' };

        req.user = decoded;
        next();
    });
};
