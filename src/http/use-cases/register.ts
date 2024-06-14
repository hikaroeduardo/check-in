import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

import { usersRepository } from "@/repositories/users-repository";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class RegisterUseCase {
    constructor(private usersRepository: usersRepository) {}

    async execute({ email, name, password }: RegisterUseCaseRequest) {
        const passwordHash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new Error("E-mail already exists.");
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash: passwordHash,
        });
    }
}
