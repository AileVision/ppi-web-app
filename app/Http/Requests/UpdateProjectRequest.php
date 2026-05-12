<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
            'title.fr' => ['required', 'string', 'max:255'],
            'title.en' => ['required', 'string', 'max:255'],
            'location.fr' => ['required', 'string'],
            'location.en' => ['required', 'string'],
            'context.fr' => ['required', 'string'],
            'context.en' => ['required', 'string'],
            'activities.fr' => ['required', 'string'],
            'activities.en' => ['required', 'string'],
            'expected_results.fr' => ['required', 'string'],
            'expected_results.en' => ['required', 'string'],
            'sector_ids' => ['required', 'array'],
            'sector_ids.*' => ['integer', 'exists:sectors,id'],
            'main_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'gallery' => ['nullable', 'array', 'max:21'],
            'gallery.*' => ['image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'bank_account.account_name' => ['required', 'string'],
            'bank_account.account_number' => ['required', 'string'],
            'bank_account.bank_name' => ['required', 'string'],
            'bank_account.iban' => ['nullable', 'string'],
            'bank_account.swift' => ['nullable', 'string'],
            'bank_account.country' => ['required', 'string'],
        ];
    }
}
