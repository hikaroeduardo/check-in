import fastify from "fastify";
import { ZodError } from "zod";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";

import { env } from "./env";

import { usersRoutes } from "./http/controllers/users/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export const app = fastify();

const swaggerOptions = {
    openapi: {
        openapi: "3.1.0",
        info: {
            title: "Check-in in gyms",
            description: "Api para realizar check-ins em academis",
            version: "0.1.0",
        },
        servers: [
            {
                url: "http://localhost:3333",
                description: "Ambiente local, para teste",
            },
        ],
        tags: [
            { name: "users", description: "User routes" },
            { name: "tokens", description: "Tokens routes" },
            { name: "gyms", description: "Gyms routes" },
            { name: "check-ins", description: "Check-ins routes" },
        ],
    },
};

const swaggerUiOptions = {
    routePrefix: "/documentation",
    exposeRoute: true,
};

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

app.register(fastifyCookie);

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: "refreshToken",
        signed: false,
    },
    sign: {
        expiresIn: "10m",
    },
});
app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: "Validation error.", issues: error.format() });
    }

    if (env.NODE_ENV !== "production") {
        console.error(error);
    }

    return reply.status(500).send({ message: "Internal server error." });
});
