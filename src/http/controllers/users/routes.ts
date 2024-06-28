import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";

import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { refreshToken } from "./refresh-token";

export async function usersRoutes(app: FastifyInstance) {
    app.post(
        "/users",
        {
            schema: {
                description: "Adicionar um novo usuário",
                summary: "Adicionar um novo usuário",
                tags: ["users"],
            },
        },
        register
    );

    app.post(
        "/sessions",
        {
            schema: {
                description: "Logar um usuário",
                summary: "Logar um usuário",
                tags: ["users"],
            },
        },
        authenticate
    );

    app.patch(
        "/token/refresh",
        {
            schema: {
                description: "end-point para refresh token",
                summary: "end-point para refresh token",
                tags: ["tokens"],
            },
        },
        refreshToken
    );

    // Precisam de autenticação

    /*
        - Busca o token
        - Verifica se o token realmente foi gerado pela nossa aplicação
        - Busca informações do usuário baseado no token
    */

    app.get(
        "/me",
        {
            schema: {
                description: "Buscar dados de usuário",
                summary: "Buscar dados de usuário",
                tags: ["users"],
            },
            onRequest: [verifyJWT],
        },
        profile
    );
}
