import { describe, it, expect } from "vitest";
import { compare, hash } from "bcryptjs";

import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";

describe("Authenticate Use Case", () => {
    it("should be able to authenticate", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const authenticateUseCase = new AuthenticateUseCase(usersRepository);

        await usersRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash("123456", 6),
        });

        const { user } = await authenticateUseCase.execute({
            email: "johndoe@example.com",
            password: "123456",
        });

        expect(user.email).toBe("johndoe@example.com");
    });

    it("should not be able to authenticate with wrong email", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const authenticateUseCase = new AuthenticateUseCase(usersRepository);

        expect(() =>
            authenticateUseCase.execute({
                email: "johndoe@example.com",
                password: "123456",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it("should not be able to authenticate with wrong password", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const authenticateUseCase = new AuthenticateUseCase(usersRepository);

        await usersRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash("123456", 6),
        });

        expect(() =>
            authenticateUseCase.execute({
                email: "johndoe@example.com",
                password: "123456456",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
