<?php

use App\Http\Controllers\api\GenderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\UserController;

Route::controller(GenderController::class)->prefix('/gender')->group(function() {
    Route::get('/loadGenders', 'loadGenders');  // /gender/loadGenders
    Route::get('/getGender/{genderId}', 'getGender');
    Route::post('/storeGender', 'storeGender'); // /gender/storegender
    Route::put('/updateGender/{gender}', 'updateGender');
    Route::put('/destroyGender/{gender}', 'destroyGender');
});

Route::controller(UserController::class)->prefix('/user')->group(function () {
    Route::get('/loadUsers', 'loadUsers');
    Route::post('/storeUser', 'storeUser');
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
