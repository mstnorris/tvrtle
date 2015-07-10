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

get('verify/{verify_token}', ['as' => 'verify.email', 'uses' => 'UsersController@verify']);
post('send-verification-email', ['as' => 'send_verification_email_path', 'uses' => 'UsersController@sendVerificationEmail']);
get('email-view-test', function() {
    $user = \Tvrtle\User::find(1);
    return view('emails.verify_email', compact('user'));
});
get('email-verified-test', function() {
   return view('emails.verified_email');
});
/*
|--------------------------------------------------------------------------
| Internal Employee Application Routes (Requires Authentication)
|--------------------------------------------------------------------------
*/
Route::group(['middleware' => ['auth', 'verified', 'active', 'notBlocked']], function() {
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

Route::group(['prefix' => 'api/v1/', 'namespace' => 'API', 'middleware' => ['auth', 'verified', 'active', 'notBlocked']], function () {
    resource('jobs', 'JobsController');
    resource('invoices', 'InvoicesController');
    resource('clients', 'ClientsController');
    resource('categories', 'JobCategoriesController');
});
