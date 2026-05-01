<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleAndAdminSeeder extends Seeder
{
    public function run(): void
    {
        // Création du rôle
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        // Création de l'utilisateur admin pour PPI
        $user = User::firstOrCreate(
            ['email' => 'admin@ppi.org'],[
                'name' => 'Admin PPI',
                'password' => Hash::make('password123'), // À changer en prod !
            ]
        );

        // Assignation du rôle
        $user->assignRole($adminRole);
    }
}