import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();

        fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository);
    });

    it("should be able to fetch nearby gyms", async () => {
        await gymsRepository.create({
            title: "Near Gym",
            description: "",
            phone: "",
            latitude: -5.1120607,
            longitude: -42.8150236,
        });

        await gymsRepository.create({
            title: "Far Gym",
            description: "",
            phone: "",
            latitude: -27.0610928,
            longitude: -49.5229501,
        });

        const { gyms } = await fetchNearbyGymsUseCase.execute({
            userLatitude: -5.1120607,
            userLongitude: -42.8150236,
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
    });
});
