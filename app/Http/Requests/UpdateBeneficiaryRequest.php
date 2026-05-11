<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBeneficiaryRequest extends FormRequest
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
            'category_id' => ['required', 'exists:categories,id'],
            'first_name' => ['required', 'string', 'max:255'],
            'age' => ['required', 'integer', 'min:0', 'max:120'],
            'gender' => ['nullable', 'string'],
            'location' => ['nullable', 'string'],
            'situation.fr' => ['required', 'string', 'max:500'],
            'situation.en' => ['required', 'string', 'max:500'],
            'needs.fr' => ['required', 'string'],
            'needs.en' => ['required', 'string'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ];
    }
}
