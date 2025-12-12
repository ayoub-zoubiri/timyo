<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAppointmentStatusRequest;
use App\Models\Appointment;
use App\Models\User;

class AdminController extends Controller
{
    /**
     * List all appointments.
     */
    public function appointments()
    {
        $appointments = Appointment::with('user:id,name,email')
            ->orderBy('date')
            ->orderBy('time')
            ->get();

        return response()->json($appointments);
    }

    /**
     * Update appointment status (approve/reject).
     */
    public function updateStatus(UpdateAppointmentStatusRequest $request, $id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Appointment status updated',
            'appointment' => $appointment,
        ]);
    }

    /**
     * List all users.
     */
    public function users()
    {
        $users = User::select('id', 'name', 'email', 'role', 'created_at')->get();

        return response()->json($users);
    }
}
