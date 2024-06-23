import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";

import { createCheckIns } from "./create-check-in";
import { validateCheckIns } from "./validate-check-in";
import { historyCheckIns } from "./history-check-in";
import { metricsCheckIns } from "./metrics-check-ins";

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.get("/check-ins/history", historyCheckIns);
    app.get("/check-ins/metrics", metricsCheckIns);

    app.post("/gyms/:gymId/check-ins", createCheckIns);
    app.patch("/check-ins/:checkInId/validate", validateCheckIns);
}
