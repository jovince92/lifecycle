<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function project_coordinators(){
        return $this->hasMany(ProjectCoordinator::class);
    }

    public function project_programmers(){
        return $this->hasMany(ProjectProgrammer::class);
    }
}
