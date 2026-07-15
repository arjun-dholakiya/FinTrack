<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\AuthResource;
use App\Http\Resources\UserResource;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
   public function __construct(private readonly AuthService $authService) {}

   public function register(RegisterRequest $request): JsonResponse
   {
      $user = $this->authService->register($request->validated());

      return $this->successResponse(
         new UserResource($user),
         'user registered successfully',
         201,
      );
   }

   public function login(LoginRequest $request): JsonResponse
   {
      $result = $this->authService->login($request->validated());

      return $this->successResponse(
         new AuthResource($result),
         'user loggedin successfully',
      );
   }

   public function googleRedirect(): JsonResponse
   {
      // Return the Google OAuth URL so the frontend can redirect the user
      $result = $this->authService->googleRedirectUrl();

      return $this->successResponse(
         $result,
         'google redirect url generated successfully',
      );
   }

   public function googleCallback(): JsonResponse
   {
      // Handle Google's callback and return a Sanctum token as JSON.
      $result = $this->authService->handleGoogleCallback();

      return $this->successResponse(
         new AuthResource($result),
         'user loggedin successfully',
      );
   }

   public function logout(Request $request): JsonResponse
   {
      $this->authService->logout($request->user());

      return $this->successResponse('null', 'user has been logout', 204);
   }
}
