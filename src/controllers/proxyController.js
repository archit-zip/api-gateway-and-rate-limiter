import axios from "axios";
import { services } from "../services/serviceRegistry.js";

export const proxyRequest = async (req, res, next) => {
    const requestPath = req.originalUrl;

    const matchedPrefix = Object.keys(services).find(prefix =>
        requestPath.startsWith(prefix)
    );

    if (!matchedPrefix) {
        return res.status(502).json({
            error: "No service found for this route"
        });
    }

    const targetUrl = services[matchedPrefix] + requestPath;

    try {
        const response = await axios({
            method: req.method,
            url: targetUrl,
            data: req.body,
            headers: {
                ...req.headers,
                host: undefined
            }
        });

        res.status(response.status).send(response.data);
    } catch (err) {
        console.error("Proxy error:", err.message);

        res.status(err.response?.status || 500).send(
            err.response?.data || "Internal server error"
        );
    }
};