<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="logged-in-user" content="{{auth()->user()}}">
    @if(auth()->user())
    <meta name="user-events" content="{{auth()->user()->events}}">
    @endif
    @yield('metas')
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    {{-- please either delete this font if not used or import it in the CSS --}}
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet"> 
    <title>@yield('title')</title>
</head>
<body>
      @yield('content')

      <script src="https://kit.fontawesome.com/3bca9cb446.js" crossorigin="anonymous"></script>
</body>
</html>