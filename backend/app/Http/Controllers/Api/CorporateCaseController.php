<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CaseResource;
use App\Models\Case;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CorporateCaseController extends Controller
{
    /**
     * Display a listing of the cases for the authenticated user.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $user = $request->user();

        // Simple authorization scope
        if ($user->role === 'client') {
            // Get client's cases
            $cases = Case::where('client_id', $user->client->id)->latest()->paginate(10);
        } elseif ($user->role === 'lawyer') {
            // Get lawyer's assigned cases
            $cases = Case::where('lawyer_id', $user->lawyer->id)->latest()->paginate(10);
        } else {
            // Admin view or handling
            $cases = Case::latest()->paginate(10);
        }

        return CaseResource::collection($cases);
    }

    /**
     * Store a new corporate case.
     *
     * @param Request $request
     * @return CaseResource
     */
    public function store(Request $request)
    {
        // Validation should ideally be in a StoreCaseRequest
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'description' => 'required|string',
            'service_id' => 'required|exists:services,id',
        ]);

        $case = Case::create([
            'client_id' => $request->user()->client->id,
            'title_ar' => $validated['title_ar'],
            'title_en' => $validated['title_en'],
            'description' => $validated['description'],
            'service_id' => $validated['service_id'],
            'status' => 'pending',
            'reference_number' => 'CS-' . time() . rand(100, 999),
        ]);

        return new CaseResource($case);
    }

    /**
     * Display the specified resource.
     *
     * @param string $id
     * @return CaseResource
     */
    public function show(string $id)
    {
        $case = Case::findOrFail($id);

        // Add Policy check here: $this->authorize('view', $case);

        return new CaseResource($case);
    }

    /**
     * Update the specified corporate case.
     *
     * @param Request $request
     * @param string $id
     * @return CaseResource
     */
    public function update(Request $request, string $id)
    {
        $case = Case::findOrFail($id);

        // Authorization check
        // $this->authorize('update', $case);

        $validated = $request->validate([
            'title_ar' => 'sometimes|string|max:255',
            'title_en' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'status' => 'sometimes|in:pending,in_progress,resolved,closed',
            'lawyer_id' => 'sometimes|exists:lawyers,id',
        ]);

        $case->update($validated);

        return new CaseResource($case);
    }

    /**
     * Delete the specified corporate case.
     *
     * @param string $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $id)
    {
        $case = Case::findOrFail($id);

        // Authorization check
        // $this->authorize('delete', $case);

        $case->delete();

        return response()->noContent();
    }
}
