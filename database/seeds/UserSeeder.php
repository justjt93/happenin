<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // factory(App\User::class, 10)->create();

        factory(App\User::class, 50)->create()->each(function ($user) {
            $user->comments()->save(factory(App\Comment::class)->make());
        })->each(function ($user) {
            $user->ratings()->save(factory(App\Rating::class)->make());
        })->each(function ($user) {
            for ($i=0;$i<10;$i++) {
                $user->images()->save(factory(App\Image::class)->make());
            }
        });
    }
}
