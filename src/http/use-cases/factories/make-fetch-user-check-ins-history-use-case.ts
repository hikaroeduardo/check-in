import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-in-repository";

export function makeFetchUserCheckInsHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();

    const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

    return useCase;
}
