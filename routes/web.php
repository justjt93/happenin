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


//Login and SocialLogin routes
Auth::routes();

Route::get('/login/{social}', 'Auth\LoginController@socialLogin')
        ->where('social', 'facebook|google');
Route::get('/login/{social}/callback', 'Auth\LoginController@handleProviderCallback')
        ->where('social', 'facebook|google');

//Events routes 
// Route::get('/events', 'EventController@index');
Route::get('/events/create', 'EventController@create')->middleware('auth');
Route::post('/events', 'EventController@store');
Route::get('/events/{id}', 'EventController@show');
Route::get('/events/edit/{id}', 'EventController@edit');
Route::post('/events/edit/{id}', 'EventController@update');
Route::post('/events/destroy/{id}', 'EventController@destroy');
Route::view('/eventlist', 'events.event-list');
Route::post('/ratings', 'EventController@storeRating');
Route::post('/comments', 'EventController@storeComment');
Route::post('/addEventPicture', 'EventController@addEventPicture');


//User detail and edit and updateProfPic
Route::get('/userdetail', 'UserController@index')->middleware('auth');
Route::get('/userdetail/edit', 'UserController@edit')->middleware('auth');
Route::post('/userdetail/edit/{id}', 'UserController@store')->middleware('auth');
Route::post('/userdetail/update', 'UserController@update')->middleware('auth');
Route::post('/userdetail/passwordchange/{id}', 'UserController@changePassword')->middleware('auth');
