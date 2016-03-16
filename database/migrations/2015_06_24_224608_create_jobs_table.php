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
            $table->string('invoice_id', 8)->index();
            $table->foreign('invoice_id')->references('invoice_id')->on('invoices');
            $table->text('description');
            $table->integer('rate')->unsigned();
            $table->decimal('quantity', 6, 2);
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
