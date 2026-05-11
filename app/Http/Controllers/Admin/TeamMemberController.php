<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use App\Http\Requests\StoreTeamMemberRequest;
use App\Http\Requests\UpdateTeamMemberRequest;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TeamMemberController extends Controller
{
    public function index()
    {
        $teamMembers = TeamMember::orderBy('sort_order')->get()->map(function ($member) {
            return [
                'id' => $member->id,
                'full_name' => $member->full_name,
                'type' => $member->type,
                'position' => $member->position,
                'professional_title' => $member->professional_title,
                'role_description' => $member->role_description,
                'photo_path' => $member->photo_path,
                'sort_order' => $member->sort_order,
            ];
        });

        return Inertia::render('admin/team/index', [
            'teamMembers' => $teamMembers,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/team/create');
    }

    public function store(StoreTeamMemberRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('team-members', 'public');
            $validated['photo_path'] = '/storage/' . $photoPath;
        }

        TeamMember::create($validated);

        return redirect()->route('admin.team.index')->with('success', 'Team member created successfully.');
    }

    public function edit(TeamMember $teamMember)
    {
        return Inertia::render('admin/team/edit', [
            'teamMember' => [
                'id' => $teamMember->id,
                'full_name' => $teamMember->full_name,
                'type' => $teamMember->type,
                'position' => $teamMember->position,
                'professional_title' => $teamMember->professional_title,
                'role_description' => $teamMember->role_description,
                'photo_path' => $teamMember->photo_path,
                'sort_order' => $teamMember->sort_order,
            ],
        ]);
    }

    public function update(UpdateTeamMemberRequest $request, TeamMember $teamMember)
    {
        $validated = $request->validated();

        if ($request->hasFile('photo')) {
            if ($teamMember->photo_path) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $teamMember->photo_path));
            }

            $photoPath = $request->file('photo')->store('team-members', 'public');
            $validated['photo_path'] = '/storage/' . $photoPath;
        }

        $teamMember->update($validated);

        return redirect()->route('admin.team.index')->with('success', 'Team member updated successfully.');
    }

    public function destroy(TeamMember $teamMember)
    {
        if ($teamMember->photo_path) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $teamMember->photo_path));
        }

        $teamMember->delete();

        return redirect()->route('admin.team.index')->with('success', 'Team member deleted successfully.');
    }
}
