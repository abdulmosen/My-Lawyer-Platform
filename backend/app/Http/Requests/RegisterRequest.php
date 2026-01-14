<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Contracts\Validation\Validator;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * Registration is always open (no auth required)
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $locale = app()->getLocale();

        return [
            // Basic Info (Both roles)
            'name' => [
                'required',
                'string',
                'min:2',
                'max:255',
                'regex:/^[\p{L}\s\-\.\']+$/u', // Allow letters, spaces, hyphens, apostrophes
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users,email',
            ],
            'password' => [
                'required',
                'string',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
            'phone' => [
                'nullable',
                'string',
                'regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/',
            ],
            'role' => [
                'required',
                'string',
                'in:client,lawyer',
            ],

            // Lawyer-specific fields
            'specialization' => [
                'required_if:role,lawyer',
                'nullable',
                'string',
                'min:2',
                'max:255',
                'regex:/^[\p{L}\s\-\.]+$/u',
            ],
            'bar_license_number' => [
                'required_if:role,lawyer',
                'nullable',
                'string',
                'max:50',
                'unique:users,bar_license_number',
            ],
            'years_of_experience' => [
                'required_if:role,lawyer',
                'nullable',
                'integer',
                'min:0',
                'max:70',
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
                // Name validation
                'name.required' => 'حقل الاسم مطلوب.',
                'name.string' => 'الاسم يجب أن يكون نصاً.',
                'name.min' => 'الاسم يجب أن يكون على الأقل 2 أحرف.',
                'name.max' => 'الاسم يجب ألا يتجاوز 255 حرف.',
                'name.regex' => 'الاسم يحتوي على أحرف غير صالحة.',

                // Email validation
                'email.required' => 'البريد الإلكتروني مطلوب.',
                'email.string' => 'البريد الإلكتروني يجب أن يكون نصاً.',
                'email.email' => 'يجب إدخال بريد إلكتروني صالح.',
                'email.max' => 'البريد الإلكتروني طويل جداً.',
                'email.unique' => 'البريد الإلكتروني مسجل بالفعل.',

                // Password validation
                'password.required' => 'كلمة المرور مطلوبة.',
                'password.string' => 'كلمة المرور يجب أن تكون نصاً.',
                'password.confirmed' => 'تأكيد كلمة المرور غير متطابق.',
                'password.min' => 'كلمة المرور يجب أن تكون على الأقل 8 أحرف.',
                'password.mixed_case' => 'كلمة المرور يجب أن تحتوي على أحرف كبيرة وصغيرة.',
                'password.numbers' => 'كلمة المرور يجب أن تحتوي على أرقام.',
                'password.symbols' => 'كلمة المرور يجب أن تحتوي على رموز (!@#$%^&*).',

                // Phone validation
                'phone.string' => 'رقم الهاتف يجب أن يكون نصاً.',
                'phone.regex' => 'رقم الهاتف غير صالح.',

                // Role validation
                'role.required' => 'نوع الحساب مطلوب.',
                'role.string' => 'نوع الحساب يجب أن يكون نصاً.',
                'role.in' => 'نوع الحساب يجب أن يكون عميل أو محامي.',

                // Lawyer-specific
                'specialization.required_if' => 'التخصص مطلوب للمحامين.',
                'specialization.string' => 'التخصص يجب أن يكون نصاً.',
                'specialization.min' => 'التخصص يجب أن يكون على الأقل 2 أحرف.',
                'specialization.max' => 'التخصص طويل جداً.',
                'specialization.regex' => 'التخصص يحتوي على أحرف غير صالحة.',

                'bar_license_number.required_if' => 'رقم رخصة المحامي مطلوب.',
                'bar_license_number.string' => 'رقم الرخصة يجب أن يكون نصاً.',
                'bar_license_number.max' => 'رقم الرخصة طويل جداً.',
                'bar_license_number.unique' => 'رقم الرخصة مسجل بالفعل.',

                'years_of_experience.required_if' => 'سنوات الخبرة مطلوبة للمحامين.',
                'years_of_experience.integer' => 'سنوات الخبرة يجب أن تكون رقماً صحيحاً.',
                'years_of_experience.min' => 'سنوات الخبرة لا يمكن أن تكون سالبة.',
                'years_of_experience.max' => 'سنوات الخبرة تبدو غير صحيحة.',
            ];
        }

        // English messages
        return [
            // Name validation
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a string.',
            'name.min' => 'The name must be at least 2 characters.',
            'name.max' => 'The name must not exceed 255 characters.',
            'name.regex' => 'The name contains invalid characters.',

            // Email validation
            'email.required' => 'The email field is required.',
            'email.string' => 'The email must be a string.',
            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'The email must not exceed 255 characters.',
            'email.unique' => 'This email has already been registered.',

            // Password validation
            'password.required' => 'The password field is required.',
            'password.string' => 'The password must be a string.',
            'password.confirmed' => 'The password confirmation does not match.',
            'password.min' => 'The password must be at least 8 characters.',
            'password.mixed_case' => 'The password must contain both uppercase and lowercase letters.',
            'password.numbers' => 'The password must contain at least one number.',
            'password.symbols' => 'The password must contain at least one symbol (!@#$%^&*).',

            // Phone validation
            'phone.string' => 'The phone number must be a string.',
            'phone.regex' => 'The phone number format is invalid.',

            // Role validation
            'role.required' => 'The account type is required.',
            'role.string' => 'The role must be a string.',
            'role.in' => 'The selected role must be either client or lawyer.',

            // Lawyer-specific
            'specialization.required_if' => 'Specialization is required for lawyers.',
            'specialization.string' => 'The specialization must be a string.',
            'specialization.min' => 'The specialization must be at least 2 characters.',
            'specialization.max' => 'The specialization must not exceed 255 characters.',
            'specialization.regex' => 'The specialization contains invalid characters.',

            'bar_license_number.required_if' => 'Bar license number is required for lawyers.',
            'bar_license_number.string' => 'The bar license number must be a string.',
            'bar_license_number.max' => 'The bar license number is too long.',
            'bar_license_number.unique' => 'This bar license number has already been registered.',

            'years_of_experience.required_if' => 'Years of experience is required for lawyers.',
            'years_of_experience.integer' => 'Years of experience must be a whole number.',
            'years_of_experience.min' => 'Years of experience cannot be negative.',
            'years_of_experience.max' => 'Years of experience seems incorrect.',
        ];
    }

    /**
     * Handle a failed validation attempt.
     * Customize response format
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
     * Can be used to transform input data
     */
    protected function prepareForValidation(): void
    {
        // Trim whitespace
        $this->merge([
            'name' => trim($this->input('name', '')),
            'email' => trim(strtolower($this->input('email', ''))),
            'specialization' => trim($this->input('specialization', '')),
            'bar_license_number' => trim(strtoupper($this->input('bar_license_number', ''))),
        ]);
    }
}
