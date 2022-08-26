import { Type } from '@sinclair/typebox';
import { UserSchema } from '../../schemas';

export const UserValidationSchema = {
  params: Type.Object({
    userId: UserSchema.id,
  }),
};

export type UserValidationTSchema = typeof UserValidationSchema;

export const RegisterSchema = {
  body: Type.Object({
    name: UserSchema.name,
    phoneNumber: UserSchema.phoneNumber,
  }),
  response: {
    201: Type.Object({ id: UserSchema.id }),
  },
};

export type RegisterTSchema = typeof RegisterSchema;

export const LoginSchema = {
  body: Type.Object({
    phoneNumber: UserSchema.phoneNumber,
  }),
  response: {
    200: Type.Object({ id: UserSchema.id }),
  },
};

export type LoginTSchema = typeof LoginSchema;
