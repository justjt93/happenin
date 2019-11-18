<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],
    'facebook' => [
        'client_id' => '600404850703791',
        'client_secret' => 'a37fe733a1e2417d3fdef9c1405558ad',
        'redirect' => 'http://localhost:3000/login/facebook/callback',
    ],
    'google' => [
        'client_id' => '700573757108-lk7rsn0gt5q27mdo1tsm1vrh1e2se56n.apps.googleusercontent.com',
        'client_secret' => 'ASAr5qPEhnjg_jVuvXNLaqYV',
        'redirect' => 'http://localhost:3000/login/google/callback',
    ],

];
