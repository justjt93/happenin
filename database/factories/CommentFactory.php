<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Comment;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {


    return [
        // 'user_id' => factory(App\User::class), created by UserSeeder
        // 'user_id' => $faker->numberBetween(1, 1000),
        'event_id' => $faker->numberBetween(1, 1000),
        'description' => $faker->sentence(6, true)
    ];
});
