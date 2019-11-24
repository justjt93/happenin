@extends('layout')

@section('title')
Registration 
@endsection
 
@section('content')

    <div id="register"></div>

    <script type='text/javascript'>
        window.__username = '{{$name ?? ''}}' || null 
        window.__useremail = '{{$email ?? ''}}' || null
        window.__avatar = '{{$avatar ?? ''}}' || null
    </script>
    <script src="{{ mix('js/register.js') }}"></script>
  
@endsection