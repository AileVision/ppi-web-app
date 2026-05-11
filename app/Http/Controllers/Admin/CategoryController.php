<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('bankAccount')->get()->map(function ($category) {
            return[
                'id' => $category->id,
                'name' => $category->getTranslations('name'),
                'bank_account' => $category->bankAccount,
            ];
        });

        return Inertia::render('admin/categories/index',['categories' => $categories]);
    }

    public function edit(Category $category)
    {
        $category->load('bankAccount');
        
        return Inertia::render('admin/categories/edit',[
            'category' =>[
                'id' => $category->id,
                'name' => $category->getTranslations('name'),
                'bank_account' => $category->bankAccount,
            ]
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name.fr' => 'required|string|max:255',
            'name.en' => 'required|string|max:255',
            // Infos bancaires de la catégorie
            'bank_account.account_name' => 'required|string',
            'bank_account.account_number' => 'required|string',
            'bank_account.bank_name' => 'required|string',
            'bank_account.iban' => 'nullable|string',
            'bank_account.swift' => 'nullable|string',
            'bank_account.country' => 'required|string',
        ]);

        $category->update(['name' => $validated['name']]);
        
        // UpdateOrCreate permet de mettre à jour le compte, ou de le créer s'il manquait
        $category->bankAccount()->updateOrCreate(['bankable_id' => $category->id, 'bankable_type' => Category::class],
            $validated['bank_account']
        );

        return redirect()->route('admin.categories.index')->with('success', 'Category and Bank info updated!');
    }
}
