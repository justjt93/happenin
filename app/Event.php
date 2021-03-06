<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['title', 'address', 'starts_at', 'ends_at', 'description', 'type_id', 'user_id', 'latitude', 'longitude'];

    protected $appends = ['avg_rating'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function comments()
    {
        return $this->hasMany('App\Comment')->orderBy('created_at', 'DESC');
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

    public function getAvgRatingAttribute()
    {   
        $sum=array_sum(array_map(function($rating){
// dd($rating);
            return $rating["value"];

        }, $this->ratings->toArray()));

        if(!$this->ratings->count()) {
            return null;
        }

        return $sum/$this->ratings->count();
        // return $this->ratings();
    }
}
