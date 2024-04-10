<?php

namespace App\Http\Controllers;

use App\Mail\TRDNotification;
use App\Models\Program;
use App\Models\ProgramProgrammer;
use App\Models\ProgramTester;
use App\Models\Step;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $program = Program::create([
            'project_id'=>$request->project_id,
            'name'=>$request->name,
            'department'=>$request->department,
            'date_prepared'=> Carbon::parse( $request->date_prepared),
            'scope_of_testing'=>$request->scope_of_testing,
            'test_strategy'=>$request->test_strategy,
            'testing_schedule'=>Carbon::parse($request->testing_schedule),
            'resources_needed'=>$request->resources_needed,
            'system_deadline'=>Carbon::parse($request->system_deadline)
        ]);

        $programmers = $request->programmers;
        foreach($programmers as $programmer){
            $user=User::firstOrCreate(
                ['company_id'=>$programmer['idno']],
                [
                    'first_name'=>$programmer['first_name'],
                    'last_name'=>$programmer['last_name'],
                    'password'=>bcrypt('password'),
                    'position'=>$programmer['job_job_title'],
                    'department'=>$programmer['department'],
                    'email'=>$programmer['work_email'],
                ]);
            ProgramProgrammer::create([
                'program_id'=>$program->id,
                'user_id'=>$user->id
            ]);
        }

        $testers = $request->testers;
        foreach($testers as $tester){
            $user=User::firstOrCreate(
                ['company_id'=>$tester['idno']],
                [
                    'first_name'=>$tester['first_name'],
                    'last_name'=>$tester['last_name'],
                    'password'=>bcrypt('password'),
                    'position'=>$tester['job_job_title'],
                    'department'=>$tester['department'],
                    'email'=>$tester['work_email'],
                ]);
            ProgramTester::create([
                'program_id'=>$program->id,
                'user_id'=>$user->id
            ]);
        }

        return redirect()->back();
    }

    public function new(Request $request)
    {
        
        $program=Program::create([
            'project_id'=>$request->project_id,
            'name'=>$request->name,
            'department'=>$request->department,
            'step_id'=>Step::where('step',1)->first()->id
        ]);

        $programmers = $request->programmers;
        foreach($programmers as $programmer){
            $user=User::firstOrCreate(
                ['company_id'=>$programmer['idno']],
                [
                    'first_name'=>$programmer['first_name'],
                    'last_name'=>$programmer['last_name'],
                    'password'=>bcrypt('password'),
                    'position'=>$programmer['job_job_title'],
                    'department'=>$programmer['department'],
                    'email'=>$programmer['work_email'],
                ]);
            ProgramProgrammer::create([
                'program_id'=>$program->id,
                'user_id'=>$user->id
            ]);
        }

        $testers = $request->testers;
        foreach($testers as $tester){
            $user=User::firstOrCreate(
                ['company_id'=>$tester['idno']],
                [
                    'first_name'=>$tester['first_name'],
                    'last_name'=>$tester['last_name'],
                    'password'=>bcrypt('password'),
                    'position'=>$tester['job_job_title'],
                    'department'=>$tester['department'],
                    'email'=>$tester['work_email'],
                ]);
            ProgramTester::create([
                'program_id'=>$program->id,
                'user_id'=>$user->id
            ]);
        }
        
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $program=Program::with(['project','business_requirement_document','techinical_requirement_document'])->where('id',$id)->firstOrFail();
        Inertia::share('selected_program',$program);
        return Inertia::render('Program',[
            'program'=>$program
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $program = Program::findOrFail($id);
        $program->update([
            'name'=>$request->name,
            'department'=>$request->department,
            'date_prepared'=> Carbon::parse( $request->date_prepared),
            'scope_of_testing'=>$request->scope_of_testing,
            'test_strategy'=>$request->test_strategy,
            'testing_schedule'=>Carbon::parse($request->testing_schedule),
            'resources_needed'=>$request->resources_needed,
            'system_deadline'=>Carbon::parse($request->system_deadline)
        ]);

        //delete all programmers and testers
        $old_programmers = ProgramProgrammer::where('program_id',$id)->get();
        $old_programmers->each(function($programmer){
            $programmer->delete();
        });
        $old_testers = ProgramTester::where('program_id',$id)->get();
        $old_testers->each(function($tester){
            $tester->delete();
        });
        $programmers = $request->programmers;
        foreach($programmers as $programmer){
            $user=User::firstOrCreate(
                ['company_id'=>$programmer['idno']],
                [
                    'first_name'=>$programmer['first_name'],
                    'last_name'=>$programmer['last_name'],
                    'password'=>bcrypt('password'),
                    'position'=>$programmer['job_job_title'],
                    'department'=>$programmer['department'],                                   
                    'email'=>$programmer['work_email'],
                    
                ]);
            ProgramProgrammer::create([
                'program_id'=>$program->id,
                'user_id'=>$user->id
            ]);
        }

        $testers = $request->testers;
        foreach($testers as $tester){
            $user=User::firstOrCreate(
                ['company_id'=>$tester['idno']],
                [
                    'first_name'=>$tester['first_name'],
                    'last_name'=>$tester['last_name'],
                    'password'=>bcrypt('password'),
                    'position'=>$tester['job_job_title'],
                    'department'=>$tester['department'],                                    
                    'email'=>$tester['work_email'],
                ]);
            ProgramTester::create([
                'program_id'=>$program->id,
                'user_id'=>$user->id
            ]);
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $program = Program::findOrFail($id);
        $program->delete();
        return redirect()->back();
    }

    public function trd_notif(Request $request){
        $program = Program::findOrFail($request->program_id);
        $testers = $program->program_testers;
        
        //create an array of emails from $users->email field
        $emails = array_map(function($user) {
            return $user['email'];
        }, $testers->toArray());
        
        $coordinators = $program->project->project_coordinators;
        $programmers = $program->program_programmers;
        
        $coordinator_emails = array_map(function($user) {
            return $user['email'];
        }, $coordinators->toArray());

        $programmer_emails = array_map(function($user) {
            return $user['email'];
        }, $programmers->toArray());

        $cc_emails = array_merge($coordinator_emails,$programmer_emails);

        Mail::to($emails)
                ->cc($cc_emails)
                ->send(new TRDNotification(
                    env('MAIL_FROM_NAME','DDC Software'),
                    env('MAIL_FROM_ADDRESS','donotreply@ddc-software.com'),
                    $request->subject,
                    $request->body
                )
            );

        $next_step = Step::where('step',3)->first();
        $program->update([
            'step_id'=>$next_step->id
        ]);
        return redirect()->back();
    }
}
