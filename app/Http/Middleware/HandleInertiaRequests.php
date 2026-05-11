<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        // Récupérer la langue actuelle
        $locale = app()->getLocale();

        // Charger le fichier JSON de traduction s'il existe (ex: lang/fr.json)
        $translations = file_exists(base_path("lang/{$locale}.json")) 
            ? json_decode(file_get_contents(base_path("lang/{$locale}.json")), true) 
            :[];

        // Gestion de l'utilisateur avec ses rôles Spatie
        $user = $request->user();
        $userData = $user ? array_merge($user->toArray(),[
            'roles' => $user->getRoleNames(), // Spatie
            'permissions' => $user->getAllPermissions()->pluck('name'), // Spatie
        ]) : null;
        
        
        return array_merge(parent::share($request), [
            ...parent::share($request),
            // 'name' => config('app.name'),
            // 'quote' => ['message' => trim($message), 'author' => trim($author)],
            // 'auth' => [
            //     'user' => $request->user(),
            // ],
            'name' => config('app.name'),
            'quote' =>['message' => trim($message), 'author' => trim($author)],
            'locale' => $locale,              // <-- Envoyé à React
            'translations' => $translations,  // <-- Envoyé à React
            'auth' => [
                'user' => $userData,          // <-- User enrichi avec ses rôles
            ],
            'localesUrls' =>[
                'fr' => LaravelLocalization::getLocalizedURL('fr'),
                'en' => LaravelLocalization::getLocalizedURL('en'),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
