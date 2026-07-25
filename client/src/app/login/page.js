import { AuthFormController } from '@/components/auth-form-controller';

export default function LoginPage() {
   return (
      <main className="flex min-h-svh items-center justify-center bg-muted/40 px-4 py-8 sm:px-6">
         <AuthFormController mode="login" />
      </main>
   );
}
