<?php

use App\Http\Controllers\api\GenderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(GenderController::class)->prefix('/gender')->group(function() {
    Route::post('/storeGender', 'storeGender'); // /gender/storegender
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
