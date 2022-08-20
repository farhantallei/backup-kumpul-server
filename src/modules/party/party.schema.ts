import { Type } from '@sinclair/typebox';
import {
  CandidateSchema,
  MembersOnPartiesSchema,
  PartySchema,
  UserSchema,
} from '../../schemas';

export const CreatePartySchema = {
  body: Type.Object({
    hostId: UserSchema.id,
    name: PartySchema.name,
    private: PartySchema.private,
    memberLimit: PartySchema.memberLimit,
    pollChoice: PartySchema.pollChoice,
    pollEndsAt: PartySchema.pollEndsAt,
    candidates: Type.Array(
      Type.Object({
        phoneNumber: CandidateSchema.phoneNumber,
        name: CandidateSchema.name,
        admin: CandidateSchema.admin,
      })
    ),
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

export type CreatePartyTSchema = typeof CreatePartySchema;

export const JoinPartySchema = {
  body: Type.Object({
    userId: UserSchema.id,
  }),
  params: Type.Object({
    partyId: PartySchema.id,
  }),
  response: {
    200: Type.Object({
      partyId: MembersOnPartiesSchema.partyId,
      memberId: MembersOnPartiesSchema.memberId,
      admin: MembersOnPartiesSchema.admin,
      assignedAt: MembersOnPartiesSchema.assignedAt,
    }),
  },
};

export type JoinPartyTSchema = typeof JoinPartySchema;
