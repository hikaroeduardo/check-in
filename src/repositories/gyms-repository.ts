import { Gym, Prisma } from "@prisma/client";

export interface gymsRepository {
    findById(id: string): Promise<Gym | null>;
    create(data: Prisma.GymCreateInput): Promise<Gym>;
}
