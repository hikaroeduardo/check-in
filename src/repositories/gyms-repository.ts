import { Gym } from "@prisma/client";

export interface gymsRepository {
    findById(id: string): Promise<Gym | null>;
}
