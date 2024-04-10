<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $with = ['program_programmers','program_testers','step'];
    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function program_programmers(){
        return $this->belongsToMany(User::class,ProgramProgrammer::class);
    }

    public function program_testers(){
        return $this->belongsToMany(User::class,ProgramTester::class);
    }

    public function step(){
        return $this->belongsTo(Step::class);
    }

    public function business_requirement_document(){
        return $this->hasOne(BusReqDoc::class);
    }

    public function techinical_requirement_document(){
        return $this->hasOne(TeqReqDoc::class);
    }
}
