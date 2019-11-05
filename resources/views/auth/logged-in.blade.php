@extends('auth.layout')

@section('title')
Logged in
@endsection

@section('content')
  <div class="container">
      <p class="logged-in">Already logged in as {{auth()->user()->name}}</p><br>
      <form action="{{ route('logout') }}" method="POST">
          @csrf
          <button type="submit" class="btn-sign-up">Logout</button>
      </form>
  </div>
  
@endsection