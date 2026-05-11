<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'full_name',
        'type',
        'position',
        'professional_title',
        'role_description',
        'sort_order',          
    ];

    protected $casts = [
        'position' => 'array',
        'professional_title' => 'array',
        'role_description' => 'array',
    ];
}
