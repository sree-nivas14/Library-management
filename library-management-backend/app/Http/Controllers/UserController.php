<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function getUserList()
    {
        try {
                $userData = User::all();
                return response()->json($userData,200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function deleteUser(Request $request)
    {
        try {
                $userData = User::where('id', '=', $request->values)->delete();
                return response()->json($userData,200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function addUser(Request $request)
    {
        try {
            $exists = User::where('id_no', $request->identity_no)
                    ->orWhere('email', $request->email)
                    ->orWhere('phone_number', $request->phone_no)
                    ->exists();

            if ($exists) {
                $response = 1;
            } else {
                User::create([
                    'id_no' => $request->identity_no,
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'phone_number' => $request->phone_no,
                    'role' => $request->role,
                    'is_admin' => ($request->role == 'admin') ? 1 : 0,
                ]);
                $response = 0;
            }
            return response()->json($response,200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }

    public function updateUser(Request $request)
    {
        try {
            $dataIsPresent = User::where('id_no', $request->identity_no)
                    ->where('name', $request->name)
                    ->where('email', $request->email)
                    // ->where('password', Hash::make($request->password))
                    ->where('phone_number', $request->phone_no)
                    ->where('role', $request->role)
                    ->where('id',$request->id)
                    ->count();
            if ($dataIsPresent != 0) {
                $response = 1;
            } else {
                User::where('id', $request->id)->update([
                    'name'          =>  $request->name,
                    'email'         =>  $request->email,
                    // 'password'      =>  Hash::make($request->password),
                    'phone_number'  =>  $request->phone_no,
                    'role'          =>  $request->role,
                    'is_admin'      => ($request->role == 'admin') ? 1 : 0,
                ]);
                $response = 0;
            }
            return response()->json($response,200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch posts.'], 500);
        }
    }
}
