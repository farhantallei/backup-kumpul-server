import prisma from '../../prisma';
import { commitToDB } from '../../utils';
import { LoginHandler, RegisterHandler } from './user.options';
import { RegisterSchema } from './user.schema';

export const registerHandler: RegisterHandler = async (request, reply) => {
  const { name, phoneNumber } = request.body;

  const user = await getUser(phoneNumber);

  if (user) return reply.badRequest('Phone number is already taken');

  // TODO: Implementing phone number verification

  const { id } = await createUser({ name, phoneNumber });

  return reply.code(201).send({ id });
};

export const loginHandler: LoginHandler = async (request, reply) => {
  const { phoneNumber } = request.body;

  const user = await getUser(phoneNumber);

  if (user == null) return reply.badRequest('Phone number is not found');

  // TODO: Implementing phone number verification

  return { id: user.id };
};

async function getUser(phoneNumber: string) {
  return await commitToDB(prisma.user.findUnique({ where: { phoneNumber } }));
}

async function createUser({ name, phoneNumber }: RegisterSchema) {
  return await commitToDB(prisma.user.create({ data: { name, phoneNumber } }));
}
