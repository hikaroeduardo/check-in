import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { ValidateCheckInUseCase } from "../validate-ceck-in";

export function makeValidateCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();

    const useCase = new ValidateCheckInUseCase(checkInsRepository);

    return useCase;
}
