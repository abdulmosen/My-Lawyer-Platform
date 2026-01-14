<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Case Resource with Bilingual Support
 * 
 * Returns case data with automatic locale-based attribute selection
 */
class CaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'reference_number' => $this->reference_number,
            'title' => $this->getBilingual('title') ?? $this->{'title_' . $locale},
            'title_en' => $this->title_en,
            'title_ar' => $this->title_ar,
            'description' => $this->description,
            'status' => $this->status,
            'priority' => $this->priority ?? 'normal',
            'service' => $this->service ? [
                'id' => $this->service->id,
                'name' => $this->service->{'name_' . $locale} ?? $this->service->name_en,
            ] : null,
            'client' => [
                'id' => $this->client->id,
                'name' => $this->client->name,
                'email' => $this->client->email,
            ],
            'lawyer' => $this->lawyer ? [
                'id' => $this->lawyer->id,
                'name' => $this->lawyer->name,
                'email' => $this->lawyer->email,
                'specialization' => $this->lawyer->specialization,
            ] : null,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }

    /**
     * Get additional data that is always returned
     */
    public function with(Request $request): array
    {
        return [
            'locale' => app()->getLocale(),
            'timestamp' => now()->toIso8601String(),
        ];
    }
}
