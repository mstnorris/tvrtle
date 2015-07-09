<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('job_id', 9)->unique();
            $table->integer('job_client_id')->unsigned()->index()->nullable();
            $table->foreign('job_client_id')->references('id')->on('clients')->onDelete('set null');
            $table->integer('job_category_id')->unsigned()->index()->nullable();
            $table->foreign('job_category_id')->references('id')->on('job_categories')->onDelete('set null');
            $table->string('job_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('jobs');
    }
}
