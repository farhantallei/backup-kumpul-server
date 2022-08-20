import fastifySensible from '@fastify/sensible';
import fastifySwagger from '@fastify/swagger';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { partyRoutes, userRoutes } from './modules/routes';

const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

export function addPlugins() {
  app.register(fastifySensible);
  app.register(fastifySwagger, {
    routePrefix: '/docs',
    exposeRoute: true,
    staticCSP: true,
    openapi: {
      info: {
        title: 'Kumpul Server',
        version: process.env.npm_package_version,
      },
    },
  });
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
