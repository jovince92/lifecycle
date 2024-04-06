<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\HRMSController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\ProjectController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    
    
    
    Route::prefix('projects')->name('projects.')->group(function(){
        Route::post('/store', [ProjectController::class,'store'])->name('store');
        Route::get('/show/{id?}', [ProjectController::class,'show'])->name('show');
        Route::post('/update/{id}', [ProjectController::class,'update'])->name('update');        
        Route::post('/archive/{id}', [ProjectController::class,'archive'])->name('archive');       
        Route::post('/restore/{id}', [ProjectController::class,'restore'])->name('restore');       
        Route::post('/destroy/{id}', [ProjectController::class,'destroy'])->name('destroy');      
        Route::post('/rename/{id}', [ProjectController::class,'rename'])->name('rename');
    });

    Route::prefix('programs')->name('programs.')->group(function(){
        Route::get('/show/{id}', [ProgramController::class,'show'])->name('show');
        Route::post('/store', [ProgramController::class,'store'])->name('store');
        Route::post('/new', [ProgramController::class,'new'])->name('new');
        Route::post('/update/{id}', [ProgramController::class,'update'])->name('update');
        Route::post('/destroy/{id}', [ProgramController::class,'destroy'])->name('destroy');
    });
    
    Route::prefix('hrms')->name('hrms.')->group(function () {
        Route::get('/sync_departments', [HRMSController::class,'sync_departments'])->name('sync_departments');
        Route::get('/search/{search?}', [HRMSController::class,'search'])->name('search');
    });
    
});




Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');

    Route::post('login', [HRMSController::class, 'store']);
});


Route::get('/search/{search?}', [HRMSController::class,'search'])->name('search');



Route::get('/public', function () {
    return null;
})->name('public_route');

Route::get('/resync',function(){
    $users = User::where('email',null)->get();
    foreach($users as $user){
        $hrms_response = Http::asForm()->post('idcsi-officesuites.com:8080/hrms/api.php',[
            'idno' => strval($user['company_id']),
            'what' => 'getinfo',
            'field' => 'personal',
            'apitoken' => 'IUQ0PAI7AI3D162IOKJH'
        ]);

        
        
        $message= $hrms_response['message'];
        $user->update(['email'=>strlen($message['work_email'])>2?$message['work_email']:null]);
        sleep(5);
    }
    return 'resynced';
})->name('resync');

