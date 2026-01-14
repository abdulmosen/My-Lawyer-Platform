<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\App;

class LocaleController extends Controller
{
    /**
     * Get current locale and available locales
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'current_locale' => app()->getLocale(),
            'supported_locales' => [
                ['code' => 'en', 'name' => 'English', 'name_native' => 'English'],
                ['code' => 'ar', 'name' => 'Arabic', 'name_native' => 'العربية'],
            ],
            'timestamp' => now()->toIso8601String(),
        ]);
    }

    /**
     * Set application locale
     * 
     * Can be used to validate and set locale from frontend request
     */
    public function setLocale(string $locale): JsonResponse
    {
        // Validate locale
        $supported = ['en', 'ar'];
        
        if (!in_array($locale, $supported)) {
            return response()->json([
                'message' => 'Invalid locale',
                'supported_locales' => $supported,
            ], 422);
        }

        // Set locale
        App::setLocale($locale);

        return response()->json([
            'message' => 'Locale updated successfully',
            'locale' => $locale,
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
