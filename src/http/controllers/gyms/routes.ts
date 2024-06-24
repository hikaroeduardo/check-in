import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";

import { searchGym } from "./search";
import { nearbyGym } from "./nearby";
import { create } from "./create";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create);

    app.get("/gyms/search", searchGym);
    app.get("/gyms/nearby", nearbyGym);
}
