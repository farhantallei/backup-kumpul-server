import { Type } from '@sinclair/typebox';
import { phoneRegExp } from '../../libs';

const PartySchema = {
  id: Type.Readonly(Type.RegEx(/^c[^\s-]{8,}$/)),
  hostId: Type.RegEx(/^c[^\s-]{8,}$/),
  name: Type.String({ minLength: 3 }),
  private: Type.Boolean(),
  memberLimit: Type.Optional(Type.Number({ minimum: 1 })),
  pollChoice: Type.Array(Type.String({ format: 'date' }), {
    uniqueItems: true,
  }),
  pollEndsAt: Type.Optional(Type.String({ format: 'date-time' })),
  createdAt: Type.Readonly(Type.String({ format: 'date-time' })),
};

const CandidateSchema = {
  phoneNumber: Type.RegEx(phoneRegExp()),
  name: Type.String({ minLength: 3 }),
  admin: Type.Boolean(),
};

export const CreatePartySchema = {
  body: Type.Object({
    hostId: PartySchema.hostId,
    name: PartySchema.name,
    private: PartySchema.private,
    memberLimit: PartySchema.memberLimit,
    pollChoice: PartySchema.pollChoice,
    pollEndsAt: PartySchema.pollEndsAt,
    candidates: Type.Array(Type.Object(CandidateSchema)),
  }),
  response: {
    201: Type.Object({
      id: PartySchema.id,
      name: PartySchema.name,
      admins: Type.Array(CandidateSchema.name),
      createdAt: PartySchema.createdAt,
    }),
  },
};

export type CreatePartySchema = typeof CreatePartySchema;
