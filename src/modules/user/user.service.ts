import prisma from '../../prisma';
import { commitToDB } from '../../utils';

export async function getUser(phoneNumber: string) {
  return await commitToDB(prisma.user.findUnique({ where: { phoneNumber } }));
}

export async function createUser({
  name,
  phoneNumber,
}: {
  name: string;
  phoneNumber: string;
}) {
  return await commitToDB(prisma.user.create({ data: { name, phoneNumber } }));
}
