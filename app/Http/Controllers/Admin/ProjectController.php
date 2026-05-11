<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Sector;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

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

        return Inertia::render('admin/projects/index',[
            'projects' => $projects
        ]);
    }

    public function create()
    {
        // On a besoin des secteurs pour les cases à cocher du formulaire
        $sectors = Sector::all()->map(function($sector) {
            return['id' => $sector->id, 'name' => $sector->getTranslations('name')];
        });

        return Inertia::render('admin/projects/create', [
            'sectors' => $sectors
        ]);
    }


    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();

        // 2. Upload de l'image principale
        $mainImagePath = $request->file('main_image')->store('projects', 'public');

        // 3. Création du projet (Spatie Translatable gère automatiquement les tableaux 'fr' et 'en')
        $project = Project::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']['en']) . '-' . uniqid(), // uniqid pour éviter les doublons
            'location' => $validated['location'],
            'context' => $validated['context'],
            'activities' => $validated['activities'],
            'expected_results' => $validated['expected_results'],
            'main_image_path' => '/storage/' . $mainImagePath,
        ]);

        // 4. Attacher les secteurs
        $project->sectors()->attach($validated['sector_ids']);

        // 5. Créer le compte bancaire
        $project->bankAccount()->create($validated['bank_account']);

        // 6. UPLOAD DE LA GALERIE (Nouveau !)
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $index => $image) {
                // On stocke dans un sous-dossier 'projects/gallery'
                $galleryPath = $image->store('projects/gallery', 'public');
                
                // On crée l'entrée dans la table project_images via la relation
                $project->images()->create([
                    'image_path' => '/storage/' . $galleryPath,
                    'sort_order' => $index, // Pour garder l'ordre d'upload
                ]);
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    /**
     * Affiche le formulaire d'édition
     */
    public function edit(Project $project)
    {
        $project->load(['sectors', 'bankAccount', 'images']);

        return Inertia::render('admin/projects/edit', [
            'project' => [
                'id' => $project->id,
                'title' => $project->getTranslations('title'),
                'location' => $project->getTranslations('location'),
                'context' => $project->getTranslations('context'),
                'activities' => $project->getTranslations('activities'),
                'expected_results' => $project->getTranslations('expected_results'),
                'sector_ids' => $project->sectors->pluck('id'),
                'bank_account' => $project->bankAccount,
                'main_image_path' => $project->main_image_path,
                'existing_gallery' => $project->images, // Pour afficher les images actuelles
            ],
            'sectors' => Sector::all()->map(fn($s) => ['id' => $s->id, 'name' => $s->getTranslations('name')])
        ]);
    }

    /**
     * Met à jour le projet en base de données
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validated = $request->validated();

        // Mise à jour de l'image principale SEULEMENT si une nouvelle est fournie
        if ($request->hasFile('main_image')) {
            // Optionnel : Supprimer l'ancienne image du serveur
            $oldPath = str_replace('/storage/', '', $project->main_image_path);
            Storage::disk('public')->delete($oldPath);
            
            $imagePath = $request->file('main_image')->store('projects', 'public');
            $project->main_image_path = '/storage/' . $imagePath;
        }

        // Mise à jour des textes
        $project->update([
            'title' => $validated['title'],
            'location' => $validated['location'],
            'context' => $validated['context'],
            'activities' => $validated['activities'],
            'expected_results' => $validated['expected_results'],
        ]);

        $project->sectors()->sync($validated['sector_ids']);
        $project->bankAccount()->update($validated['bank_account']);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully!');
    }

    /**
     * Supprime le projet
     */
    public function destroy(Project $project)
    {
        // Supprimer le compte bancaire lié et le projet
        $project->bankAccount()->delete();
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
