<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Translatable\HasTranslations;

class Project extends Model
{
    use HasTranslations;

    protected $fillable =['title', 'slug', 'location', 'context', 'activities', 'expected_results', 'main_image_path'];
    public $translatable =['title', 'location', 'context', 'activities', 'expected_results'];

    public function sectors(): BelongsToMany
    {
        return $this->belongsToMany(Sector::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)->orderBy('sort_order');
    }

    public function bankAccount(): MorphOne
    {
        return $this->morphOne(BankAccount::class, 'bankable');
    }
}
