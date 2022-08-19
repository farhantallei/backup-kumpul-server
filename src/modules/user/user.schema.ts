import { Type } from '@sinclair/typebox';
import { UserSchema } from '../../schemas';

export const RegisterSchema = {
  body: Type.Object({
    name: UserSchema.name,
    phoneNumber: UserSchema.phoneNumber,
  }),
  response: {
    201: Type.Object({ id: UserSchema.id }),
  },
};

export const LoginSchema = {
  body: Type.Object({
    phoneNumber: UserSchema.phoneNumber,
  }),
  response: {
    200: Type.Object({ id: UserSchema.id }),
  },
};

export type RegisterSchema = typeof RegisterSchema;
export type LoginSchema = typeof LoginSchema;
