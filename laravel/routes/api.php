<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // User routes
    Route::middleware('isUser')->group(function () {
        Route::get('/appointments', [AppointmentController::class, 'index']);
        Route::post('/appointments', [AppointmentController::class, 'store']);
        Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);
    });

    // Admin routes
    Route::middleware('isAdmin')->prefix('admin')->group(function () {
        Route::get('/appointments', [AdminController::class, 'appointments']);
        Route::patch('/appointments/{id}', [AdminController::class, 'updateStatus']);
        Route::get('/users', [AdminController::class, 'users']);
    });
});
