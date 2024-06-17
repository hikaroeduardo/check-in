import { Gym } from "@prisma/client";

import { gymsRepository } from "@/repositories/gyms-repository";

interface CreateGymUseCaseRequest {
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
}

interface CreateGymUseCaseResponse {
    gym: Gym;
}

export class CreateGymUseCase {
    private gymsRepository: gymsRepository;

    constructor(gymsRepository: gymsRepository) {
        this.gymsRepository = gymsRepository;
    }

    async execute({
        title,
        description,
        phone,
        latitude,
        longitude,
    }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude,
        });

        return { gym };
    }
}
