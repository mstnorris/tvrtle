<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(Tvrtle\User::class, function ($faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'password' => str_random(10),
        'remember_token' => str_random(10),
    ];
});

//$factory->define(Tvrtle\Job::class, function ($faker) {
//    return [
//        'job_category_id' => $faker->randomElement(\Tvrtle\JobCategory::lists('id')->all()),
//        'name' => $faker->name,
//        'job_id' => $faker->unique()->numberBetween(1,999),
//    ];
//});
//
//$factory->define(Tvrtle\Invoice::class, function ($faker) {
//    return [
//        'invoice_id' => str_random(6)
//    ];
//});

$factory->define(Tvrtle\Client::class, function ($faker) {
    return [
        'tvrtle_id' => $faker->unique()->randomDigit,
        'client_name' => $faker->company,
        'client_address' => $faker->address,
    ];
});
