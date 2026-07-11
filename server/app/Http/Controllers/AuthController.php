<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\AuthResource;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
   public function __construct(private readonly AuthService $authService) {}

   public function register(RegisterRequest $request): JsonResponse
   {
      $user = $this->authService->register($request->validated());

      return $this->successResponse(
         new UserResource($user),
         'user Registered Successfully',
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

   public function logout(Request $request): JsonResponse
   {
      $this->authService->logout($request->user());

      return $this->successResponse('user has been logout', 204);
   }

   public function user(Request $request): UserResource
   {
      return new UserResource($request->user());
   }
}
