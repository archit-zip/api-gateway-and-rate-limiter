# API Gateway with JWT Authentication & Distributed Rate Limiting

This project is an API Gateway built using Node.js and Express that acts as a centralized entry point for multiple backend services. It implements JWT-based authentication, Redis-backed distributed rate limiting, and dynamic service routing, along with a Bootstrap + EJS dashboard for testing and interaction. The system simulates real-world microservice architecture patterns used in modern backend systems.

## Features

*  **JWT Authentication Middleware**

  * Secures all incoming requests
  * Verifies tokens before forwarding to services

*  **Distributed Rate Limiting (Redis)**

  * Prevents abuse using shared Redis store
  * Scales across multiple instances

*  **Dynamic API Gateway Routing**

  * Routes requests to multiple services (`/users`, `/orders`, `/products`)
  * Easily extendable via service registry

*  **Centralized Configuration**

  * Environment-based config management
  * Avoids runtime inconsistencies

*  **Interactive Dashboard (EJS + Bootstrap)**

  * Select service, method, and payload
  * Send authenticated requests directly from UI

*  **Request Logging & Error Handling**

  * Uses `morgan` for logging
  * Centralized error middleware

##  Tech Stack

* Backend: Node.js, Express.js
* Authentication: JWT (`jsonwebtoken`)
* Rate Limiting: `express-rate-limit`, `rate-limit-redis`
* Cache/Store: Redis
* Frontend: EJS, Bootstrap
* Logging: Morgan

## Architecture Overview

```
Client (Postman / Dashboard)
        ↓
API Gateway (Express)
        ↓
Rate Limiter (Redis)
        ↓
JWT Authentication Middleware
        ↓
Proxy Controller (Routing)
        ↓
Backend Services (Users / Orders / Products)
```

---

## Project Structure

```
src/
 ├── config/              # Environment & config management
 ├── middleware/          # Auth + rate limiter
 ├── services/            # Service registry
 ├── controllers/         # Proxy logic
 ├── routes/              # Gateway routes
 ├── views/               # EJS frontend
 ├── public/              # Static assets
 ├── app.js               # App setup
server.js                 # Entry point
```
