<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoggedInController extends Controller
{
    public function index()
    {
        return view("auth.logged-in");
    }
}
