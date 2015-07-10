<?php

namespace Tvrtle\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * @var array
     */
    protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \Tvrtle\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \Tvrtle\Http\Middleware\VerifyCsrfToken::class,
    ];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => \Tvrtle\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'guest' => \Tvrtle\Http\Middleware\RedirectIfAuthenticated::class,
        'active' => \Tvrtle\Http\Middleware\Active::class,
        'notBlocked' => \Tvrtle\Http\Middleware\NotBlocked::class,
        'verified' => \Tvrtle\Http\Middleware\Verified::class,
        'officeBased' => \Tvrtle\Http\Middleware\OfficeBase::class
    ];
}
