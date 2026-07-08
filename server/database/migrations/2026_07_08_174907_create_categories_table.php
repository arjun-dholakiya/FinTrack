<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained();

                $table->string('name');

            $table->string('type', 20); // income | expense

            $table->text('icon')->nullable();

            $table->string('color', 50)->nullable();

            $table->timestampsTz();

            // Prevent duplicate category names for same user
            $table->unique(['user_id', 'name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
