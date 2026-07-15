<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Facades\Socialite;

class AuthService
{
   public function register(array $data): User
   {
      return User::create([
         'name' => $data['name'],
         'email' => $data['email'],
         'password' => Hash::make($data['password']),
      ]);
   }

   public function login(array $credentials): array
   {
      $user = User::where('email', $credentials['email'])->first();

      if (
         !$user ||
         !$user->password ||
         !Hash::check($credentials['password'], $user->password)
      ) {
         throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
         ]);
      }

      return $this->withToken($user);
   }

   public function googleRedirectUrl(): array
   {
      // Use stateless mode because the API does not rely on browser sessions.
      return [
         'url' => Socialite::driver('google')
            ->stateless()
            ->redirect()
            ->getTargetUrl(),
      ];
   }

   public function handleGoogleCallback(): array
   {
      // Retrieve the Google profile from the callback without storing Google tokens.
      $googleUser = Socialite::driver('google')->stateless()->user();

      if (!$googleUser->getEmail()) {
         throw ValidationException::withMessages([
            'email' => ['Google account email is required.'],
         ]);
      }

      $user = $this->findOrCreateGoogleUser($googleUser);

      return $this->withToken($user);
   }

   public function logout(User $user): void
   {
      $user->currentAccessToken()?->delete();
   }

   private function findOrCreateGoogleUser(SocialiteUser $googleUser): User
   {
      // Match by email to avoid duplicate users across auth providers.
      $user = User::where('email', $googleUser->getEmail())->first();

      $data = [
         'name' =>
            $googleUser->getName() ?:
            $googleUser->getNickname() ?:
            $googleUser->getEmail(),
         'avatar' => $googleUser->getAvatar(),
         'provider' => 'google',
         'provider_id' => $googleUser->getId(),
      ];

      if ($user) {
         $user->fill($data);
         $user->save();

         return $user;
      }

      return User::create([...$data, 'email' => $googleUser->getEmail()]);
   }

   private function withToken(User $user): array
   {
      return [
         'user' => $user,
         'access_token' => $user->createToken('fintrack-api')->plainTextToken,
      ];
   }
}
