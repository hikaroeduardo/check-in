import { CheckIn, Prisma } from "@prisma/client";

export interface checkInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
