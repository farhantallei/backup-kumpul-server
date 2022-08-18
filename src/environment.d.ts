declare module 'fastify' {
  interface FastifyInstance {
    error?: Error;
  }
}

export {};
