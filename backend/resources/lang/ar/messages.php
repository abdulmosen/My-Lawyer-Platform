<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Localization Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used by the authentication guard to build
    | the error messages we show the user. You are free to change these language
    | lines according to your application's requirements.
    |
    */

    // Authentication
    'auth' => [
        'login_success' => 'تم تسجيل الدخول بنجاح',
        'logout_success' => 'تم تسجيل الخروج بنجاح',
        'registration_success' => 'تم التسجيل بنجاح',
        'invalid_credentials' => 'بيانات الدخول غير صحيحة',
        'unauthorized' => 'غير مصرح',
        'token_expired' => 'انتهت صلاحية التوكن',
        'token_invalid' => 'التوكن غير صحيح',
    ],

    // Cases
    'cases' => [
        'created' => 'تم إنشاء القضية بنجاح',
        'updated' => 'تم تحديث القضية بنجاح',
        'deleted' => 'تم حذف القضية بنجاح',
        'not_found' => 'القضية غير موجودة',
        'unauthorized' => 'لا توجد صلاحية لعرض هذه القضية',
    ],

    // Consultations/Appointments
    'consultations' => [
        'booked' => 'تم حجز الاستشارة بنجاح',
        'cancelled' => 'تم إلغاء الاستشارة',
        'rescheduled' => 'تم إعادة جدولة الاستشارة',
        'confirmed' => 'تم تأكيد الاستشارة',
    ],

    // Validation
    'validation' => [
        'required' => 'حقل :attribute مطلوب',
        'email' => ':attribute يجب أن يكون بريد إلكتروني صحيح',
        'min' => ':attribute يجب أن يكون على الأقل :min أحرف',
        'max' => ':attribute لا يمكن أن يزيد عن :max أحرف',
        'unique' => ':attribute موجود بالفعل',
        'confirmed' => 'تأكيد :attribute غير متطابق',
    ],

    // General Errors
    'errors' => [
        'server_error' => 'حدث خطأ في الخادم',
        'not_found' => 'الموارد المطلوبة غير موجودة',
        'forbidden' => 'الوصول مرفوض',
        'method_not_allowed' => 'الطريقة غير مسموحة',
    ],

    // Status
    'status' => [
        'pending' => 'قيد الانتظار',
        'in_progress' => 'قيد المعالجة',
        'resolved' => 'محلول',
        'closed' => 'مغلق',
    ],
];
