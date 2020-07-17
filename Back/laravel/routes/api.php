<?php
use Illuminate\Support\Facades\Route;

Route::get('places/export', 'PlaceController@export');
Route::get('places/grid', 'PlaceController@grid');
Route::post('places/import', 'PlaceController@import');
