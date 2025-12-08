<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Database\Seeder;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all regular users
        $users = User::where('role', 'user')->get();

        // Create appointments for each user
        foreach ($users as $user) {
            // 2 pending appointments
            Appointment::factory(2)->create(['user_id' => $user->id]);

            // 1 approved appointment
            Appointment::factory()->approved()->create(['user_id' => $user->id]);

            // 1 rejected appointment
            Appointment::factory()->rejected()->create(['user_id' => $user->id]);
        }
    }
}
