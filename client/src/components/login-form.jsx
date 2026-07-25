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

export function LoginForm({
   errors,
   formError,
   isGoogleLoading,
   isSubmitting,
   onGoogleSignIn,
   onSubmit
}) {
   const emailErrors = getFieldErrors(errors.email);

   return (
      <Card className="w-full max-w-md shadow-sm">
         <CardHeader className="px-5 pt-6 text-center sm:px-8 sm:pt-8">
            <CardTitle className="text-xl">Welcome back</CardTitle>
         </CardHeader>
         <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
            <form noValidate onSubmit={onSubmit}>
               <FieldGroup>
                  {formError && (
                     <FieldError role="alert">{formError}</FieldError>
                  )}
                  <Field data-invalid={emailErrors.length > 0}>
                     <FieldLabel htmlFor="email">Email address</FieldLabel>
                     <Input
                        aria-describedby={
                           emailErrors.length ? 'email-error' : undefined
                        }
                        aria-invalid={emailErrors.length > 0}
                        autoComplete="email"
                        id="email"
                        inputMode="email"
                        name="email"
                        placeholder="you@example.com"
                        type="email"
                     />
                     <FieldError errors={emailErrors} id="email-error" />
                  </Field>
                  <PasswordField
                     errors={errors.password}
                     label="Password"
                     name="password"
                     showForgotPassword
                  />
                  <label className="flex w-fit items-center gap-2 text-sm text-muted-foreground">
                     <input
                        className="size-4 rounded border-input accent-primary"
                        name="remember"
                        type="checkbox"
                     />
                     Remember me
                  </label>
                  <Button
                     className="h-10 w-full"
                     disabled={isSubmitting || isGoogleLoading}
                     type="submit"
                  >
                     {isSubmitting && <LoaderCircle className="animate-spin" />}
                     {isSubmitting ? 'Please wait' : 'Sign in'}
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
                     New to FinTrack?{' '}
                     <Link
                        className="font-medium text-primary hover:underline"
                        href="/register"
                     >
                        Create an account
                     </Link>
                  </FieldDescription>
               </FieldGroup>
            </form>
         </CardContent>
      </Card>
   );
}
