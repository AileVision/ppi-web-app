<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Beneficiary;
use Inertia\Inertia;

class BeneficiaryController extends Controller
{
    /**
     * Page de liste (Découvrir les catégories et les personnes)
     */
    public function index()
    {
        // On récupère toutes les catégories et on inclut leurs bénéficiaires
        $categories = Category::with(['beneficiaries' => function($query) {
            $query->latest();
        }])->get()->map(function ($cat) {
            return[
                'id' => $cat->id,
                'slug' => $cat->slug,
                'name' => $cat->getTranslations('name'),
                'beneficiaries' => $cat->beneficiaries->map(function ($ben) {
                    return[
                        'id' => $ben->id,
                        'first_name' => $ben->first_name,
                        'age' => $ben->age,
                        'location' => $ben->location,
                        // On coupe la situation à 100 caractères pour l'aperçu de la carte
                        'situation_excerpt' =>[
                            'fr' => str()->limit($ben->getTranslation('situation', 'fr'), 100),
                            'en' => str()->limit($ben->getTranslation('situation', 'en'), 100),
                        ],
                        'photo_path' => $ben->photo_path,
                    ];
                })
            ];
        });

        return Inertia::render('public/vulnerable-people/index', [
            'categories' => $categories
        ]);
    }

    /**
     * Page de détail (Comprendre la situation et Soutenir)
     */
    public function show($id)
    {
        // On récupère le bénéficiaire AVEC sa catégorie ET le compte bancaire de la catégorie
        $beneficiaryModel = Beneficiary::with(['category.bankAccount'])->findOrFail($id);

        $beneficiary =[
            'id' => $beneficiaryModel->id,
            'first_name' => $beneficiaryModel->first_name,
            'age' => $beneficiaryModel->age,
            'gender' => $beneficiaryModel->gender,
            'location' => $beneficiaryModel->location,
            'situation' => $beneficiaryModel->getTranslations('situation'),
            'needs' => $beneficiaryModel->getTranslations('needs'),
            'photo_path' => $beneficiaryModel->photo_path,
            
            // On inclut les données de la catégorie (notamment pour la banque)
            'category' =>[
                'name' => $beneficiaryModel->category->getTranslations('name'),
                'bank_account' => $beneficiaryModel->category->bankAccount,
            ]
        ];

        return Inertia::render('public/vulnerable-people/show',[
            'beneficiary' => $beneficiary
        ]);
    }
}