@extends('layout')

@section('title')
Happenin' - {{auth()->user()->name}} 
@endsection
 
@section('content')

    <div id="user_detail"></div>

    <script src="{{ mix('js/user-detail.js') }}"></script>

  
@endsection