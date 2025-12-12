<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentRequest;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * List user's appointments.
     */
    public function index(Request $request)
    {
        $appointments = $request->user()->appointments()->orderBy('date')->orderBy('time')->get();

        return response()->json($appointments);
    }

    /**
     * Create a new appointment.
     */
    public function store(StoreAppointmentRequest $request)
    {
        $appointment = $request->user()->appointments()->create([
            'date' => $request->date,
            'time' => $request->time,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Appointment created successfully',
            'appointment' => $appointment,
        ], 201);
    }

    /**
     * Cancel an appointment.
     */
    public function destroy(Request $request, $id)
    {
        $appointment = $request->user()->appointments()->findOrFail($id);

        // Check if appointment is in the future
        if ($appointment->date <= now()->toDateString()) {
            return response()->json([
                'message' => 'Cannot cancel past appointments',
            ], 400);
        }

        $appointment->delete();

        return response()->json([
            'message' => 'Appointment cancelled successfully',
        ]);
    }
}
