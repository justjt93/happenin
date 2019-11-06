<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;

class EventController extends Controller
{
    public function index()
    {
        return Event::with("images")->with("ratings")->with("comments")->get();
    }

    public function create()
    {
        return view('add-event/add-event');
    }
}
