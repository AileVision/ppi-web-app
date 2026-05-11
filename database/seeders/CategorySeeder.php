<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories =[
            [
                'slug' => 'enfants-vulnerables',
                'name' =>['fr' => 'Enfants vulnérables', 'en' => 'Vulnerable Children'],
            ],[
                'slug' => 'personnes-malades',
                'name' =>['fr' => 'Personnes malades', 'en' => 'Sick People'],
            ],[
                'slug' => 'personnes-handicap',
                'name' =>['fr' => 'Personnes en situation de handicap', 'en' => 'People with Disabilities'],
            ],
        ];

        foreach ($categories as $catData) {
            $category = Category::firstOrCreate(['slug' => $catData['slug']], $catData);
            
            // On leur crée un compte bancaire vide par défaut s'il n'existe pas
            if (!$category->bankAccount) {
                $category->bankAccount()->create([
                    'account_name' => 'PPI - ' . $catData['name']['fr'],
                    'account_number' => 'À définir',
                    'bank_name' => 'À définir',
                    'country' => 'Togo'
                ]);
            }
        }
    }
}