export const services = {
    "/users": process.env.USER_SERVICE_URL || "http://localhost:3000",
    "/orders": process.env.ORDER_SERVICE_URL || "http://localhost:3001",
    "/products": process.env.PRODUCT_SERVICE_URL || "http://localhost:3002"
};