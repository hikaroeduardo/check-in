import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";

import { createCheckIns } from "./create-check-in";
import { validateCheckIns } from "./validate-check-in";
import { historyCheckIns } from "./history-check-in";
import { metricsCheckIns } from "./metrics-check-ins";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.get(
        "/check-ins/history",
        {
            schema: {
                description: "Buscar histórico de check-ins",
                summary: "Buscar histórico de check-ins",
                tags: ["check-ins"],
            },
        },
        historyCheckIns
    );
    app.get(
        "/check-ins/metrics",
        {
            schema: {
                description: "Buscar métricas sobre check-ins",
                summary: "Buscar métricas sobre check-ins",
                tags: ["check-ins"],
            },
        },
        metricsCheckIns
    );

    app.post(
        "/gyms/:gymId/check-ins",
        {
            schema: {
                description: "Buscar check-ins por academia",
                summary: "Buscar check-ins por academia",
                tags: ["check-ins"],
            },
        },
        createCheckIns
    );
    app.patch(
        "/check-ins/:checkInId/validate",
        {
            schema: {
                description: "Validar check-ins",
                summary: "Validar check-ins",
                tags: ["check-ins"],
            },
            onRequest: [verifyUserRole("ADMIN")],
        },
        validateCheckIns
    );
}
