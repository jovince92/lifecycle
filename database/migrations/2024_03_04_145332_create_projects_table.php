<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index();
            $table->string('name');
            $table->string('client_name')->nullable();
            $table->date('date_prepared')->nullable(    );
            $table->string('department')->nullable();
            $table->string('scope_of_testing')->nullable(); 
            $table->string('test_strategy')->nullable();
            $table->date('testing_schedule')->nullable();
            $table->string('resources_needed')->nullable();            
            $table->date('system_deadline')->nullable();
            $table->timestamps();

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
        Schema::dropIfExists('projects');
    }
}
