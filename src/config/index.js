import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT || 8080,
    redisUrl: process.env.REDIS_URL,
    jwtSecret: process.env.JWT_SECRET
};