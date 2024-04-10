<?php

namespace App\Http\Controllers;

use App\Models\BusReqDoc;
use App\Models\BusReqDocItem;
use App\Models\Program;
use App\Models\Step;
use Illuminate\Http\Request;

class BusinessRequirementController extends Controller
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

    
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $program = Program::findOrFail($request->program_id);
        BusReqDoc::create([
            'program_id' => $request->program_id,
            'user_id' => $user->id,
            'volume' => $request->volume,
            'turnaround' => $request->turnaround,
            'accuracy' => $request->accuracy,
            'output_format' => $request->output_format,
        ]);

        if($program->step->id == Step::where('step','1')->first()->id){
            $program->update([
                'step_id' => Step::where('step','2')->first()->id
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
        //
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
        $bus_req_doc = BusReqDoc::findOrFail($id);
        $bus_req_doc->update([
            'volume' => $request->volume,
            'turnaround' => $request->turnaround,
            'accuracy' => $request->accuracy,
            'output_format' => $request->output_format,
        ]);
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
        //
    }

    public function item_store(Request $request){
        BusReqDocItem::create([
            'bus_req_doc_id' => $request->bus_req_doc_id,
            'module' => $request->module,
            'applicable_roles' => $request->applicable_roles,
            'description' => $request->description,
        ]);
        return redirect()->back();
    }


    public function item_destroy($id){
        $item=BusReqDocItem::findOrFail($id);
        $item->delete();
        return redirect()->back();
    }
}
