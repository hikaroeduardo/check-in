import { CheckIn } from "@prisma/client";

import { checkInsRepository } from "@/repositories/check-ins-repository";
import { gymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInError } from "./errors/max-number-of-check-ins-error";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: checkInsRepository,
        private gymsRepository: gymsRepository
    ) {}

    async execute({
        userId,
        gymId,
        userLatitude,
        userLongitude,
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const distance = getDistanceBetweenCoordinates(
            {
                latitude: userLatitude,
                longitude: userLongitude,
            },
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber(),
            }
        );

        const MAX_DISTANCE_IN_KILOMETERS = 0.1;

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError();
        }

        const checkInOnSameDate =
            await this.checkInsRepository.findByUserIdOnDate(
                userId,
                new Date()
            );

        if (checkInOnSameDate) {
            throw new MaxNumberOfCheckInError();
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId,
        });

        return { checkIn };
    }
}
