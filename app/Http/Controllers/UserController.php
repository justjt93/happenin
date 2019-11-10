<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return view("auth.user_detail");
    }

    public function edit()
    {
        return view("auth.user_edit");
    }

    public function store(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|min:3|max:127',
            'email' => 'required|email|max:127',
         ]);

        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();


        return ["status" => "information sucessfully changed"];
    }

    public function changePassword(Request $request, $id)
    {
        $this->validate($request, [
            'password' => 'required|password',
            'newPassword' => 'required|confirmed',
         ]);
        
        $user = User::find($id);
        $user->password = Hash::make($request->newPassword);
        $user->save();

        return ["status" => "password succesfully changed"];
    }
}
