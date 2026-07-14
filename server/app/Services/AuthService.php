<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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

   public function logout(User $user): void
   {
      $user->currentAccessToken()?->delete();
   }
   private function withToken(User $user): array
   {
      return [
         'user' => $user,
         'access_token' => $user->createToken('fintrack-api')->plainTextToken,
      ];
   }
}
