<?php

namespace App\Traits;

/**
 * Trait for handling bilingual model attributes
 * 
 * Usage:
 * - Define bilingual fields in model: protected $bilingual = ['title', 'description'];
 * - Automatically serialize/deserialize based on locale
 */
trait Bilingual
{
    /**
     * Get bilingual attribute with fallback
     */
    public function getBilingual(string $attribute): ?string
    {
        $locale = app()->getLocale();
        
        // Try to get attribute with current locale
        $value = $this->getAttribute("{$attribute}_{$locale}");
        
        if ($value) {
            return $value;
        }

        // Fallback to English
        if ($locale !== 'en') {
            $value = $this->getAttribute("{$attribute}_en");
            if ($value) {
                return $value;
            }
        }

        // Fallback to Arabic
        if ($locale !== 'ar') {
            $value = $this->getAttribute("{$attribute}_ar");
            if ($value) {
                return $value;
            }
        }

        return null;
    }

    /**
     * Get all bilingual versions of an attribute
     */
    public function getAllBilingual(string $attribute): array
    {
        return [
            'en' => $this->getAttribute("{$attribute}_en"),
            'ar' => $this->getAttribute("{$attribute}_ar"),
        ];
    }
}
