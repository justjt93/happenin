<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    public function images()
    {
        return $this->hasMany('App\Image');
    }

    public function ratings()
    {
        return $this->hasMany('App\Rating');
    }

    public function type()
    {
        return $this->belongsTo('App\Type');
    }
}
