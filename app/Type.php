<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    public function events()
    {
        return $this->hasMany('App\Event');
    }
}
