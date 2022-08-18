import app from '../app';

export async function commitToDB<T>(prisma: Promise<T>) {
  const [error, data] = await app.to(prisma);
  if (error) {
    app.error = error;
    return undefined as never;
  }
  return data;
}
