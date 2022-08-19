import { RouteHandlerTypebox } from '../../types';
import { LoginSchema, RegisterSchema } from './user.schema';
import { createUser, getUser } from './user.service';

export const RegisterHandler: RouteHandlerTypebox<RegisterSchema> = async (
  request,
  reply
) => {
  const { name, phoneNumber } = request.body;

  const user = await getUser(phoneNumber);

  if (user) return reply.badRequest('Phone number is already taken');

  // TODO: Implementing phone number verification

  const { id } = await createUser({ name, phoneNumber });

  return reply.code(201).send({ id });
};

export const LoginHandler: RouteHandlerTypebox<LoginSchema> = async (
  request,
  reply
) => {
  const { phoneNumber } = request.body;

  const user = await getUser(phoneNumber);

  if (user == null) return reply.badRequest('Phone number is not found');

  // TODO: Implementing phone number verification

  return { id: user.id };
};
