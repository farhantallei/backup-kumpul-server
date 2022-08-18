import { FastifyPluginAsync } from 'fastify';
import { loginOpts, registerOpts } from './user.options';

const userRoutes: FastifyPluginAsync = async (route) => {
  route.post('/register', registerOpts);
  route.post('/login', loginOpts);
};

export default userRoutes;
