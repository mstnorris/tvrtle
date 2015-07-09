<?php

get('/', function () {
    return view('pages.about');
});

/*
 * Public Static Page Routes
 */
get('about', 'PagesController@about');
get('contact', 'PagesController@contact');

get('login', ['as' => 'login_path', 'uses' => 'Auth\AuthController@getLogin']);
post('login', ['as' => 'login_path', 'uses' => 'Auth\AuthController@postLogin']);
get('logout', ['as' => 'logout_path', 'uses' => 'Auth\AuthController@getLogout']);


/*
|--------------------------------------------------------------------------
| Internal Employee Application Routes (Requires Authentication)
|--------------------------------------------------------------------------
*/

Route::group(['middleware' => 'auth'], function () {
    resource('jobs', 'JobsController');
    resource('invoices', 'InvoicesController');
    resource('clients', 'ClientsController');
    resource('categories', 'JobCategoriesController');
});


/*
|--------------------------------------------------------------------------
| API Routes (Requires Authentication)
|--------------------------------------------------------------------------
*/

// , 'middleware' => ['auth', 'active', 'verified', 'notBlocked']

Route::group(['prefix' => 'api/v1/', 'namespace' => 'API', 'middleware' => 'auth'], function () {
    resource('jobs', 'JobsController');
    resource('invoices', 'InvoicesController');
    resource('clients', 'ClientsController');
    resource('categories', 'JobCategoriesController');
});
