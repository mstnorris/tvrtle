<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('user_id')->unsigned()->indexed();
            $table->string('salutation');
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('nick_name');
            $table->date('date_of_birth');
            $table->string('address_line_1');
            $table->string('address_line_2')->nullable();
            $table->string('address_line_3')->nullable();
            $table->string('address_line_4')->nullable();
            $table->string('address_city');
            $table->string('address_county')->nullable();
            $table->string('address_postcode');
            $table->string('private_email_address');
            $table->string('telephone_number')->nullable();
            $table->string('mobile_number');
            $table->string('emergency_contact_name');
            $table->string('emergency_contact_relationship');
            $table->string('emergency_contact_number');
            $table->integer('team_listing_priority')->default('7');
            $table->string('profile_photo_url')->nullable();
            $table->string('job_title');
            $table->string('bio');
            $table->date('company_start_date');
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
        Schema::drop('profiles');
    }
}
