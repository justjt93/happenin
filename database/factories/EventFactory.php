<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Event;
use Faker\Generator as Faker;

$factory->define(Event::class, function (Faker $faker) {
    return [
        'title' => $faker->jobTitle,
        'description' => $faker->realText(200, 2),
        'latitude' => $faker->latitude(50.059148, 50.112787),
        'longitude' => $faker->longitude(14.356330, 14.467470),
        'address' => $faker->address,
        'starts_at' => $faker->dateTimeBetween('now', '+1 days'),
        'ends_at' => $faker->dateTimeBetween('+2 days', '+6 days'),
        'type_id' => $faker->numberBetween(1, 5),
        'user_id' => $faker->numberBetween(1, 50)

    ];
});
