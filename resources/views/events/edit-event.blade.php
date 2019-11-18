@extends('layout')

@section('metas')
<meta name="edited-event" content="{{$event}}">
@endsection

@section('title')
Edit event
@endsection

@section('content')

    <div id="edit-event"></div>

    <script src="{{ mix('js/edit-event.js') }}"></script>

@endsection