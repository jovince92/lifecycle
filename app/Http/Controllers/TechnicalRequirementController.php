<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Step;
use App\Models\TeqReqDoc;
use App\Models\TeqReqDocItem;
use Illuminate\Http\Request;

class TechnicalRequirementController extends Controller
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
        $program = Program::findOrFail($request->program_id);
        TeqReqDoc::create([
            'program_id' => $request->program_id,
            'accuracy' => $request->accuracy,
            'output_format' => $request->output_format,
        ]);
        
        if($program->step->id == Step::where('step','3')->first()->id){
            $program->update([
                'step_id' => Step::where('step','4')->first()->id
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
        $trd = TeqReqDoc::findOrFail($id);
        $trd->update([
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

    public function item_store(Request $request)
    {
        $item = TeqReqDocItem::create([
            'teq_req_doc_id' => $request->teq_req_doc_id,
            'req_description' => $request->req_description,
            //'test_case_id' => $request->test_case_id,
            'test_case_description' => $request->test_case_description,
            'test_case_remarks' => $request->test_case_remarks,
            'test_case_status' => $request->test_case_status,
        ]);

        $test_case_id = 'TRD_TC'.strval($item->id);
        $item->update([
            'test_case_id' => $test_case_id,
        ]);
        return redirect()->back();
    }

    public function item_update(Request $request, $id)
    {
        $item = TeqReqDocItem::findOrFail($id);
        $item->update([
            'req_description' => $request->req_description,
            'test_case_description' => $request->test_case_description,
            'test_case_remarks' => $request->test_case_remarks,
            'test_case_status' => $request->test_case_status,
        ]);
        return redirect()->back();
    }


    public function item_destroy($id)
    {
        $item = TeqReqDocItem::findOrFail($id);
        $item->delete();
        return redirect()->back();
    }
}
