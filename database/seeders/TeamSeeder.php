<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\TeamMember;

class TeamSeeder extends Seeder
{
    public function run()
    {
        TeamMember::create([
            'full_name' => 'Jean Dupont',
            'type' => 'board',
            'position' =>['fr' => 'Président du Conseil', 'en' => 'Board Chairman'],
            'professional_title' =>['fr' => 'Consultant Senior', 'en' => 'Senior Consultant'],
            'role_description' =>['fr' => 'Veille à la bonne gouvernance.', 'en' => 'Ensures good governance.'],
            'sort_order' => 1
        ]);

        TeamMember::create([
            'full_name' => 'Aya Kossi',
            'type' => 'staff',
            'position' => ['fr' => 'Directrice Exécutive', 'en' => 'Executive Director'],
            'role_description' =>['fr' => 'Coordination des projets.', 'en' => 'Project coordination.'],
            'sort_order' => 2
        ]);
    }
}