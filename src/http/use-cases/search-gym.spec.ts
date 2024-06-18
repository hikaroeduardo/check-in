import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymUseCase } from "./search-gym";

let gymsRepository: InMemoryGymsRepository;
let searchGymUseCase: SearchGymUseCase;

describe("Search Gyms Use Case", () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();

        searchGymUseCase = new SearchGymUseCase(gymsRepository);
    });

    it("should be able to search for gyms", async () => {
        await gymsRepository.create({
            title: "JavaScript Gym",
            description: "",
            phone: "",
            latitude: -5.1120607,
            longitude: -42.8150236,
        });

        await gymsRepository.create({
            title: "TypeScript Gym",
            description: "",
            phone: "",
            latitude: -5.1120607,
            longitude: -42.8150236,
        });

        const { gyms } = await searchGymUseCase.execute({
            query: "JavaScript Gym",
            page: 1,
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ title: "JavaScript Gym" }),
        ]);
    });

    it("should be able to fetch paginated gyms search", async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `JavaScript Gym ${i}`,
                description: "",
                phone: "",
                latitude: -5.1120607,
                longitude: -42.8150236,
            });
        }

        const { gyms } = await searchGymUseCase.execute({
            query: "JavaScript",
            page: 2,
        });

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({ title: "JavaScript Gym 21" }),
            expect.objectContaining({ title: "JavaScript Gym 22" }),
        ]);
    });
});
