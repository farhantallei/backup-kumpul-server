import { FastifyReply } from 'fastify';
import prisma from '../../prisma';
import { commitToDB } from '../../utils';

export async function getUser(
  reply: FastifyReply,
  { phoneNumber }: { phoneNumber: string }
) {
  return await commitToDB(
    prisma.user.findUnique({ where: { phoneNumber } }),
    reply
  );
}

export async function getUserById(reply: FastifyReply, { id }: { id: string }) {
  return await commitToDB(
    prisma.user.findUnique({ where: { id }, select: null }),
    reply
  );
}

export async function createUser(
  reply: FastifyReply,
  {
    name,
    phoneNumber,
  }: {
    name: string;
    phoneNumber: string;
  }
) {
  return await commitToDB(
    prisma.user.create({ data: { name, phoneNumber } }),
    reply
  );
}
