<?php

namespace Tvrtle\Providers;

use Illuminate\Support\ServiceProvider;
use Vinkla\Hashids\Facades\Hashids;
use Tvrtle\Client;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Client::created(function ($client) {
            $client->client_id = Hashids::connection('client_id')->encode($client->id);
            $client->save();
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() == 'local') {
            $this->app->register('Laracasts\Generators\GeneratorsServiceProvider');
        }
    }
}
