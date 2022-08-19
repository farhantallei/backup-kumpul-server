import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { LoginHandler, RegisterHandler } from './user.controller';
import { LoginSchema, RegisterSchema } from './user.schema';

const userRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.post('/register', {
    schema: RegisterSchema,
    handler: RegisterHandler,
  });
  route.post('/login', {
    schema: LoginSchema,
    handler: LoginHandler,
  });
};

export default userRoutes;
