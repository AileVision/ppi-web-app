<?php

use App\Models\Beneficiary;
use App\Models\Category;
use App\Models\Project;
use App\Models\Sector;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

function createAdminUser(): User
{
    $role = Role::firstOrCreate(['name' => 'admin']);

    $user = User::factory()->create();
    $user->assignRole($role);

    return $user;
}

test('admin category pages and creation work', function () {
    $admin = createAdminUser();

    actingAs($admin)
        ->get(route('admin.categories.index'))
        ->assertStatus(200);

    actingAs($admin)
        ->get(route('admin.categories.create'))
        ->assertStatus(200);

    actingAs($admin)
        ->post(route('admin.categories.store'), [
            'name' => ['fr' => 'Catégorie test', 'en' => 'Test Category'],
            'bank_account' => [
                'account_name' => 'PPI ONG',
                'account_number' => '1234567890',
                'bank_name' => 'Ecobank Togo',
                'iban' => 'TG1234567890',
                'swift' => 'ECOCTGTP',
                'country' => 'Togo',
            ],
        ])
        ->assertRedirect(route('admin.categories.index'));

    $this->assertDatabaseHas('categories', [
        'slug' => 'test-category',
    ]);
});

test('admin beneficiary pages and creation work', function () {
    $admin = createAdminUser();
    $category = Category::create([
        'name' => ['fr' => 'Catégorie 1', 'en' => 'Category 1'],
        'slug' => 'category-1',
    ]);

    Storage::fake('public');
    $photo = UploadedFile::fake()->image('beneficiary.jpg');

    actingAs($admin)
        ->get(route('admin.beneficiaries.index'))
        ->assertStatus(200);

    actingAs($admin)
        ->get(route('admin.beneficiaries.create'))
        ->assertStatus(200);

    actingAs($admin)
        ->post(route('admin.beneficiaries.store'), [
            'category_id' => $category->id,
            'first_name' => 'Alain',
            'age' => 35,
            'gender' => 'male',
            'location' => 'Lome',
            'situation' => ['fr' => 'Situation FR', 'en' => 'Situation EN'],
            'needs' => ['fr' => 'Besoins FR', 'en' => 'Needs EN'],
            'photo' => $photo,
        ])
        ->assertRedirect(route('admin.beneficiaries.index'));

    $this->assertDatabaseHas('beneficiaries', [
        'first_name' => 'Alain',
        'category_id' => $category->id,
    ]);
});

test('admin project pages and creation work', function () {
    $admin = createAdminUser();
    $sector = Sector::create([
        'name' => ['fr' => 'Éducation', 'en' => 'Education'],
        'slug' => 'education',
    ]);

    Storage::fake('public');
    $image = UploadedFile::fake()->image('project.jpg');

    actingAs($admin)
        ->get(route('admin.projects.index'))
        ->assertStatus(200);

    actingAs($admin)
        ->get(route('admin.projects.create'))
        ->assertStatus(200);

    actingAs($admin)
        ->post(route('admin.projects.store'), [
            'title' => ['fr' => 'Projet Test', 'en' => 'Test Project'],
            'location' => ['fr' => 'Togo', 'en' => 'Togo'],
            'context' => ['fr' => 'Contexte FR', 'en' => 'Context EN'],
            'activities' => ['fr' => 'Activités FR', 'en' => 'Activities EN'],
            'expected_results' => ['fr' => 'Résultats FR', 'en' => 'Expected EN'],
            'sector_ids' => [$sector->id],
            'main_image' => $image,
            'bank_account' => [
                'account_name' => 'PPI ONG',
                'account_number' => '9876543210',
                'bank_name' => 'Ecobank',
                'iban' => 'TG0987654321',
                'swift' => 'ECOCTGTP',
                'country' => 'Togo',
            ],
        ])
        ->assertRedirect(route('admin.projects.index'));

    $this->assertDatabaseHas('projects', [
        'title->en' => 'Test Project',
    ]);
});

test('admin team member pages and creation work', function () {
    $admin = createAdminUser();

    Storage::fake('public');
    $photo = UploadedFile::fake()->image('member.jpg');

    actingAs($admin)
        ->get(route('admin.team.index'))
        ->assertStatus(200);

    actingAs($admin)
        ->get(route('admin.team.create'))
        ->assertStatus(200);

    actingAs($admin)
        ->post(route('admin.team.store'), [
            'full_name' => 'Marie Dupont',
            'type' => 'staff',
            'position' => ['fr' => 'Directrice', 'en' => 'Director'],
            'professional_title' => ['fr' => 'Titre FR', 'en' => 'Title EN'],
            'role_description' => ['fr' => 'Description FR', 'en' => 'Description EN'],
            'sort_order' => 1,
            'photo' => $photo,
        ])
        ->assertRedirect(route('admin.team.index'));

    $this->assertDatabaseHas('team_members', [
        'full_name' => 'Marie Dupont',
        'type' => 'staff',
    ]);
});
