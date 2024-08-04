<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use App\Models\User;
use Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function register(Request $request){
        try {
            if(Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('password')])){
                $user=Auth::user();
                $response['token']=$user->createToken('ReactApp');
                $response['user']=$user->name;
                $response['role']=($user->is_admin == 1) ? 'admin' : 'user';
                return response()->json($response,200);
            }else{
                return response()->json(1);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function signout(Request $request){
        try {
            Auth::user()->tokens->each(function($token, $key) {
                $token->delete();
            });

            return response()->json('success');
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function login(Request $request) {
        if(Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('password')])){
            $user=Auth::user();
            $response['token']=$user->createToken('ReactApp');
            $response['user']=$user;
        return response()->json($response,200);
        }else{
            return response()->json(['message'=>'Invalid Credentials error'],401);
        }
    }
    public function details(Request $request) {
        if (Auth::guard('api')->check())
        {
            $user=Auth::user();
            $response['user']=$user;
            return response()->json($response,200);

        }


    }
}
