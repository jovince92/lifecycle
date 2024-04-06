<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusReqDocsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bus_req_docs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('program_id')->index();
            $table->unsignedBigInteger('user_id')->index();
            $table->string('volume');
            $table->string('turnaround');
            $table->string('accuracy');
            $table->string('output_format');
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
        Schema::dropIfExists('bus_req_docs');
    }
}
