'use client';

import { useState } from 'react';

import { LoginForm } from '@/components/login-form';
import { RegisterForm } from '@/components/register-form';
import { loginSchema } from '@/validation/login.schema';
import { registerSchema } from '@/validation/register.schema';

const API_URL = (
   process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
).replace(/\/$/, '');
const SERVER_ORIGIN = API_URL.replace(/\/api$/, '');

const getErrorMessage = (responseBody) =>
   responseBody?.message || 'Something went wrong. Please try again.';

export function AuthFormController({ mode }) {
   const isRegister = mode === 'register';
   const [isGoogleLoading, setIsGoogleLoading] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [formError, setFormError] = useState('');
   const [errors, setErrors] = useState({});

   async function handleSubmit(event) {
      event.preventDefault();
      setFormError('');
      setErrors({});

      const formData = new FormData(event.currentTarget);
      const values = Object.fromEntries(formData.entries());
      const schema = isRegister ? registerSchema : loginSchema;
      const validation = schema.safeParse(values);

      if (!validation.success) {
         setErrors(validation.error.flatten().fieldErrors);
         return;
      }

      const payload = isRegister
         ? validation.data
         : { email: validation.data.email, password: validation.data.password };
      setIsSubmitting(true);

      try {
         const response = await fetch(
            `${API_URL}/${isRegister ? 'register' : 'login'}`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json'
               },
               body: JSON.stringify(payload)
            }
         );
         const responseBody = await response.json().catch(() => null);

         if (!response.ok) {
            setErrors(responseBody?.errors || {});
            setFormError(
               responseBody?.errors
                  ? 'Please correct the highlighted fields.'
                  : getErrorMessage(responseBody)
            );
            return;
         }

         const accessToken = responseBody?.data?.access_token;
         if (accessToken)
            window.localStorage.setItem('fintrack_access_token', accessToken);
         window.location.assign(isRegister ? '/login?registered=true' : '/');
      } catch {
         setFormError(
            'Unable to reach the server. Please check your connection and try again.'
         );
      } finally {
         setIsSubmitting(false);
      }
   }

   async function handleGoogleSignIn() {
      setIsGoogleLoading(true);
      setFormError('');

      try {
         const response = await fetch(`${SERVER_ORIGIN}/auth/google/redirect`, {
            headers: { Accept: 'application/json' }
         });
         const responseBody = await response.json().catch(() => null);
         const redirectUrl = responseBody?.data?.url;
         if (!response.ok || !redirectUrl)
            throw new Error(getErrorMessage(responseBody));
         window.location.assign(redirectUrl);
      } catch (error) {
         setFormError(
            error.message ||
               'Google sign-in is unavailable right now. Please try again later.'
         );
         setIsGoogleLoading(false);
      }
   }

   const props = {
      errors,
      formError,
      isGoogleLoading,
      isSubmitting,
      onGoogleSignIn: handleGoogleSignIn,
      onSubmit: handleSubmit
   };

   return isRegister ? <RegisterForm {...props} /> : <LoginForm {...props} />;
}
