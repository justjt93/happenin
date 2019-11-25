<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use App\Event;
use App\Image;
use App\User;
use App\Rating;
use Spatie\Geocoder\Geocoder;
use Illuminate\Notifications\Notifiable;
use App\Notifications\EventAdded;

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

    //paginated events
    public function paginated(Request $request)
    {
        $type = str_split($request->input('type'));
        $search = $request->input('search');
        if ($type[0] !== "" && $search !== "") {
            return Event::wherein('type_id', $type)
                ->orderBy('title')
                ->where('title', 'like', '%' . $search . '%')
                ->with("images")->with("ratings")
                ->with("comments")
                ->paginate(12);
        } elseif ($type[0] !== "") {
            return Event::orderBy('title')
                ->wherein('type_id', $type)
                ->with("images")
                ->with("ratings")
                ->with("comments")
                ->paginate(12);
        } elseif ($search !== "") {
            return Event::orderBy('title')
                ->where('title', 'like', '%' . $search . '%')
                ->with("images")
                ->with("ratings")
                ->with("comments")
                ->paginate(12);
        } else {
            return Event::orderBy('title', 'desc')
                ->with("images")
                ->with("ratings")
                ->with("comments")
                ->paginate(12);
        }
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
        $geocoder->setApiKey(config('geocoder.key'));
        $address = $geocoder->getCoordinatesForAddress($request->input('address'));

        //formatting inputs
        $type_id = (int) $request->input('type_id');


        $event = Event::create([
            'title' => $request->input('title'),
            'address' => $request->input('address'),
            'starts_at' => $request->input('starts_at'),
            'ends_at' => $request->input('ends_at'),
            'description' => $request->input('description'),
            'user_id' => auth()->user()->id,
            'latitude' => $address['lat'],
            'longitude' => $address['lng'],
            'type_id' => $type_id
        ]);

        // if ($request->hasfile('image')) {

        foreach ($request->file('image', []) as $file) {
            $extension = $file->getClientOriginalExtension(); // getting image extension
            $filename = uniqid() . '.' . $extension;
            $file->move('images/uplodaded_event_images', $filename);

            $image = Image::create([
                'user_id' => auth()->user()->id,
                'url' => "images/uplodaded_event_images/" . $filename,
                'event_id' => $event->id,
            ]);
        }





        // }

        $username = auth()->user()->name;
        auth()->user()->notify(new EventAdded($username));

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
        $event = Event::findOrFail($id);
        return $event;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $event = Event::findOrFail($id);
        return view('events.edit-event', compact('event'));
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
        $this->validate($request, [
            'title' => 'required|min:3|max:127',
            'address' => 'required|min:3|max:127',
            'starts_at' => 'required|max:127',
            'ends_at' => 'required|max:127',
            'description' => 'required|min:10|max:2000',
        ]);

        $client = new \GuzzleHttp\Client();
        $geocoder = new Geocoder($client);
        $geocoder->setApiKey(config('geocoder.key'));
        $address = $geocoder->getCoordinatesForAddress($request->input('address'));

        //formatting inputs
        $type_id = (int) $request->input('type_id');

        $event = Event::findOrFail($id);
        $event->title = $request->input('title');
        $event->address = $request->input('address');
        $event->starts_at = $request->input('starts_at');
        $event->ends_at = $request->input('ends_at');
        $event->description = $request->input('description');
        $event->latitude = $address['lat'];
        $event->longitude = $address['lng'];
        $event->type_id = $type_id;
        $event->save();

        return $event;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        return "successfully deleted";
    }

    public function checkRating(Request $request)
    {
        $rating = Rating::where('user_id', $request->input('user'))->where('event_id', $request->input('event'))->first();

        return $rating;
    }
    
    public function storeRating(Request $request)
    {
        $rating = Rating::where('user_id', $request->input('user_id'))->where('event_id', $request->input('event_id'))->first();

        if ($rating) {
            $rating->value = $request->input('value');
            $rating->save();
        } else {
            $rating = Rating::create([
                'user_id'=>$request->input('user_id'),
                'event_id'=>$request->input('event_id'),
                'value'=>$request->input('value')
            ]);
        }
        
        return $rating;
    }
}
