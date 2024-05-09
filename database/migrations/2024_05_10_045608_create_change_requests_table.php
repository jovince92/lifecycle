<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChangeRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('change_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('program_id')->index();
            $table->unsignedBigInteger('user_id')->index();
            $table->string('title');
            $table->text('description');
            $table->tinyInteger('client_request')->default(0);
            $table->tinyInteger('incident_or_problem_resolution')->default(0);            
            $table->tinyInteger('enhancement')->default(0);            
            $table->tinyInteger('business_requirement')->default(0);            
            $table->tinyInteger('procedural')->default(0);
                        
            $table->tinyInteger('others')->default(0);
            $table->string('others_description')->nullable();
            $table->date('schedule')->nullable();

            $table->string('hardware')->nullable();
            $table->string('software')->nullable();
            $table->string('manpower')->nullable();
            $table->string('location')->nullable();
            $table->string('office_equipment')->nullable();
            $table->string('other')->nullable();

            $table->tinyInteger('is_done')->default(0);
            
            
            $table->timestamps();

            $table->foreign('program_id')->references('id')->on('programs')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('change_requests');
    }
}
