<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeqReqDocItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teq_req_doc_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('teq_req_doc_id')->index();
            $table->string('req_description');
            $table->string('test_case_id')->index()->nullable();
            $table->string('test_case_description')->nullable();
            $table->string('test_case_remarks')->nullable();
            $table->string('test_case_status')->nullable();
            $table->timestamps();

            $table->foreign('teq_req_doc_id')->references('id')->on('teq_req_docs')->onDelete('cascade');            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('teq_req_doc_items');
    }
}
