<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'id_no'         => 'LB0001',
            'name'          => 'superadmin',
            'email'         => 'superadmin@gmail.com',
            'password'      => Hash::make('superadmin@123'),
            'phone_number'  => '9876543210',
            'role'          => 'admin',
            'is_admin'      => 1
        ]);
    }
}
