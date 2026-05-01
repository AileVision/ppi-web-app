<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Affiche la liste des projets (Page Découvrir)
     */
    public function index()
    {
        // On récupère tous les projets avec leurs secteurs
        $projects = Project::with('sectors')->latest()->get()->map(function ($project) {
            return[
                'id' => $project->id,
                'slug' => $project->slug,
                // On utilise getTranslations() pour récupérer {fr: '...', en: '...'}
                'title' => $project->getTranslations('title'),
                'location' => $project->getTranslations('location'),
                'context' => $project->getTranslations('context'),
                'main_image_path' => $project->main_image_path,
                'sectors' => $project->sectors->map(function ($sector) {
                    return ['name' => $sector->getTranslations('name')];
                }),
            ];
        });

        return Inertia::render('public/projects/index', [
            'projects' => $projects
        ]);
    }

    /**
     * Affiche le détail d'un projet spécifique (Page Comprendre/Soutenir)
     */
    public function show($slug)
    {
        // On récupère le projet avec TOUTES ses relations (Secteurs, Compte bancaire, Galerie)
        $projectModel = Project::with(['sectors', 'bankAccount', 'images'])->where('slug', $slug)->firstOrFail();

        // On formate les données pour notre composant React Show.tsx
        $project =[
            'id' => $projectModel->id,
            'title' => $projectModel->getTranslations('title'),
            'location' => $projectModel->getTranslations('location'),
            'context' => $projectModel->getTranslations('context'),
            'activities' => $projectModel->getTranslations('activities'),
            'expected_results' => $projectModel->getTranslations('expected_results'),
            'main_image_path' => $projectModel->main_image_path,
            
            // On extrait uniquement les chemins d'images pour la galerie
            'gallery' => $projectModel->images->pluck('image_path'),
            
            'sectors' => $projectModel->sectors->map(function ($sector) {
                return['name' => $sector->getTranslations('name')];
            }),
            
            // Les informations bancaires (relation polymorphique)
            'bank_account' => $projectModel->bankAccount
        ];

        return Inertia::render('public/projects/show', [
            'project' => $project
        ]);
    }
}
