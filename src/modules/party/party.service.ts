import { FastifyReply } from 'fastify';
import prisma from '../../prisma';
import { commitToDB } from '../../utils';

export async function getUser(
  reply: FastifyReply,
  { userId }: { userId: string }
) {
  return await commitToDB(
    prisma.user.findUnique({
      where: { id: userId },
      select: { phoneNumber: true },
    }),
    reply
  );
}

export async function getHost(
  reply: FastifyReply,
  { hostId }: { hostId: string }
) {
  return await commitToDB(
    prisma.user.findUnique({ where: { id: hostId }, select: { id: true } }),
    reply
  );
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

export async function getParty(
  reply: FastifyReply,
  { partyId }: { partyId: string }
) {
  return await commitToDB(
    prisma.party.findUnique({
      where: { id: partyId },
      select: { private: true, memberLimit: true },
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
  }: {
    hostId: string;
    name: string;
    private: boolean;
    pollChoice: string[];
    pollEndsAt?: string;
    candidates: {
      phoneNumber: string;
      name: string;
      admin: boolean;
    }[];
    memberLimit?: number;
    memberIds: string[];
  }
) {
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
    createdAt,
  };
}

export async function countMember(
  reply: FastifyReply,
  { partyId }: { partyId: string }
) {
  return await commitToDB(
    prisma.membersOnParties.count({ where: { partyId } }),
    reply
  );
}

export async function getMember(
  reply: FastifyReply,
  partyId_memberId: { partyId: string; memberId: string }
) {
  return await commitToDB(
    prisma.membersOnParties.findUnique({
      where: { partyId_memberId },
      select: { admin: true, assignedAt: true },
    }),
    reply
  );
}

export async function getCandidate(
  reply: FastifyReply,
  partyId_phoneNumber: { partyId: string; phoneNumber: string }
) {
  return await commitToDB(
    prisma.candidate.findUnique({
      where: { partyId_phoneNumber },
      select: { admin: true },
    }),
    reply
  );
}

export async function deleteCandidate(
  reply: FastifyReply,
  partyId_phoneNumber: { partyId: string; phoneNumber: string }
) {
  await commitToDB(
    prisma.candidate.delete({
      where: { partyId_phoneNumber },
    }),
    reply
  );
}

export async function joinParty(
  reply: FastifyReply,
  { userId, ...others }: { userId: string; partyId: string; admin: boolean }
) {
  return await commitToDB(
    prisma.membersOnParties.create({
      data: { memberId: userId, ...others },
      select: { assignedAt: true },
    }),
    reply
  );
}
