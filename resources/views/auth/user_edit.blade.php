@extends('layout')

@section('title')
Edit user - {{auth()->user()->name}} 
@endsection
 
@section('content')

    <div id="user_edit"></div>

    <script src="{{ mix('js/user-edit.js') }}"></script>
  
@endsection