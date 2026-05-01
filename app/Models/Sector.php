<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Translatable\HasTranslations;

class Sector extends Model
{
    use HasTranslations;

    protected $fillable = ['name', 'slug'];
    public $translatable = ['name'];

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }
}