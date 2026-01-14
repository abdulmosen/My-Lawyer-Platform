<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Localization Language Lines (English)
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the error messages used by the
    | authentication and other built-in Laravel validation classes.
    |
    */

    // Authentication
    'auth' => [
        'login_success' => 'Login successful',
        'logout_success' => 'Logout successful',
        'registration_success' => 'Registration successful',
        'invalid_credentials' => 'Invalid credentials',
        'unauthorized' => 'Unauthorized',
        'token_expired' => 'Token has expired',
        'token_invalid' => 'Invalid token',
    ],

    // Cases
    'cases' => [
        'created' => 'Case created successfully',
        'updated' => 'Case updated successfully',
        'deleted' => 'Case deleted successfully',
        'not_found' => 'Case not found',
        'unauthorized' => 'You are not authorized to view this case',
    ],

    // Consultations/Appointments
    'consultations' => [
        'booked' => 'Consultation booked successfully',
        'cancelled' => 'Consultation cancelled',
        'rescheduled' => 'Consultation rescheduled',
        'confirmed' => 'Consultation confirmed',
    ],

    // Validation
    'validation' => [
        'required' => 'The :attribute field is required',
        'email' => 'The :attribute must be a valid email address',
        'min' => 'The :attribute must be at least :min characters',
        'max' => 'The :attribute must not exceed :max characters',
        'unique' => 'The :attribute has already been taken',
        'confirmed' => 'The :attribute confirmation does not match',
    ],

    // General Errors
    'errors' => [
        'server_error' => 'Server error occurred',
        'not_found' => 'Resource not found',
        'forbidden' => 'Access forbidden',
        'method_not_allowed' => 'Method not allowed',
    ],

    // Status
    'status' => [
        'pending' => 'Pending',
        'in_progress' => 'In Progress',
        'resolved' => 'Resolved',
        'closed' => 'Closed',
    ],
];
