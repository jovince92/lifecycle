<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class HRMSController extends Controller
{
    public function store(Request $request){
        $company_id=$request->company_id;
        $password=$request->password;



        $response = Http::asForm()->post('idcsi-officesuites.com:8080/hrms/sso.php',[
            'username' => $company_id,
            'password' => $password
        ]);

        if($response['code']!="0"){
            throw ValidationException::withMessages(['company_id'=>$response['message']??'Invalid Credentials']);
        }

        
        
        
        $hrms_response = Http::asForm()->post('idcsi-officesuites.com:8080/hrms/api.php',[
            'idno' => $company_id,
            'what' => 'getinfo',
            'field' => 'personal',
            'apitoken' => 'IUQ0PAI7AI3D162IOKJH'
        ]);

        
        
        $message= $hrms_response['message'];
        $imageContent = file_get_contents($message['picture_location']);
        $location='uploads/photos/user_'.$company_id.'/';
        $path=public_path($location);
        if (!file_exists($path)) {
            File::makeDirectory($path,0777,true);
        }
        
        File::put(str_replace('/','\\',$path).$company_id,$imageContent,true);
        $user=User::firstOrCreate(
        ['company_id'=>$company_id],
        [
            'first_name'=>$message['first_name'],
            'last_name'=>$message['last_name'],
            'photo'=>$location.$company_id,
            'password'=>bcrypt('password'),
            'position'=>$message['job_job_title'],
            'department'=>$message['project'],
        ]);
        

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }
}
