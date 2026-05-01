<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Sector;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index()
    {
        // Récupérer les projets pour le tableau admin
        $projects = Project::latest()->get()->map(function ($project) {
            return[
                'id' => $project->id,
                'title' => $project->getTranslations('title'), // Retourne {fr: '..', en: '..'}
                'created_at' => $project->created_at->format('d/m/Y'),
            ];
        });

        return Inertia::render('Admin/Projects/Index',[
            'projects' => $projects
        ]);
    }

    public function create()
    {
        // On a besoin des secteurs pour les cases à cocher du formulaire
        $sectors = Sector::all()->map(function($sector) {
            return['id' => $sector->id, 'name' => $sector->getTranslations('name')];
        });

        return Inertia::render('Admin/Projects/Create', [
            'sectors' => $sectors
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validation des données
        $validated = $request->validate([
            'title.fr' => 'required|string|max:255',
            'title.en' => 'required|string|max:255',
            'location.fr' => 'required|string',
            'location.en' => 'required|string',
            'context.fr' => 'required|string',
            'context.en' => 'required|string',
            'activities.fr' => 'required|string',
            'activities.en' => 'required|string',
            'expected_results.fr' => 'required|string',
            'expected_results.en' => 'required|string',
            'main_image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048', // 2MB max
            'sector_ids' => 'required|array',
            
            // Infos bancaires exigées par le TdR
            'bank_account.account_name' => 'required|string',
            'bank_account.account_number' => 'required|string',
            'bank_account.bank_name' => 'required|string',
            'bank_account.iban' => 'nullable|string',
            'bank_account.swift' => 'nullable|string',
            'bank_account.country' => 'required|string',
        ]);

        // 2. Upload de l'image principale
        $imagePath = $request->file('main_image')->store('projects', 'public');

        // 3. Création du projet (Spatie Translatable gère automatiquement les tableaux 'fr' et 'en')
        $project = Project::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']['en']), // On crée le slug à partir de l'anglais
            'location' => $validated['location'],
            'context' => $validated['context'],
            'activities' => $validated['activities'],
            'expected_results' => $validated['expected_results'],
            'main_image_path' => '/storage/' . $imagePath,
        ]);

        // 4. Attacher les secteurs
        $project->sectors()->attach($validated['sector_ids']);

        // 5. Créer le compte bancaire polymorphique
        $project->bankAccount()->create($validated['bank_account']);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }
}
