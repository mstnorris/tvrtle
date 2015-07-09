<?php namespace Tvrtle\Providers;

use Illuminate\Support\ServiceProvider;
use Tvrtle\Repositories\ClientRepository;
use Tvrtle\Repositories\EloquentClientRepository;
use Tvrtle\Repositories\EloquentInvoiceRepository;
use Tvrtle\Repositories\EloquentJobCategoryRepository;
use Tvrtle\Repositories\EloquentJobRepository;
use Tvrtle\Repositories\EloquentUserRepository;
use Tvrtle\Repositories\InvoiceRepository;
use Tvrtle\Repositories\JobCategoryRepository;
use Tvrtle\Repositories\JobRepository;
use Tvrtle\Repositories\UserRepository;

class DatabaseServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(ClientRepository::class, function () {
            return new EloquentClientRepository;
        });

        $this->app->singleton(InvoiceRepository::class, function () {
            return new EloquentInvoiceRepository;
        });

        $this->app->singleton(JobRepository::class, function () {
            return new EloquentJobRepository;
        });

        $this->app->singleton(JobCategoryRepository::class, function () {
            return new EloquentJobCategoryRepository;
        });

        $this->app->singleton(UserRepository::class, function () {
            return new EloquentUserRepository;
        });
    }
}
