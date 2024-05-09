<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeqReqDoc extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $with = ['items','histories'];

    public function items(){
        return $this->hasMany(TeqReqDocItem::class);
    }

    public function histories(){
        return $this->hasMany(TrdHistory::class);
    }
}
