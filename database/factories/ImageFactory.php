<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Image;
use Faker\Generator as Faker;

$factory->define(Image::class, function (Faker $faker) {
    return [
        'event_id' => $faker->numberBetween(1, 1000),
        'url' => 'https://picsum.photos/id/' . strval(rand(1, 1000)) . '/700/300'
    ];
});
