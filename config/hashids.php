<?php

/*
 * This file is part of Laravel Hashids.
 *
 * (c) Vincent Klaiber <hello@vinkla.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

return [

    /*
    |--------------------------------------------------------------------------
    | Default Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the connections below you wish to use as
    | your default connection for all work. Of course, you may use many
    | connections at once using the manager class.
    |
    */

    'default' => 'invoice_id',

    /*
    |--------------------------------------------------------------------------
    | Hashids Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the connections setup for your application. Example
    | configuration has been included, but you may add as many connections as
    | you would like.
    |
    */

    'connections' => [

        'client_id' => [
            'salt' => '5A2Uzuagrz7mzE2fox6uebYBf0ctZYonWispuqeaH2S1lwfkytAOOUG5YNkS48b9',
            'length' => '7',
            'alphabet' => 'HMN34P67R9TWCXYF' // ABCDEFGHIJKLMNOPQRSTUVWXYZ // CFHKMPRTWXY34679
        ],

        'invoice_id' => [
            'salt' => 'cFvYu92OB1dq76Q7us6v7IDcUO8dErTRufW7B4aZ2PH7kfJAved8s9LoQP8dEsTc',
            'length' => '8',
            'alphabet' => 'HMN34P67R9TWCXYF' // HMN34P67R9TWCXYF // CFHKMPRTWXY34679 // ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
        ],

        'job_id' => [
            'salt' => 'S4UzObwKv2l2eqZTyypDrQLVYUoqHesBAlOhqvyVMcabuYLa9P3EUaO96znAqZLU',
            'length' => '9',
            'alphabet' => 'HMN34P67R9TWCXYF' // ABCDEFGHIJKLMNOPQRSTUVWXYZ // CFHKMPRTWXY34679
        ],
    ],

];
