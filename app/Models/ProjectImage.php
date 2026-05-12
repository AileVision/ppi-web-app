<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectImage extends Model
{
    protected $fillable = ['project_id', 'image_path', 'sort_order'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
