import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";

import { createCheckIns } from "./create-check-in";
import { validateCheckIns } from "./validate-check-in";

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.post("/gyms/:gymId/check-ins", createCheckIns);
    app.patch("/check-ins/:checkInId/validate", validateCheckIns);
}
