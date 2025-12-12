<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAppointmentRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'date' => 'required|date|after:today',
            'time' => 'required|date_format:H:i',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'date.required' => 'La date est obligatoire.',
            'date.date' => 'La date doit être valide.',
            'date.after' => 'La date doit être dans le futur.',
            'time.required' => 'L\'heure est obligatoire.',
            'time.date_format' => 'L\'heure doit être au format HH:MM.',
        ];
    }
}
