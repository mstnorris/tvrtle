<?php

use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Database\QueryException;

use Tvrtle\Client;
use Tvrtle\Invoice;
use Tvrtle\Job;
use Tvrtle\JobCategory;
use Tvrtle\Permission;
use Tvrtle\Profile;
use Tvrtle\Role;
use Tvrtle\User;
use Vinkla\Hashids\Facades\Hashids;

class ConstantsTableSeeder extends Seeder
{
    public function run()
    {

        $faker = Faker::create('en_US');

        /*
         * Base User Accounts
         */

        // Mike's account
        $michael = User::create([
            'name'       => 'Michael Norris',
            'email'      => 'mstnorris@gmail.com',
            'password'   => bcrypt('password'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        $michaelProfile = Profile::create([
            'user_id'                        => $michael->id,
            'salutation'                     => 'Mr',
            'first_name'                     => 'Michael',
            'middle_name'                    => 'Stephen Thomas',
            'last_name'                      => 'Norris',
            'nick_name'                      => 'Mike',
            'date_of_birth'                  => '1988-08-17',
            'address_line_1'                 => '78A Sackville Road',
            'address_line_2'                 => '',
            'address_line_3'                 => '',
            'address_line_4'                 => '',
            'address_city'                   => 'Hove',
            'address_county'                 => 'East Sussex',
            'address_postcode'               => 'BN3 3HB',
            'private_email_address'          => 'mstnorris@gmail.com',
            'telephone_number'               => '+44 (0) 1273 276 739',
            'mobile_number'                  => '+44 (0) 7446 990 061',
            'emergency_contact_name'         => 'Holly McNicol',
            'emergency_contact_relationship' => 'Partner',
            'emergency_contact_number'       => '+44 (0) 7950 994 570',
            'team_listing_priority'          => '0',
            'profile_photo_url'              => 'http://getwhiteboard.dev/images/mike.jpg',
            'job_title'                      => 'Software Engineer',
            'bio'                            => 'About Michael.',
            'company_start_date'             => '2008-01-01',
            'created_at'                     => Carbon::now(),
            'updated_at'                     => Carbon::now()
        ]);

        $michael->profile()->save($michaelProfile);

        // Super Administrator (User)
        $superU = User::create([
            'name'       => 'Super Administrator',
            'email'      => 'super@getwhiteboard.com',
            'password'   => bcrypt('password'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        $superUProfile = Profile::create([
            'user_id'                        => $superU->id,
            'salutation'                     => 'Mr',
            'first_name'                     => 'Scott',
            'middle_name'                    => 'Michael',
            'last_name'                      => 'Thomas',
            'nick_name'                      => 'Scottie',
            'date_of_birth'                  => '1980-01-01',
            'address_line_1'                 => 'Address line 1',
            'address_line_2'                 => '',
            'address_line_3'                 => '',
            'address_line_4'                 => '',
            'address_city'                   => 'Hove',
            'address_county'                 => 'East Sussex',
            'address_postcode'               => 'BN3 3HB',
            'private_email_address'          => 'holly.mcnicol@live.co.uk',
            'telephone_number'               => '+44 (0) 1273 276 739',
            'mobile_number'                  => '+44 (0) 7950 994 570',
            'emergency_contact_name'         => 'Michael Norris',
            'emergency_contact_relationship' => 'Boyfriend',
            'emergency_contact_number'       => '+44 (0) 7446 990 061',
            'team_listing_priority'          => '0',
            'profile_photo_url'              => 'http://api.randomuser.me/portraits/men/1.jpg',
            'job_title'                      => '3D Designer',
            'bio'                            => $faker->text(),
            'company_start_date'             => '2008-01-01',
            'created_at'                     => Carbon::now(),
            'updated_at'                     => Carbon::now()
        ]);

        $superU->profile()->save($superUProfile);

        // Administrator (User)
        $adminU = User::create([
            'name'       => 'Administrator',
            'email'      => 'admin@getwhiteboard.com',
            'password'   => bcrypt('password'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        $adminUProfile = Profile::create([
            'user_id'                        => $adminU->id,
            'salutation'                     => 'Miss',
            'first_name'                     => 'Holly',
            'middle_name'                    => 'Jane',
            'last_name'                      => 'McNicol',
            'nick_name'                      => 'Holly',
            'date_of_birth'                  => '1990-05-16',
            'address_line_1'                 => '78A Sackville Road',
            'address_line_2'                 => '',
            'address_line_3'                 => '',
            'address_line_4'                 => '',
            'address_city'                   => 'Hove',
            'address_county'                 => 'East Sussex',
            'address_postcode'               => 'BN3 3HB',
            'private_email_address'          => 'holly.mcnicol@live.co.uk',
            'telephone_number'               => '+44 (0) 1273 276 739',
            'mobile_number'                  => '+44 (0) 7950 994 570',
            'emergency_contact_name'         => 'Michael Norris',
            'emergency_contact_relationship' => 'Boyfriend',
            'emergency_contact_number'       => '+44 (0) 7446 990 061',
            'team_listing_priority'          => '0',
            'profile_photo_url'              => 'http://api.randomuser.me/portraits/men/2.jpg',
            'job_title'                      => '3D Designer',
            'bio'                            => $faker->text(),
            'company_start_date'             => '2008-01-01',
            'created_at'                     => Carbon::now(),
            'updated_at'                     => Carbon::now()
        ]);

        $adminU->profile()->save($adminUProfile);

        /*
         * Roles
         */

        // Super Administrator (Role)
        $superR = Role::create([
            'name'       => 'Super Administrator',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Administrator (Role)
        $adminR = Role::create([
            'name'       => 'Administrator'
            ,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);


        /*
         * Permissions
         */

        // Super Administrator (Permission)
        $superP = Permission::create([
            'name'       => 'Super Administrator',
            'level'      => '1000',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Administrator (Permission)
        $adminP = Permission::create([
            'name'       => 'Administrator',
            'level'      => '500',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Level 200 (Permission)
        $p200 = Permission::create([
            'name'       => 'Level 200',
            'level'      => '200',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Level 100 (Permission)
        $p100 = Permission::create([
            'name'       => 'Level 100',
            'level'      => '100',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Level 50 (Permission)
        Permission::create([
            'name'       => 'Level 50',
            'level'      => '50',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Level 20 (Permission)
        Permission::create([
            'name'       => 'Level 20',
            'level'      => '20',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Level 10 (Permission)
        Permission::create([
            'name'       => 'Level 10',
            'level'      => '10',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Level 5 (Permission)
        Permission::create([
            'name'       => 'Level 5',
            'level'      => '5',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Level 2 (Permission)
        Permission::create([
            'name'       => 'Level 2',
            'level'      => '2',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Level 1 (Permission)
        Permission::create([
            'name'       => 'Level 1',
            'level'      => '1',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Level 0 (Permission)
        Permission::create([
            'name'       => 'Level 0',
            'level'      => '0',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        /*
         * Detailed User Accounts with Roles and Permissions
         */

        $superU->roles()->attach($superR);

        $adminU->roles()->attach($adminR);

        $superR->permissions()->attach($superP);

        $adminR->permissions()->attach($adminP);

        $michael->roles()->attach($superR);


        /*
         * Clients
         */
        unset($clients);
        $clients = [];

        for ( $i=1; $i<=19; $i++ ) {
            $clients[] = [
                'client_id' => Hashids::connection('client_id')->encode($i),
                'client_name' => 'Internal Use',
                'client_address' => 'Internal Use',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ];
        }

        Client::insert($clients);


        JobCategory::create(['name' => 'Graphic Design']);
        JobCategory::create(['name' => 'Web Design']);
        JobCategory::create(['name' => 'Hosting']);
        JobCategory::create(['name' => 'Telephone Support']);
        JobCategory::create(['name' => 'Services']);

        /*
         * Jobs
         */
        unset($jobs);
        $jobs = [];

        $clientIds = Client::lists('id')->all();
        $jobCategoryIds = JobCategory::lists('id')->all();

        for ( $i=1; $i<=50; $i++) {
            $jobs[] = [
                'job_id' => Hashids::connection('job_id')->encode($i),
                'job_client_id' => $faker->randomElement($clientIds),
                'job_category_id' => $faker->randomElement($jobCategoryIds),
                'job_name' => $faker->word
            ];
        }

        Job::insert($jobs);




        /*
         * Invoices
         */
        unset($invoiceIds);
        $invoiceIds = [];

        for ( $i=1; $i<=50; $i++) {
            $invoiceIds[] = [
                'invoice_id' => Hashids::connection('invoice_id')->encode($i)
            ];
        }

        Invoice::insert($invoiceIds);







        // Hashids::connection('invoice_id')->encode($invoice->id);

        $client = Client::create([
            'client_name' => 'Hawksmoor',
            'client_address' => 'Colchester'
        ]);
        $client->client_id = Hashids::connection('client_id')->encode($client->id);
        $client->save();


    }
}
