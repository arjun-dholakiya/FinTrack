import { z } from 'zod';

const namePattern = /^[A-Za-z ]+$/;
const uppercasePattern = /[A-Z]/;
const lowercasePattern = /[a-z]/;
const numberPattern = /\d/;
const specialCharacterPattern = /[^A-Za-z0-9]/;

export const emailSchema = z
   .string()
   .trim()
   .superRefine((value, context) => {
      if (!value) {
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Email address is required.'
         });
         return;
      }

      if (!z.string().email().safeParse(value).success) {
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please enter a valid email address.'
         });
      }
   });

export const loginPasswordSchema = z.string().superRefine((value, context) => {
   if (!value)
      context.addIssue({
         code: z.ZodIssueCode.custom,
         message: 'Password is required.'
      });
});

export const fullNameSchema = z
   .string()
   .trim()
   .superRefine((value, context) => {
      if (!value) {
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Full name is required.'
         });
         return;
      }

      if (value.length < 2)
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Full name must be at least 2 characters.'
         });
      if (value.length > 50)
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Full name must not exceed 50 characters.'
         });
      if (!namePattern.test(value))
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Full name can only contain letters and spaces.'
         });
   });

export const registerPasswordSchema = z
   .string()
   .superRefine((value, context) => {
      if (!value) {
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password is required.'
         });
         return;
      }

      if (value.length < 8)
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must be at least 8 characters.'
         });
      if (value.length > 32)
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must not exceed 32 characters.'
         });
      if (!uppercasePattern.test(value))
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must contain at least one uppercase letter.'
         });
      if (!lowercasePattern.test(value))
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must contain at least one lowercase letter.'
         });
      if (!numberPattern.test(value))
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must contain at least one number.'
         });
      if (!specialCharacterPattern.test(value))
         context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must contain at least one special character.'
         });
   });
