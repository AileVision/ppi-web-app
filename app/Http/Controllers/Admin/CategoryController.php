<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with(['bankAccount', 'beneficiaries'])->get()->map(function ($category) {
            return[
                'id' => $category->id,
                'name' => $category->getTranslations('name'),
                'bank_account' => $category->bankAccount,
                'beneficiaries_count' => $category->beneficiaries->count(),
            ];
        });

        return Inertia::render('admin/categories/index',['categories' => $categories]);
    }

    public function create()
    {
        return Inertia::render('admin/categories/create');
    }

    public function store(StoreCategoryRequest $request)
    {
        $validated = $request->validated();

        $category = Category::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']['en'] ?? $validated['name']['fr']),
        ]);

        if (!empty(array_filter($validated['bank_account'] ?? []))) {
            $category->bankAccount()->create($validated['bank_account']);
        }

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully.');
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

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $validated = $request->validated();

        $category->update(['name' => $validated['name']]);
        
        $category->bankAccount()->updateOrCreate([
            'bankable_id' => $category->id,
            'bankable_type' => Category::class,
        ], $validated['bank_account']);

        return redirect()->route('admin.categories.index')->with('success', 'Category and Bank info updated!');
    }

    public function destroy(Category $category)
    {
        if ($category->beneficiaries()->exists()) {
            return redirect()->route('admin.categories.index')
                ->with('error', 'Unable to delete category while beneficiaries are assigned to it.');
        }

        $category->bankAccount?->delete();
        $category->delete();

        return redirect()->route('admin.categories.index')->with('success', 'Category deleted successfully.');
    }
}
