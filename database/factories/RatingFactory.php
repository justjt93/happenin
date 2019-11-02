<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Rating;
use Faker\Generator as Faker;

$factory->define(Rating::class, function (Faker $faker) {
    return [
        'event_id' => $faker->numberBetween(1, 100),
        'value' => $faker->numberBetween(1, 5)
    ];
});
