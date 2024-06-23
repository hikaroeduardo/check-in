import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";

import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { refreshToken } from "./refresh-token";

export async function usersRoutes(app: FastifyInstance) {
    app.post("/users", register);
    app.post("/sessions", authenticate);

    app.patch("/token/refresh", refreshToken);

    // Precisam de autenticação

    /*
        - Busca o token
        - Verifica se o token realmente foi gerado pela nossa aplicação
        - Busca informações do usuário baseado no token
    */

    app.get("/me", { onRequest: [verifyJWT] }, profile);
}
