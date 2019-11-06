<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="logged-in-user" content="{{auth()->user()}}">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <title>@yield('title')</title>
</head>
<body>
      @yield('content')

      <script src="https://kit.fontawesome.com/3bca9cb446.js" crossorigin="anonymous"></script>
</body>
</html>