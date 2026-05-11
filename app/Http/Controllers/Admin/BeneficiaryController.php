<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Beneficiary;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BeneficiaryController extends Controller
{
    public function index()
    {
        $beneficiaries = Beneficiary::with('category')->latest()->get()->map(function ($ben) {
            return[
                'id' => $ben->id,
                'first_name' => $ben->first_name,
                'age' => $ben->age,
                'category' => $ben->category->getTranslations('name'),
                'photo_path' => $ben->photo_path,
            ];
        });

        return Inertia::render('admin/beneficiaries/index', ['beneficiaries' => $beneficiaries]);
    }

    public function create()
    {
        $categories = Category::all()->map(fn($cat) =>['id' => $cat->id, 'name' => $cat->getTranslations('name')]);
        
        return Inertia::render('admin/beneficiaries/create', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'first_name' => 'required|string|max:255',
            'age' => 'required|integer|min:0|max:120',
            'gender' => 'nullable|string',
            'location' => 'nullable|string',
            'situation.fr' => 'required|string|max:500', // TdR: description courte (5 à 8 lignes)
            'situation.en' => 'required|string|max:500',
            'needs.fr' => 'required|string',
            'needs.en' => 'required|string',
            'photo' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $photoPath = $request->file('photo')->store('beneficiaries', 'public');

        Beneficiary::create([
            'category_id' => $validated['category_id'],
            'first_name' => $validated['first_name'],
            'age' => $validated['age'],
            'gender' => $validated['gender'],
            'location' => $validated['location'],
            'situation' => $validated['situation'],
            'needs' => $validated['needs'],
            'photo_path' => '/storage/' . $photoPath,
        ]);

        return redirect()->route('admin.beneficiaries.index')->with('success', 'Beneficiary added successfully!');
    }

    public function edit(Beneficiary $beneficiary)
    {
        return Inertia::render('admin/beneficiaries/edit', [
            'beneficiary' =>[
                'id' => $beneficiary->id,
                'category_id' => $beneficiary->category_id,
                'first_name' => $beneficiary->first_name,
                'age' => $beneficiary->age,
                'gender' => $beneficiary->gender,
                'location' => $beneficiary->location,
                'situation' => $beneficiary->getTranslations('situation'),
                'needs' => $beneficiary->getTranslations('needs'),
                'photo_path' => $beneficiary->photo_path,
            ],
            'categories' => Category::all()->map(fn($cat) =>['id' => $cat->id, 'name' => $cat->getTranslations('name')])
        ]);
    }

    public function update(Request $request, Beneficiary $beneficiary)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'first_name' => 'required|string|max:255',
            'age' => 'required|integer|min:0|max:120',
            'gender' => 'nullable|string',
            'location' => 'nullable|string',
            'situation.fr' => 'required|string|max:500',
            'situation.en' => 'required|string|max:500',
            'needs.fr' => 'required|string',
            'needs.en' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('beneficiaries', 'public');
            $beneficiary->photo_path = '/storage/' . $photoPath;
        }

        $beneficiary->update([
            'category_id' => $validated['category_id'],
            'first_name' => $validated['first_name'],
            'age' => $validated['age'],
            'gender' => $validated['gender'],
            'location' => $validated['location'],
            'situation' => $validated['situation'],
            'needs' => $validated['needs'],
        ]);

        return redirect()->route('admin.beneficiaries.index')->with('success', 'Beneficiary updated successfully!');
    }

    public function destroy(Beneficiary $beneficiary)
    {
        $beneficiary->delete();
        return redirect()->route('admin.beneficiaries.index')->with('success', 'Beneficiary deleted.');
    }
}