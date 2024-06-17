import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { Decimal } from "@prisma/client/runtime/library";

import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let checkInUseCase: CheckInUseCase;

describe("Check-in Use Case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        checkInUseCase = new CheckInUseCase(checkInRepository, gymsRepository);

        gymsRepository.items.push({
            id: "gym-01",
            title: "JavaScript Gym",
            description: "",
            phone: "",
            latitude: new Decimal(-5.1120607),
            longitude: new Decimal(-42.8150236),
        });

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to check in", async () => {
        const { checkIn } = await checkInUseCase.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -5.1120607,
            userLongitude: -42.8150236,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should not be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await checkInUseCase.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -5.1120607,
            userLongitude: -42.8150236,
        });

        await expect(() =>
            checkInUseCase.execute({
                gymId: "gym-01",
                userId: "user-01",
                userLatitude: -5.1120607,
                userLongitude: -42.8150236,
            })
        ).rejects.toBeInstanceOf(Error);
    });

    it("should be able to check in twice but in diferent days", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await checkInUseCase.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -5.1120607,
            userLongitude: -42.8150236,
        });

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

        const { checkIn } = await checkInUseCase.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -5.1120607,
            userLongitude: -42.8150236,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should not be able to check in on distant gym", async () => {
        gymsRepository.items.push({
            id: "gym-02",
            title: "JavaScript Gym",
            description: "",
            phone: "",
            latitude: new Decimal(-5.0806593),
            longitude: new Decimal(-42.7768407),
        });

        await expect(() =>
            checkInUseCase.execute({
                gymId: "gym-02",
                userId: "user-01",
                userLatitude: -5.1120607,
                userLongitude: -42.8150236,
            })
        ).rejects.toBeInstanceOf(Error);
    });
});
