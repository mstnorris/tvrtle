var elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.scripts([
        'vendor/jquery.js',
        'vendor/bootstrap.js',
        'vendor/lettering.js',
        'vendor/socket.io.js',
        'vendor/textillate.js',
        //'vendor/material.js',
        'vendor/vue.js',
        'vendor/vue-marked.js',
        'vendor/vue-resource.js',
        'app.js'
    ]);

    mix.sass('app.scss', 'resources/assets/css/app.css');

    mix.styles([
        'vendor/animate.css',
        'vendor/font-awesome.css',
        //'vendor/material.css',
        'app.css',
        'style.css'
    ]);

    mix.copy('resources/assets/fonts', 'public/build/fonts/');

    mix.version(["css/all.css", "js/all.js"]);
});