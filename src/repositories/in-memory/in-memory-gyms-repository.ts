import { Gym, Prisma } from "@prisma/client";

import { gymsRepository } from "../gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";

export class InMemoryGymsRepository implements gymsRepository {
    public items: Gym[] = [];

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
        };

        this.items.push(gym);

        return gym;
    }

    async findById(id: string) {
        const gym = this.items.find((item) => item.id === id);

        if (!gym) {
            return null;
        }

        return gym;
    }
}
