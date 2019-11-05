@extends('auth.layout')

@section('title')
Registration 
@endsection
 
@section('content')

  <div class="register-form">
      <h3>Registration</h3>
 
      <form action="{{ route('register') }}" method="POST">
      @csrf
    
      <div class="form-group">
          <input class="form-control @error('name')is-invalid @enderror" type="text" name="name" id="name" placeholder="Your name" value="{{ old('name') }}">
          @error('name')
                <span class="error-message">{{ $message }}</span>
          @enderror
      </div>
    
      <div class="form-group">
          <input class="form-control @error('name')is-invalid @enderror" id="email" type="email" name="email" placeholder="Email" value="{{ old('email') }}">
          @error('email')
                <span class="error-message">{{ $message }}</span>
          @enderror
      </div>
    
      <div class="form-group">
          <input class="form-control @error('name')is-invalid @enderror" id="password" type="password" name="password" placeholder="Password" value="">
          @error('password')
                <span class="error-message">{{ $message }}</span>
          @enderror
      </div>
    
      <div class="form-group">
          <input class="form-control" type="password" name="password_confirmation" id="password_confirmation" placeholder="Re-enter password" value="">
      </div>
    
      <button type="submit" class="btn-sign-up">Sign up</button>
    
      </form>
  </div>
  
  
@endsection