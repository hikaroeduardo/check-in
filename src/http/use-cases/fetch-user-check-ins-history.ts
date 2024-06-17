import { CheckIn } from "@prisma/client";

import { checkInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string;
    page: number;
}

interface FetchUserCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
    constructor(private checkInsRepository: checkInsRepository) {}

    async execute({
        userId,
        page,
    }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(
            userId,
            page
        );

        return { checkIns };
    }
}
