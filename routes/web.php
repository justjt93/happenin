<?php

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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'Auth\LoggedInController@index');

//events routes 

//Route::get('/events', 'EventController@index');
Route::get('/events/create', 'EventController@create')->middleware('auth');
Route::post('/events', 'EventController@store');