import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";

import { z } from "zod";
import { hash } from "bcryptjs";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (userWithSameEmail) {
        return reply.status(409).send();
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: passwordHash,
        },
    });

    return reply.status(201).send();
}
