<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class CreateUsersController extends Controller
{
    public function index(User $user)
    {
        return view('users/index')->with(['posts' => $user->get()]);
    }
    
    //解説3:データ取得&表示の応用から
}
