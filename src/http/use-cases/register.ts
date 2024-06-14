import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export async function registerUseCase({
    email,
    name,
    password,
}: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (userWithSameEmail) {
        throw new Error("E-mail already exists.");
    }

    const prismaUsersRepository = new PrismaUsersRepository();

    await prismaUsersRepository.create({
        name,
        email,
        password_hash: passwordHash,
    });
}
