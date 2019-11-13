<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use App\Event;
use Spatie\Geocoder\Geocoder;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Event::with("images")->with("ratings")->with("comments")->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('events.add-event');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EventRequest $request)
    { 
        $client = new \GuzzleHttp\Client();
        $geocoder = new Geocoder($client);
        //dd($geocoder);
        $geocoder->setApiKey(config('geocoder.key'));
        $address = $geocoder->getCoordinatesForAddress($request->input('address'));
        
        $event = Event::create([
            'title'=>$request->input('title'),
            'address'=>$request->input('address'),
            'starts_at'=>$request->input('starts-at'),
            'ends_at'=>$request->input('ends-at'),
            'description'=>$request->input('description'),
            'user_id'=>auth()->user()->id,
            'latitude' => $address['lat'],
            'longitude' => $address['lng'],
            'type_id'=>$request->input('type_id'),

        ]);
        return $event;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
