import { Gym } from "@prisma/client";

import { gymsRepository } from "@/repositories/gyms-repository";

interface SearchGymUseCaseRequest {
    query: string;
    page: number;
}

interface SearchGymUseCaseResponse {
    gyms: Gym[];
}

export class SearchGymUseCase {
    private gymsRepository: gymsRepository;

    constructor(gymsRepository: gymsRepository) {
        this.gymsRepository = gymsRepository;
    }

    async execute({
        query,
        page,
    }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
        const gyms = await this.gymsRepository.searchMany(query, page);

        return { gyms };
    }
}
