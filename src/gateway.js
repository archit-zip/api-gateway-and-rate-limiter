import axios from "axios";

const services = {
    "/users": "http://localhost:3000",
    "/orders": "http://localhost:3001",
    "/products": "http://localhost:3002"
};

export const proxy = async (req, res) => {
    const requestPath = req.originalUrl;
    const matchedPrefix = Object.keys(services).find(prefix => requestPath.startsWith(prefix));

    if (!matchedPrefix) {
        res.status(502).json({error: "No service found for this route!"});
    }
    const target = services[matchedPrefix] + requestPath;

    try {
        const response = await axios({
            method: req.method,
            url: serviceUrl + req.originalUrl,
            data: req.body,
            headers: req.headers
        });
        res.status(response.status).send(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).send(err.response?.data || "Error");
    }
}