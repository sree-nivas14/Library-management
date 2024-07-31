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
            //     $data_exists = User::where('email', $request->email)->where('password',$request->password)->count();
            //     if($data_exists == 1){
            //         $response = 0;
            //     }else{
            //         $response = 1;
            //     }
            if(Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('password')])){
                $user=Auth::user();
                $response['token']=$user->createToken('ReactApp');
                $response['role']=($user->is_admin == 1) ? 'admin' : 'user';
                return response()->json($response,200);
            }else{
                return response()->json(1);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function signout(Request $request){dd(Auth::guard('api')->check());
        Auth::user()->tokens->each(function($token, $key) {
            $token->delete();
        });

        return response()->json('success');
    }

    public function login(Request $request) {
        // dd($request->all(), $request->input('email'));
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
        // $user=Auth::user();
        // $response['user']=$user;
        // return response()->json($response,200);
        if (Auth::guard('api')->check())
        {
            $user=Auth::user();
            $response['user']=$user;
            return response()->json($response,200);

        }


    }
}
