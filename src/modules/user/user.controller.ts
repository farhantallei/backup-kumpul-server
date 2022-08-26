import { RouteHandlerTypebox } from '../../types';
import {
  LoginTSchema,
  RegisterTSchema,
  UserValidationTSchema,
} from './user.schema';
import { createUser, getUser, getUserById } from './user.service';

export const UserValidationHandler: RouteHandlerTypebox<
  UserValidationTSchema
> = async (request, reply) => {
  const { userId } = request.params;

  const user = await getUserById(reply, { id: userId });

  if (user == null) return reply.unauthorized('Not authenticated');

  return reply.code(204).send();
};

export const RegisterHandler: RouteHandlerTypebox<RegisterTSchema> = async (
  request,
  reply
) => {
  const { name, phoneNumber } = request.body;

  const user = await getUser(reply, { phoneNumber });

  if (user) return reply.badRequest('Phone number is already taken');

  // TODO: Implementing phone number verification

  const { id } = await createUser(reply, { name, phoneNumber });

  return reply.code(201).send({ id });
};

export const LoginHandler: RouteHandlerTypebox<LoginTSchema> = async (
  request,
  reply
) => {
  const { phoneNumber } = request.body;

  const user = await getUser(reply, { phoneNumber });

  if (user == null) return reply.notFound('Phone number is not found');

  // TODO: Implementing phone number verification

  return { id: user.id };
};
