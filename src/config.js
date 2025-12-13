import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT || 8080,
    redis_url: process.env.REDIS_URL
};