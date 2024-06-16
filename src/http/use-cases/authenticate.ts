import { usersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

import { User } from "@prisma/client";

import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User;
}

export class AuthenticateUseCase {
    constructor(private userRepository: usersRepository) {}

    async execute({
        email,
        password,
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        // Verificar se o usuário existe no bd
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        // Verificar se a senha está correta
        const doesPasswordMatches = await compare(password, user.password_hash);

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return { user };
    }
}
