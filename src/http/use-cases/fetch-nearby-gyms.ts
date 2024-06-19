import { Gym } from "@prisma/client";

import { gymsRepository } from "@/repositories/gyms-repository";

interface FetchNearbyGymsUseCaseRequest {
    userLatitude: number;
    userLongitude: number;
}

interface FetchNearbyGymsUseCaseResponse {
    gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
    private gymsRepository: gymsRepository;

    constructor(gymsRepository: gymsRepository) {
        this.gymsRepository = gymsRepository;
    }

    async execute({
        userLatitude,
        userLongitude,
    }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude,
        });

        return { gyms };
    }
}
