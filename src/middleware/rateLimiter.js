import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { createClient } from "redis";

export const createRateLimiter = async (redisUrl) => {
    const client = createClient({ url: redisUrl });

    client.on("error", (err) => console.error("Redis error:", err));

    await client.connect();

    return rateLimit({
        windowMs: 60 * 1000,
        max: 30,
        standardHeaders: true,
        legacyHeaders: false,
        store: new RedisStore({
            sendCommand: (...args) => client.sendCommand(args)
        })
    });
};