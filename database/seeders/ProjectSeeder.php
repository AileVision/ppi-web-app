<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Sector;
use App\Models\ProjectImage;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Création d'un Secteur (Traduisible)
        $sector = Sector::create([
            'slug' => 'education',
            'name' =>[
                'fr' => 'Éducation',
                'en' => 'Education',
            ],
        ]);

        // 2. Création du Projet (Traduisible)
        $project = Project::create([
            'slug' => 'ecole-kpalime',
            'main_image_path' => 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070',
            'title' =>[
                'fr' => 'Construction d\'une école primaire à Kpalimé',
                'en' => 'Construction of a primary school in Kpalime',
            ],
            'location' =>[
                'fr' => 'Village de Kpalimé, Togo',
                'en' => 'Kpalime Village, Togo',
            ],
            'context' =>[
                'fr' => 'Les enfants marchent 10km par jour. Ce projet est vital pour leur éducation.',
                'en' => 'Children walk 10km a day. This project is vital for their education.',
            ],
            'activities' =>[
                'fr' => "• Construction de 3 salles de classe\n• Construction de latrines",
                'en' => "• Construction of 3 classrooms\n• Building latrines",
            ],
            'expected_results' =>[
                'fr' => "• 150 enfants scolarisés\n• Baisse de l'abandon scolaire",
                'en' => "• 150 children in school\n• Drop out rate decrease",
            ]
        ]);

        // Attacher le secteur au projet (Table Pivot)
        $project->sectors()->attach($sector->id);

        // 3. Ajouter la Galerie d'images (Relation HasMany)
        ProjectImage::create(['project_id' => $project->id, 'image_path' => 'https://images.unsplash.com/photo-1511649475669-e288648b2339?q=80', 'sort_order' => 1]);
        ProjectImage::create(['project_id' => $project->id, 'image_path' => 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80', 'sort_order' => 2]);

        // 4. Ajouter les Informations Bancaires (Relation Polymorphique !)
        $project->bankAccount()->create([
            'account_name' => 'PPI - École Kpalimé',
            'account_number' => '001122334455',
            'bank_name' => 'Ecobank Togo',
            'iban' => 'TG42 1234 5678 9012 3456 78',
            'swift' => 'ECOCTGXX',
            'country' => 'Togo'
        ]);
    }
}
