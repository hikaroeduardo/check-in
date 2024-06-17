import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let createGymUserCase: CreateGymUseCase;

describe("Create Gym Use Case", () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        createGymUserCase = new CreateGymUseCase(gymsRepository);
    });

    it("should be able to create gym", async () => {
        const { gym } = await createGymUserCase.execute({
            title: "JavaScript Gym",
            description: null,
            phone: null,
            latitude: -5.0806593,
            longitude: -42.7768407,
        });

        expect(gym.id).toEqual(expect.any(String));
    });
});
