<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->json('title'); // Traduisible
            $table->string('slug')->unique();
            $table->json('location'); // Traduisible ou string simple
            $table->json('context'); // Traduisible (Contexte et problématique)
            $table->json('activities'); // Traduisible
            $table->json('expected_results'); // Traduisible
            $table->string('main_image_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
