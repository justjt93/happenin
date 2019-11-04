<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh; /* to be adjusted once menu added */
        width: 100%;
      }

      .form-group {
        margin-bottom: 1rem;
      }

      .error-message {
        color: red;
      }
      
      .register-form {
        background-color: black;
        border-radius: 10px;
        color: white;
        padding: 2rem;
        min-width: 50%;
      }

      .form-control {
        background-color: black;
        color: white;
        border: none;
        border-bottom: darkgrey solid 1px;
        width: 100%;
        font-size: 1rem;
      }

      .form-control::placeholder {
        font-size: 1rem;
        color: darkgrey;
      }

      h3 {
        margin: 0;
        margin-bottom: 1rem;
        text-align: center;
      }

      .btn-sign-up {
        width: 100%;
        border: none;
        background-color: white;
        font-size: 1rem;
      }
    </style>
 
    <title>@yield('title')</title>
</head>
<body>
 
    @yield('content')
 
</body>
</html>