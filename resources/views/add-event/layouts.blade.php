<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="logged-in-user" content="{{auth()->user()}}">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <title>Add event</title>
</head>
<body> 

    @yield('content')
    
</body>
</html>