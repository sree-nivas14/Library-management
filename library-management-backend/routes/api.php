<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookRequestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register',[Controller::class,'register'])->name('register');
Route::get('/signout',[Controller::class,'signout'])->name('signout')->middleware('auth:api');
Route::post('/login',[Controller::class,'login'])->name('login');
Route::get('/details',[Controller::class,'details'])->name('details')->middleware('auth:api');

Route::get('/getUserList',[UserController::class,'getUserList'])->name('getUserList')->middleware('auth:api');
Route::post('/deleteUser',[UserController::class,'deleteUser'])->name('deleteUser')->middleware('auth:api');
Route::post('/addUser',[UserController::class,'addUser'])->name('addUser')->middleware('auth:api');
Route::post('/updateUser',[UserController::class,'updateUser'])->name('updateUser')->middleware('auth:api');

Route::get('/getBookList',[BookController::class,'getBookList'])->name('getBookList')->middleware('auth:api');
Route::post('/deleteBook',[BookController::class,'deleteBook'])->name('deleteBook')->middleware('auth:api');
Route::post('/addBook',[BookController::class,'addBook'])->name('addBook')->middleware('auth:api');
Route::post('/updateBook',[BookController::class,'updateBook'])->name('updateBook')->middleware('auth:api');
Route::get('/getAvailableBooks',[BookController::class,'getAvailableBooks'])->name('getAvailableBooks')->middleware('auth:api');

Route::post('/sendBookRequest',[BookRequestController::class,'sendBookRequest'])->name('sendBookRequest')->middleware('auth:api');
Route::get('/getRequestList',[BookRequestController::class,'getRequestList'])->name('getRequestList')->middleware('auth:api');
Route::post('/rejectRequest',[BookRequestController::class,'rejectRequest'])->name('rejectRequest')->middleware('auth:api');
Route::post('/approveRequest',[BookRequestController::class,'approveRequest'])->name('approveRequest')->middleware('auth:api');
Route::post('/returnRequest',[BookRequestController::class,'returnRequest'])->name('returnRequest')->middleware('auth:api');
Route::get('/checkadmin',[BookRequestController::class,'checkadmin'])->name('checkadmin')->middleware('auth:api');
Route::get('/dashboardData',[BookRequestController::class,'dashboardData'])->name('dashboardData')->middleware('auth:api');
