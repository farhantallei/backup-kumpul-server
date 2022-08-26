import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  LoginHandler,
  RegisterHandler,
  UserValidationHandler,
} from './user.controller';
import {
  LoginSchema,
  RegisterSchema,
  UserValidationSchema,
} from './user.schema';

const userRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.get('/:userId', {
    schema: UserValidationSchema,
    handler: UserValidationHandler,
  });
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
