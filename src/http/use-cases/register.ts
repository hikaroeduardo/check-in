import { User } from "@prisma/client";
import { hash } from "bcryptjs";

import { usersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterUseCaseResponse {
    user: User;
}

export class RegisterUseCase {
    private usersRepository: usersRepository;

    constructor(usersRepository: usersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute({
        email,
        name,
        password,
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const passwordHash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash: passwordHash,
        });

        return { user };
    }
}
