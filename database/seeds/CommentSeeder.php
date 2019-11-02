<?php

use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $comments = factory(App\Comment::class, 10)->create();

        factory(App\Comment::class, 10)->create();
    }
}
