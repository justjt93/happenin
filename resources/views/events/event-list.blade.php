@extends('layout')

@section('title')
Happenin' - Events
@endsection

@section('content')

    <div id="event-list"></div>

    <script src="{{ mix('js/event-list.js') }}"></script>

@endsection