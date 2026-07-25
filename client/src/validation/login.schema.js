import { z } from 'zod';

import { emailSchema, loginPasswordSchema } from '@/validation/auth.rules';

export const loginSchema = z.object({
   email: emailSchema,
   password: loginPasswordSchema
});
