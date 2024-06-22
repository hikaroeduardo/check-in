import { FastifyInstance } from "fastify";

import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
    app.post("/users", register);
    app.post("/sessions", authenticate);

    // Precisam de autenticação

    /*
        - Busca o token
        - Verifica se o token realmente foi gerado pela nossa aplicação
        - Busca informações do usuário baseado no token
    */

    app.get("/me", { onRequest: [verifyJWT] }, profile);
}
