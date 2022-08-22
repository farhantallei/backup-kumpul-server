import { Type } from '@sinclair/typebox';
import { phoneRegExp } from '../libs';

export const UserSchema = {
  id: Type.RegEx(/^c[^\s-]{8,}$/, {
    errorMessage: { _: 'must match format "cuid"' },
  }),
  name: Type.String({ minLength: 3 }),
  phoneNumber: Type.RegEx(phoneRegExp(), {
    errorMessage: { _: 'must match format "phone-number"' },
  }),
};

export const PartySchema = {
  id: Type.RegEx(/^c[^\s-]{8,}$/, {
    errorMessage: { _: 'must match format "cuid"' },
  }),
  name: Type.String({ minLength: 3 }),
  private: Type.Boolean(),
  memberLimit: Type.Optional(Type.Number({ minimum: 1 })),
  pollChoice: Type.Array(Type.String({ format: 'date' }), {
    uniqueItems: true,
  }),
  pollEndsAt: Type.Optional(Type.String({ format: 'date-time' })),
  createdAt: Type.Readonly(Type.String({ format: 'date-time' })),
};

export const CandidateSchema = {
  partyId: PartySchema.id,
  phoneNumber: Type.RegEx(phoneRegExp(), {
    errorMessage: { _: 'must match format "phone-number"' },
  }),
  name: Type.String({ minLength: 3 }),
  admin: Type.Boolean(),
};

export const MembersOnPartiesSchema = {
  partyId: PartySchema.id,
  memberId: UserSchema.id,
  admin: Type.Boolean(),
  pollVote: Type.Optional(Type.String({ format: 'date' })),
  assignedAt: Type.Readonly(Type.String({ format: 'date-time' })),
};
