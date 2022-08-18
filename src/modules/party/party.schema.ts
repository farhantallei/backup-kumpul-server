import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';
import { phoneRegExp } from '../../libs';

const dateSchema = z.preprocess((arg) => {
  if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
}, z.date().min(new Date()));

const partyModel = {
  id: z.string().cuid(),
  hostId: z.string().cuid(),
  name: z.string().min(3),
  private: z.boolean(),
  memberLimit: z.optional(z.number()),
  pollChoice: z.array(dateSchema).min(1),
  pollEndsAt: dateSchema,
  createdAt: z.date(),
};

const candidateModel = {
  phoneNumber: z.string().regex(phoneRegExp()),
  name: z.string().min(3),
  admin: z.boolean(),
};

const candidates = z.array(z.object(candidateModel));

const createPartySchema = z.object({
  hostId: partyModel.hostId,
  name: partyModel.name,
  private: partyModel.private,
  memberLimit: partyModel.memberLimit,
  pollChoice: partyModel.pollChoice,
  pollEndsAt: partyModel.pollEndsAt,
  candidates,
});
// const joinPartySchema = z.object({ phoneNumber });
const replySchema = z.object({
  id: partyModel.id,
  name: partyModel.name,
  admins: z.array(candidateModel.name),
  createdAt: partyModel.createdAt,
});

const { schemas: partySchemas, $ref } = buildJsonSchemas(
  { createPartySchema, replySchema },
  { $id: 'party' }
);

export { $ref };

export type CreatePartySchema = z.infer<typeof createPartySchema>;

export interface CreatePartyRoute {
  Body: CreatePartySchema;
  Reply: z.infer<typeof replySchema>;
}

export default partySchemas;
