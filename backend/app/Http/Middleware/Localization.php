<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class Localization
{
    /**
     * Supported locales for the application
     */
    protected const SUPPORTED_LOCALES = ['en', 'ar'];

    /**
     * Default locale if none is detected
     */
    protected const DEFAULT_LOCALE = 'ar';

    /**
     * Handle an incoming request.
     *
     * Determines the application locale based on:
     * 1. Accept-Language header (from Next.js frontend)
     * 2. Locale cookie (user preference)
     * 3. Default locale (Arabic)
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $this->getLocaleFromRequest($request);

        // Set the application locale
        App::setLocale($locale);

        // Store locale in request for easy access
        $request->attributes->set('locale', $locale);

        $response = $next($request);

        // Set locale cookie for persistence (valid for 1 year)
        $response->cookie(
            'locale',
            $locale,
            60 * 60 * 24 * 365, // 1 year
            '/',
            null,
            false,
            false // httpOnly = false to allow JS access
        );

        return $response;
    }

    /**
     * Determine the locale from the incoming request
     *
     * Priority:
     * 1. Accept-Language header (frontend sends this)
     * 2. Locale cookie (user's saved preference)
     * 3. Query parameter ?locale=en
     * 4. Default locale
     */
    protected function getLocaleFromRequest(Request $request): string
    {
        // 1. Check Accept-Language header (sent by Next.js frontend)
        if ($request->hasHeader('Accept-Language')) {
            $locale = $this->parseAcceptLanguage($request->header('Accept-Language'));
            if (in_array($locale, self::SUPPORTED_LOCALES)) {
                return $locale;
            }
        }

        // 2. Check for locale cookie
        if ($request->hasCookie('locale')) {
            $locale = $request->cookie('locale');
            if (in_array($locale, self::SUPPORTED_LOCALES)) {
                return $locale;
            }
        }

        // 3. Check for query parameter ?locale=en
        if ($request->has('locale')) {
            $locale = $request->input('locale');
            if (in_array($locale, self::SUPPORTED_LOCALES)) {
                return $locale;
            }
        }

        // 4. Fallback to default locale
        return self::DEFAULT_LOCALE;
    }

    /**
     * Parse Accept-Language header to extract locale code
     *
     * Handles formats like:
     * - "ar"
     * - "en-US"
     * - "en-US, en;q=0.9, ar;q=0.8"
     */
    protected function parseAcceptLanguage(string $header): string
    {
        // Split by comma to get language preferences
        $languages = explode(',', $header);

        foreach ($languages as $language) {
            // Remove whitespace
            $language = trim($language);

            // Extract just the language code (before ; or -)
            // e.g., "en-US;q=0.9" => "en"
            $locale = substr($language, 0, 2);

            // Check if this locale is supported
            if (in_array($locale, self::SUPPORTED_LOCALES)) {
                return $locale;
            }
        }

        return self::DEFAULT_LOCALE;
    }

    /**
     * Get the list of supported locales
     * Useful for API responses and validation
     */
    public static function getSupportedLocales(): array
    {
        return self::SUPPORTED_LOCALES;
    }

    /**
     * Check if a locale is supported
     */
    public static function isSupportedLocale(string $locale): bool
    {
        return in_array($locale, self::SUPPORTED_LOCALES);
    }

    /**
     * Get the default locale
     */
    public static function getDefaultLocale(): string
    {
        return self::DEFAULT_LOCALE;
    }
}
