import { z } from 'zod';

import {
   emailSchema,
   fullNameSchema,
   registerPasswordSchema
} from '@/validation/auth.rules';

export const registerSchema = z
   .object({
      name: fullNameSchema,
      email: emailSchema,
      password: registerPasswordSchema,
      password_confirmation: z.string().superRefine((value, context) => {
         if (!value)
            context.addIssue({
               code: z.ZodIssueCode.custom,
               message: 'Confirm password is required.'
            });
      })
   })
   .superRefine(({ password, password_confirmation }, context) => {
      if (password_confirmation && password !== password_confirmation) {
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords do not match.',
            path: ['password_confirmation']
         });
      }
   });
