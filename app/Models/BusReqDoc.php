<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusReqDoc extends Model
{
    use HasFactory;
    protected $fillable = ['program_id','user_id','volume','turnaround','accuracy','output_format'];
    protected $with = ['items','user'];
    public function program(){
        return $this->belongsTo(Program::class);
    }
    public function items(){
        return $this->hasMany(BusReqDocItem::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
