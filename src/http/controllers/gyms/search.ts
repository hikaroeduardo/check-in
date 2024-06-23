import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod";
import { makeSearchGymsUseCase } from "@/http/use-cases/factories/make-search-gym-use-case";

export async function searchGym(request: FastifyRequest, reply: FastifyReply) {
    const searchGymsQuerySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(0).default(1),
    });

    const { query, page } = searchGymsQuerySchema.parse(request.query);

    const searchGymUseCase = makeSearchGymsUseCase();

    const { gyms } = await searchGymUseCase.execute({
        query,
        page,
    });

    return reply.status(200).send({
        gyms,
    });
}
