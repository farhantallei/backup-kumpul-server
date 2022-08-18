import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';
import { phoneRegExp } from '../../libs';

const id = z.string().cuid();
const name = z.string().min(3);
const phoneNumber = z.string().regex(phoneRegExp());

const registerSchema = z.object({ name, phoneNumber });
const loginSchema = z.object({ phoneNumber });
const replySchema = z.object({ id });

const { schemas: userSchemas, $ref } = buildJsonSchemas(
  { registerSchema, loginSchema, replySchema },
  { $id: 'user' }
);

export { $ref };

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;

export interface RegisterRoute {
  Body: RegisterSchema;
  Reply: z.infer<typeof replySchema>;
}

export interface LoginRoute {
  Body: LoginSchema;
  Reply: z.infer<typeof replySchema>;
}

export default userSchemas;
