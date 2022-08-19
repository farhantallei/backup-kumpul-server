import { FastifyReply } from 'fastify';
import prisma from '../../prisma';
import { commitToDB } from '../../utils';
import { CreatePartyBody, CreatePartyReply } from './party.schema';

export async function getHostId(
  reply: FastifyReply,
  { hostId }: { hostId: string }
) {
  const host = await commitToDB(
    prisma.user.findUnique({ where: { id: hostId }, select: { id: true } }),
    reply
  );

  if (host == null) return reply.badRequest('Host id is not found') as never;

  return host.id;
}

export async function getAdminAccounts(
  reply: FastifyReply,
  { adminPhoneNumbers }: { adminPhoneNumbers: string[] }
) {
  return await commitToDB(
    prisma.user.findMany({
      where: { phoneNumber: { in: adminPhoneNumbers } },
      select: { id: true, phoneNumber: true },
    }),
    reply
  );
}

export async function createParty(
  reply: FastifyReply,
  {
    hostId,
    candidates,
    memberIds,
    pollChoice,
    ...party
  }: CreatePartyBody & {
    memberLimit: number;
    memberIds: string[];
  }
): Promise<CreatePartyReply> {
  const { id, name, createdAt, ...newParty } = await commitToDB(
    prisma.party.create({
      data: {
        pollChoice: pollChoice.map((poll) => new Date(poll).toISOString()),
        candidates: {
          createMany: {
            data: candidates,
          },
        },
        members: {
          create: [
            { memberId: hostId, admin: true },
            ...memberIds.map((memberId) => ({
              memberId,
              admin: true,
            })),
          ],
        },
        ...party,
      },
      select: {
        id: true,
        name: true,
        candidates: {
          where: {
            admin: true,
          },
          select: {
            name: true,
          },
        },
        members: {
          select: {
            member: {
              select: {
                name: true,
              },
            },
          },
        },
        createdAt: true,
      },
    }),
    reply
  );

  return {
    id,
    name,
    admins: [
      ...newParty.candidates.map((candidate) => candidate.name),
      ...newParty.members.map(({ member }) => member.name),
    ],
    createdAt: createdAt.toISOString(),
  };
}
