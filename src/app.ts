import fastifySensible from '@fastify/sensible';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { partyRoutes, userRoutes } from './modules/routes';

const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

export function addPlugins() {
  app.register(fastifySensible);
}

export function addRoutes() {
  app.register(
    async (route) => {
      route.register(userRoutes, { prefix: 'accounts' });
      route.register(partyRoutes, { prefix: 'parties' });
    },
    { prefix: 'api' }
  );
}

export default app;
