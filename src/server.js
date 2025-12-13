import express from "express";
import jwt from "jsonwebtoken";
const app = express();
import { proxy } from "./gateway.js";
import config from "./config.js";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { createClient } from "redis";

function authenticateToken (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token){return res.status(401).json({message: "Token missing!"});}

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err){return res.status(403).json({message: "Token invalid!"});}
        
        req.user = user;
        next();
    });
}

const redisClient = createClient({
    url: config.redis_url,
});
redisClient.connect();

const limiter = rateLimit({
    windowMs: 1*60*1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args)
    })
});


app.use(express.json());
app.use(limiter);
app.use(authenticateToken);
app.use("/", proxy);

app.listen(config.port, () => {console.log(`Gateway running at port ${config.port}`)});