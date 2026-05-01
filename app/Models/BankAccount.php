<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class BankAccount extends Model
{
    protected $fillable =['account_name', 'account_number', 'bank_name', 'iban', 'swift', 'country'];

    public function bankable(): MorphTo
    {
        return $this->morphTo();
    }
}
