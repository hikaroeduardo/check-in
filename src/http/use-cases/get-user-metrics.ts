import { checkInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsUseCaseRequest {
    userId: string;
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number;
}

export class GetUserMetricsUseCase {
    constructor(private checkInsRepository: checkInsRepository) {}

    async execute({
        userId,
    }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
        const checkInsCount = await this.checkInsRepository.countByUserId(
            userId
        );

        return {checkInsCount}
    }
}
