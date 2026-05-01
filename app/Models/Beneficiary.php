<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Translatable\HasTranslations;

class Beneficiary extends Model
{
    use HasTranslations;

    protected $fillable =['category_id', 'first_name', 'age', 'gender', 'location', 'situation', 'needs', 'photo_path'];
    public $translatable = ['situation', 'needs'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
