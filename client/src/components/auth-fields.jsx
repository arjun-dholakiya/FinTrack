'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function getFieldErrors(messages = []) {
   return [...new Set(messages)].map((message) => ({ message }));
}

export function PasswordField({
   errors,
   label,
   name,
   showForgotPassword = false
}) {
   const [isVisible, setIsVisible] = useState(false);
   const fieldErrors = getFieldErrors(errors);
   const id = name;

   return (
      <Field data-invalid={fieldErrors.length > 0}>
         <div className="flex items-center justify-between gap-4">
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            {showForgotPassword && (
               <Link
                  className="text-sm font-medium text-primary hover:underline"
                  href="#"
               >
                  Forgot password?
               </Link>
            )}
         </div>
         <div className="relative">
            <Input
               aria-describedby={fieldErrors.length ? `${id}-error` : undefined}
               aria-invalid={fieldErrors.length > 0}
               className="pr-10"
               id={id}
               name={name}
               placeholder={
                  label === 'Confirm password'
                     ? 'Repeat your password'
                     : 'Enter your password'
               }
               type={isVisible ? 'text' : 'password'}
            />
            <button
               aria-label={`${isVisible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
               className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
               onClick={() => setIsVisible(!isVisible)}
               type="button"
            >
               {isVisible ? (
                  <EyeOff className="size-4" />
               ) : (
                  <Eye className="size-4" />
               )}
            </button>
         </div>
         <FieldError errors={fieldErrors} id={`${id}-error`} />
      </Field>
   );
}
