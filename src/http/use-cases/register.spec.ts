import { describe, it, expect, beforeEach } from "vitest";
import { compare } from "bcryptjs";

import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let registerUserCase: RegisterUseCase;

describe("Register Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        registerUserCase = new RegisterUseCase(usersRepository);
    });

    it("should be able to register", async () => {
        const { user } = await registerUserCase.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it("should hash user password upon registration", async () => {
        const { user } = await registerUserCase.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456",
        });

        const isPasswordCorrectlyHashed = await compare(
            "123456",
            user.password_hash
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it("should not be able to register with same email twice", async () => {
        const email = "johndoe@example.com";

        await registerUserCase.execute({
            name: "John Doe",
            email,
            password: "123456",
        });

        await expect(() =>
            registerUserCase.execute({
                name: "John Doe",
                email,
                password: "123456",
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});
