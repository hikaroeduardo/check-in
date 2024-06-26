import { CheckIn } from "@prisma/client";

import { checkInsRepository } from "@/repositories/check-ins-repository";
import { gymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInError } from "./errors/max-number-of-check-ins-error";
import dayjs from "dayjs";

interface ValidateCheckInUseCaseRequest {
    checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
    constructor(private checkInsRepository: checkInsRepository) {}

    async execute({
        checkInId,
    }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId);

        if (!checkIn) {
            throw new ResourceNotFoundError();
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            "minutes"
        );

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new Error();
        }

        checkIn.validated_at = new Date();

        await this.checkInsRepository.save(checkIn);

        return { checkIn };
    }
}
