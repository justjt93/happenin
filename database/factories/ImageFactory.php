<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Image;
use Faker\Generator as Faker;

$factory->define(Image::class, function (Faker $faker) {
    return [
        'event_id' => $faker->numberBetween(1, 100),
        'url' => 'https://picsum.photos/id/' . strval(rand(1, 300)) . '/500/300'
    ];
});
