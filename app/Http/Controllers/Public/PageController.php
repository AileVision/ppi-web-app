<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function whoWeAre()
    {
        // On récupère les membres de l'équipe triés par ordre d'importance
        $team = TeamMember::orderBy('sort_order')->get()->map(function ($member) {
            return[
                'id' => $member->id,
                'full_name' => $member->full_name,
                'type' => $member->type, // 'board' ou 'staff'
                'position' => $member->position,
                'professional_title' => $member->professional_title,
                'role_description' => $member->role_description,
                'photo_path' => $member->photo_path,
            ];
        });

        return Inertia::render('public/who-we-are', [
            'team' => $team
        ]);
    }

    public function whatWeDo()
    {
        return Inertia::render('public/what-we-do');
    }

    public function transparency()
    {
        return Inertia::render('public/transparency');
    }
}
