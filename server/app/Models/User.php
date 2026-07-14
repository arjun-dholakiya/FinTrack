<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\Contracts\OAuthenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements OAuthenticatable
{
   use HasApiTokens, HasFactory, Notifiable;

   protected $fillable = [
      'name',
      'email',
      'password',
      'avatar',
      'provider',
      'provider_id',
   ];

   protected $hidden = ['password', 'remember_token'];

   protected function casts(): array
   {
      return [
         'email_verified_at' => 'datetime',
         'password' => 'hashed',
      ];
   }

   public function categories()
   {
      return $this->hasMany(Category::class);
   }

   public function transactions()
   {
      return $this->hasMany(Transaction::class);
   }

   public function budgets()
   {
      return $this->hasMany(Budget::class);
   }

   public function goals()
   {
      return $this->hasMany(Goal::class);
   }
}
