@extends('auth.layout')

@section('title')
Login
@endsection
 
@section('content')

    <div id="login"></div>

    <script src="{{ mix('js/login.js') }}"></script>

  {{-- <div class="register-form">
      <h3>Sign in</h3>
 
      <form action="{{ route('login') }}" method="POST">
      @csrf
    
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
    
      <button type="submit" class="btn-sign-up">Login</button>
    
      </form>
  </div>
   --}}
  
@endsection