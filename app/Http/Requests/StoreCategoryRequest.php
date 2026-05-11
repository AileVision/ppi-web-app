<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name.fr' => ['required', 'string', 'max:255'],
            'name.en' => ['required', 'string', 'max:255'],
            'bank_account.account_name' => ['nullable', 'string'],
            'bank_account.account_number' => ['nullable', 'string'],
            'bank_account.bank_name' => ['nullable', 'string'],
            'bank_account.iban' => ['nullable', 'string'],
            'bank_account.swift' => ['nullable', 'string'],
            'bank_account.country' => ['nullable', 'string'],
        ];
    }
}
