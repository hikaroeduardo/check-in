import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-ceck-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInRepository: InMemoryCheckInsRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe("Validate check-in Use Case", () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository();
        validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository);

        // vi.useFakeTimers();
    });

    afterEach(() => {
        // vi.useRealTimers();
    });

    it("should be able to validate the check-in", async () => {
        const createdCheckIn = await checkInRepository.create({
            gym_id: "gyn-01",
            user_id: "user-01",
        });

        const { checkIn } = await validateCheckInUseCase.execute({
            checkInId: createdCheckIn.id,
        });

        expect(checkIn.validated_at).toEqual(expect.any(Date));
        expect(checkInRepository.items[0].validated_at).toEqual(
            expect.any(Date)
        );
    });

    it("should not be able to validate an inexistent check-in", async () => {
        await expect(() =>
            validateCheckInUseCase.execute({
                checkInId: "inexistent-check-in-id",
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
