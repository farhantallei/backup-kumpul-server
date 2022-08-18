import fastifySensible from '@fastify/sensible';
import fastify from 'fastify';
import { partyRoutes, userRoutes } from './modules/routes';
import { partySchemas, userSchemas } from './modules/schemas';

const app = fastify();

export function addPlugins() {
  app.register(fastifySensible);
}

export function addDecorates() {
  app.decorate('error', undefined);
}

export function addRoutes() {
  for (const schema of [...userSchemas, ...partySchemas]) {
    app.addSchema(schema);
  }
  app.register(
    async (route) => {
      route.register(userRoutes, { prefix: 'accounts' });
      route.register(partyRoutes, { prefix: 'parties' });
    },
    { prefix: 'api' }
  );
}

export default app;
