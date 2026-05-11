<?php

// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Settings\ProfileController;
// use App\Http\Controllers\Public\ProjectController;
// use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
// use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Inertia\Inertia;

// // Route::get('/', function () {
// //     return Inertia::render('welcome');
// // })->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


// /*
// |--------------------------------------------------------------------------
// | ROUTES PUBLIQUES (Bilingues)
// |--------------------------------------------------------------------------
// */
// Route::group([
//     'prefix' => LaravelLocalization::setLocale(),
//     'middleware' =>['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
// ], function () {

//     // 1. Home
//     Route::get('/', function () {
//         return Inertia::render('public/home');
//     })->name('home');

//     // 2. Who we are
//     Route::get(LaravelLocalization::transRoute('routes.who_we_are'), function () {
//         return Inertia::render('Public/WhoWeAre');
//     })->name('who-we-are');

//     // 3. What we do
//     Route::get(LaravelLocalization::transRoute('routes.what_we_do'), function () {
//         return Inertia::render('Public/WhatWeDo');
//     })->name('what-we-do');

//     // 4. Transparency & Trust
//     Route::get(LaravelLocalization::transRoute('routes.transparency'), function () {
//         return Inertia::render('Public/Transparency');
//     })->name('transparency');

//     // 5. Contact
//     Route::get(LaravelLocalization::transRoute('routes.contact'), function () {
//         return Inertia::render('Public/Contact');
//     })->name('contact');

//     // 6. Vulnerable People (Personnes vulnérables)
//     Route::get(LaravelLocalization::transRoute('routes.vulnerable_people'), function () {
//         return Inertia::render('Public/VulnerablePeople/Index');
//     })->name('vulnerable-people.index');

//     // // 7. Community Projects (Projets communautaires)
//     // Route::get(LaravelLocalization::transRoute('routes.projects'), function () {
//     //     return Inertia::render('public/projects/index');
//     // })->name('projects.index');
//     // // Détail d'un projet (Temporaire sans contrôleur)
//     // Route::get(LaravelLocalization::transRoute('routes.projects') . '/{slug}', function ($slug) {
//     //     return Inertia::render('public/projects/show');
//     // })->name('projects.show');

//     // 7. Community Projects (Liste)
//     Route::get(LaravelLocalization::transRoute('routes.projects'), [ProjectController::class, 'index'])
//         ->name('projects.index');

//     // 8. Community Projects (Détail)
//     Route::get(LaravelLocalization::transRoute('routes.projects') . '/{slug}',[ProjectController::class, 'show'])
//         ->name('projects.show');

// });


// /*
// |--------------------------------------------------------------------------
// | ROUTES D'ADMINISTRATION (Protégées)
// |--------------------------------------------------------------------------
// */
// Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    
//     // Dashboard Admin
//     Route::get('/dashboard', function () {
//         return Inertia::render('Admin/Dashboard');
//     })->name('dashboard');

//     // Profil (natif Laravel Breeze/Starter Kit)
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

//     // Routes réservées aux administrateurs (Spatie)
//     Route::middleware(['role:admin'])->group(function () {
//         // Tu ajouteras tes CRUDs ici plus tard :
//         Route::resource('projects', AdminProjectController::class);
//         // Route::resource('beneficiaries', AdminBeneficiaryController::class);
//     });
// });

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\ProjectController as PublicProjectController;
use App\Http\Controllers\Public\BeneficiaryController as PublicBeneficiaryController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\BeneficiaryController as AdminBeneficiaryController;
use App\Http\Controllers\Public\PageController; 
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

/*
|--------------------------------------------------------------------------
| ROUTES DU SITE (Publiques & Admin) avec Bilinguisme
|--------------------------------------------------------------------------
*/
Route::group([
    'prefix' => LaravelLocalization::setLocale(),
    'middleware' =>['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
], function () {

    // ==========================================
    // 1. PARTIE PUBLIQUE
    // ==========================================
    Route::get('/', function () { return Inertia::render('public/home'); })->name('home');
    Route::get(LaravelLocalization::transRoute('routes.who_we_are'),[PageController::class, 'whoWeAre'])->name('who-we-are');
    Route::get(LaravelLocalization::transRoute('routes.what_we_do'), [PageController::class, 'whatWeDo'])->name('what-we-do');
    Route::get(LaravelLocalization::transRoute('routes.transparency'),[PageController::class, 'transparency'])->name('transparency');
    Route::get(LaravelLocalization::transRoute('routes.contact'), function () { return Inertia::render('public/contact'); })->name('contact');
    Route::get(LaravelLocalization::transRoute('routes.vulnerable_people'), [PublicBeneficiaryController::class, 'index'])->name('vulnerable-people.index');
    Route::get(LaravelLocalization::transRoute('routes.vulnerable_people') . '/{id}', [PublicBeneficiaryController::class, 'show'])->name('vulnerable-people.show');

    
    // Projets communautaires (via le contrôleur)
    Route::get(LaravelLocalization::transRoute('routes.projects'), [PublicProjectController::class, 'index'])->name('projects.index');
    Route::get(LaravelLocalization::transRoute('routes.projects') . '/{slug}', [PublicProjectController::class, 'show'])->name('projects.show');


    // ==========================================
    // 2. PARTIE ADMINISTRATION (Sécurisée)
    // ==========================================
    Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
        
        // Dashboard
        Route::get('/dashboard', function () {
            return Inertia::render('dashboard');
            // return Inertia::render('Admin/Dashboard');
        })->name('dashboard');

        // Profil
        // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // CRUD accessibles uniquement par l'admin
        Route::middleware(['role:admin'])->group(function () {
            
            Route::resource('projects', AdminProjectController::class);
            
            // CRUD Bénéficiaires (Complet)
            Route::resource('beneficiaries', AdminBeneficiaryController::class);
            // CRUD Catégories (Uniquement Index, Edit et Update pour protéger les 3 catégories obligatoires)
            Route::resource('categories', AdminCategoryController::class)->only(['index', 'edit', 'update']);
            
            // Tu ajouteras les bénéficiaires ici plus tard :
            // Route::resource('beneficiaries', AdminBeneficiaryController::class);
            
        });
    });

});

// Routes d'authentification par défaut (Login, Register, etc.)
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';