'use client';

import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';

import { PasswordField, getFieldErrors } from '@/components/auth-fields';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
   Field,
   FieldDescription,
   FieldError,
   FieldGroup,
   FieldLabel,
   FieldSeparator
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function RegisterForm({
   errors,
   formError,
   isGoogleLoading,
   isSubmitting,
   onGoogleSignIn,
   onSubmit
}) {
   const nameErrors = getFieldErrors(errors.name);
   const emailErrors = getFieldErrors(errors.email);

   return (
      <Card className="w-full max-w-md shadow-sm">
         <CardHeader className="px-5 pt-6 text-center sm:px-8 sm:pt-8">
            <CardTitle className="text-xl">Create your account</CardTitle>
         </CardHeader>
         <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
            <form noValidate onSubmit={onSubmit}>
               <FieldGroup>
                  {formError && (
                     <FieldError role="alert">{formError}</FieldError>
                  )}
                  <Field data-invalid={nameErrors.length > 0}>
                     <FieldLabel htmlFor="name">Full name</FieldLabel>
                     <Input
                        aria-describedby={
                           nameErrors.length ? 'name-error' : undefined
                        }
                        aria-invalid={nameErrors.length > 0}
                        autoComplete="name"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                     />
                     <FieldError errors={nameErrors} id="name-error" />
                  </Field>
                  <Field data-invalid={emailErrors.length > 0}>
                     <FieldLabel htmlFor="email">Email address</FieldLabel>
                     <Input
                        aria-describedby={
                           emailErrors.length ? 'email-error' : undefined
                        }
                        aria-invalid={emailErrors.length > 0}
                        autoComplete="email"
                        id="email"
                        name="email"
                        inputMode="email"
                        placeholder="john@gmail.com"
                        type="email"
                     />
                     <FieldError errors={emailErrors} id="email-error" />
                  </Field>
                  <PasswordField
                     errors={errors.password}
                     label="Password"
                     name="password"
                  />
                  <PasswordField
                     errors={errors.password_confirmation}
                     label="Confirm password"
                     name="password_confirmation"
                  />
                  <Button
                     className="h-10 w-full"
                     disabled={isSubmitting || isGoogleLoading}
                     type="submit"
                  >
                     {isSubmitting && <LoaderCircle className="animate-spin" />}
                     {isSubmitting ? 'Please wait' : 'Create account'}
                  </Button>
                  <FieldSeparator>or continue with</FieldSeparator>
                  <Button
                     className="h-10 w-full"
                     disabled={isSubmitting || isGoogleLoading}
                     onClick={onGoogleSignIn}
                     type="button"
                     variant="outline"
                  >
                     {isGoogleLoading && (
                        <LoaderCircle className="animate-spin" />
                     )}
                     Continue with Google
                  </Button>
                  <FieldDescription className="pt-1 text-center">
                     Already have an account?{' '}
                     <Link
                        className="font-medium text-primary hover:underline"
                        href="/login"
                     >
                        Sign in
                     </Link>
                  </FieldDescription>
               </FieldGroup>
            </form>
         </CardContent>
      </Card>
   );
}
