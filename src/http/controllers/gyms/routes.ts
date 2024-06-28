import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";

import { searchGym } from "./search";
import { nearbyGym } from "./nearby";
import { create } from "./create";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.post(
        "/gyms",
        {
            schema: {
                description: "Buscar academias",
                summary: "Buscar academias",
                tags: ["gyms"],
            },
            onRequest: [verifyUserRole("ADMIN")],
        },
        create
    );

    app.get(
        "/gyms/search",
        {
            schema: {
                description: "Pesquisar academias",
                summary: "Pesquisar academias",
                tags: ["gyms"],
            },
        },
        searchGym
    );
    app.get(
        "/gyms/nearby",
        {
            schema: {
                description: "Buscar academias próximas",
                summary: "Buscar academias próximas",
                tags: ["gyms"],
            },
        },
        nearbyGym
    );
}
