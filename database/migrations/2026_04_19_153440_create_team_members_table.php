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
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->json('position'); // Traduisible (ex: Executive Director / Directeur Exécutif)
            $table->json('professional_title')->nullable(); // Traduisible
            $table->json('role_description'); // Traduisible
            $table->enum('type', ['board', 'staff']); // Différencie le CA du Personnel
            $table->string('photo_path')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};
