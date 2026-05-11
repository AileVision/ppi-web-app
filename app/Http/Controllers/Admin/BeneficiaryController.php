<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBeneficiaryRequest;
use App\Http\Requests\UpdateBeneficiaryRequest;
use App\Models\Beneficiary;
use App\Models\Category;
use Inertia\Inertia;
use App\Traits\OptimizesImages;
use Illuminate\Support\Facades\Storage;

class BeneficiaryController extends Controller
{
    use OptimizesImages;

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

    public function store(StoreBeneficiaryRequest $request)
    {
        $validated = $request->validated();

        // $photoPath = $request->file('photo')->store('beneficiaries', 'public');
        // UPLOAD OPTIMISÉ (600px max pour les portraits)
        $photoPath = $this->uploadAndOptimize($request->file('photo'), 'beneficiaries', 600);

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

    public function update(UpdateBeneficiaryRequest $request, Beneficiary $beneficiary)
    {
        $validated = $request->validated();

        if ($request->hasFile('photo')) {
            // UPLOAD OPTIMISÉ (600px max pour les portraits)
            $photoPath = $this->uploadAndOptimize($request->file('photo'), 'beneficiaries', 600);
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