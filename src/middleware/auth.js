import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const user = jwt.verify(token, config.jwtSecret);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};