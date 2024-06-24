import { FastifyRequest, FastifyReply } from "fastify";

type RoleProps = "ADMIN" | "MEMBER";

export async function verifyUserRole(roleToVerify: RoleProps) {
    return (request: FastifyRequest, reply: FastifyReply) => {
        const { role } = request.user;

        if (role !== roleToVerify) {
            return reply.status(401).send({ message: "Unauthorized." });
        }
    };
}
