<?php

//Users ルーティング
use App\Http\Controllers\CreateUsersController;


use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\PostController;
use App\Http\Controllers\EventController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Users ルーティング
//Route::get('/', [CreateUsersController::class, 'index']);
Route::get('/user', [CreateUsersController::class, 'index']);

//Route::get('/', function () {return view('welcome');});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Route::get('/', [PostController::class, 'index'])->name('index');
Route::view('/calendar', 'calendar/calendar');
Route::post('/calendar', [EventController::class, 'store'])->name('event.store');
Route::post('/calendar/event', [EventController::class, 'getEvent'])->name('event.get');
Route::post('/calendar/{event}', [EventController::class, 'update'])->name('event.update');
Route::post('/calendar/{event}/delete', [EventController::class, 'delete'])->name('event.delete');


require __DIR__.'/auth.php';