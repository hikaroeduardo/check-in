import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod";
import { makeFetchUserCheckInsHistoryUseCase } from "@/http/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function historyCheckIns(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const historyCheckInsQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = historyCheckInsQuerySchema.parse(request.query);

    const fetchUserCheckInsHistoryUseCase =
        makeFetchUserCheckInsHistoryUseCase();

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
        userId: request.user.sub,
        page,
    });

    return reply.status(200).send({
        checkIns,
    });
}
