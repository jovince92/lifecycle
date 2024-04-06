<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusReqDoc extends Model
{
    use HasFactory;
    protected $fillable = ['program_id','user_id','volume','turnaround','accuracy','output_format'];
    public function items(){
        return $this->hasMany(BusReqDocItem::class);
    }
}
