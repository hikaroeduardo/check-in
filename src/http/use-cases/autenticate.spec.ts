import { describe, it, expect, beforeEach } from "vitest";
import { compare, hash } from "bcryptjs";

import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";

let usersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        authenticateUseCase = new AuthenticateUseCase(usersRepository);
    });

    it("should be able to authenticate", async () => {
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
        await expect(() =>
            authenticateUseCase.execute({
                email: "johndoe@example.com",
                password: "123456",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it("should not be able to authenticate with wrong password", async () => {
        await usersRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash("123456", 6),
        });

        await expect(() =>
            authenticateUseCase.execute({
                email: "johndoe@example.com",
                password: "123456456",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
