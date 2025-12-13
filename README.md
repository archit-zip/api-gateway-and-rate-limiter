# api-gateway-and-rate-limiter
This project is a Node.js–based API Gateway designed to sit in front of multiple backend services and act as a single entry point for client requests. It handles authentication, rate limiting, and request routing, enabling secure and scalable microservice communication. The gateway verifies JWT-based authentication, enforces distributed rate limits using Redis, and forwards validated requests to the appropriate backend services. This architecture closely mirrors production-grade gateway patterns used in modern microservice systems.

Tech stack: 
Node.js
Express.js
JWT (jsonwebtoken)
Redis
express-rate-limit
rate-limit-redis

Overview:
Client
  ↓
API Gateway
  ├── Rate Limiting (Redis)
  ├── JWT Authentication
  └── Proxy Routing
          ↓
     Backend Services