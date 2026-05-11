<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

trait OptimizesImages
{
    /**
     * Redimensionne et convertit une image uploadée en WebP.
     *
     * @param UploadedFile $file Le fichier uploadé
     * @param string $folder Le dossier de destination (ex: 'projects')
     * @param int $maxWidth La largeur maximale (ex: 1200px)
     * @return string Le chemin du fichier enregistré
     */
    public function uploadAndOptimize(UploadedFile $file, string $folder, int $maxWidth = 1200): string
    {
        // 1. Initialiser le gestionnaire d'images avec le driver GD
        $manager = new ImageManager(new Driver());
        
        // 2. Générer un nom de fichier unique avec l'extension .webp
        $filename = uniqid('img_', true) . '.webp';
        $path = $folder . '/' . $filename;

        // 3. Lire l'image originale
        $image = $manager->read($file);

        // 4. Redimensionner l'image proportionnellement (uniquement si elle dépasse $maxWidth)
        $image->scaleDown(width: $maxWidth);

        // 5. Encoder l'image en WebP avec 80% de qualité (excellent ratio poids/qualité)
        $encoded = $image->toWebp(80);

        // 6. Sauvegarder l'image optimisée sur le disque public
        Storage::disk('public')->put($path, $encoded->toString());

        return $path; // Retourne ex: 'projects/img_65ab8...webp'
    }
}