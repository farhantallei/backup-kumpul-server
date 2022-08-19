import { Type } from '@sinclair/typebox';
import { phoneRegExp } from '../../libs';

const UserSchema = {
  id: Type.RegEx(/^c[^\s-]{8,}$/),
  name: Type.String({ minLength: 3 }),
  phoneNumber: Type.RegEx(phoneRegExp()),
};

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
