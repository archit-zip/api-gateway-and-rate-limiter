import express from "express";
import path from "path";
import morgan from "morgan";
import gatewayRoutes from "./routes/gatewayRoutes.js";
import { authenticateToken } from "./middleware/auth.js";
import { createRateLimiter } from "./middleware/rateLimiter.js";
import config from "./config/index.js";
import { services } from "./services/serviceRegistry.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));
app.use(morgan("combined"));

app.get("/", (req, res) => {
    res.render("index", { services });
});

const setupMiddleware = async () => {
    const limiter = await createRateLimiter(config.redisUrl);

    app.use(limiter);
    app.use(authenticateToken);
    app.use("/", gatewayRoutes);
};

await setupMiddleware();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

export default app;