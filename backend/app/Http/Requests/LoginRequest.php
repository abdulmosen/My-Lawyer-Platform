<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * Login is always open (no auth required)
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
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
            ],
            'password' => [
                'required',
                'string',
                'min:8',
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     * Supports both English and Arabic based on current locale
     */
    public function messages(): array
    {
        $locale = app()->getLocale();

        if ($locale === 'ar') {
            return [
                'email.required' => 'البريد الإلكتروني مطلوب.',
                'email.string' => 'البريد الإلكتروني يجب أن يكون نصاً.',
                'email.email' => 'يجب إدخال بريد إلكتروني صالح.',
                'email.max' => 'البريد الإلكتروني طويل جداً.',

                'password.required' => 'كلمة المرور مطلوبة.',
                'password.string' => 'كلمة المرور يجب أن تكون نصاً.',
                'password.min' => 'كلمة المرور يجب أن تكون على الأقل 8 أحرف.',
            ];
        }

        return [
            'email.required' => 'The email field is required.',
            'email.string' => 'The email must be a string.',
            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'The email must not exceed 255 characters.',

            'password.required' => 'The password field is required.',
            'password.string' => 'The password must be a string.',
            'password.min' => 'The password must be at least 8 characters.',
        ];
    }

    /**
     * Handle a failed validation attempt.
     */
    protected function failedValidation(Validator $validator)
    {
        $locale = app()->getLocale();

        throw new \Illuminate\Validation\ValidationException($validator, response()->json([
            'message' => $locale === 'ar' ? 'فشل التحقق من البيانات' : 'Validation failed',
            'errors' => $validator->errors(),
        ], 422));
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'email' => trim(strtolower($this->input('email', ''))),
        ]);
    }
}
