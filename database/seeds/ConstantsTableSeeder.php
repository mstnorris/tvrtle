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

        $clientIds = Client::lists('client_id')->all();

        JobCategory::create(['name' => 'Graphic Design']);
        JobCategory::create(['name' => 'Web Design']);
        JobCategory::create(['name' => 'Hosting']);
        JobCategory::create(['name' => 'Telephone Support']);
        JobCategory::create(['name' => 'Services']);

        /*
         * Invoices
         */
        unset($invoiceIds);
        $invoiceIds = [];

        for ( $i=1; $i<=19; $i++) {
            $invoiceIds[] = [
                'invoice_id' => Hashids::connection('invoice_id')->encode($i),
                'client_id' => $faker->randomElement($clientIds),
            ];
        }

        Invoice::insert($invoiceIds);

        $invoiceIds = Invoice::lists('invoice_id')->all();

        /*
         * Jobs
         */
        unset($jobs);
        $jobs = [];


        $jobCategoryIds = JobCategory::lists('id')->all();

        for ( $i=1; $i<20; $i++) {
            $jobs[] = [
                'job_id' => Hashids::connection('job_id')->encode($i),
                'invoice_id' => $faker->randomElement($invoiceIds),
                'description' => $faker->sentence,
                'rate' => $faker->randomDigitNotNull,
                'quantity' => $faker->randomDigitNotNull
            ];
        }

        Job::insert($jobs);





        // Hashids::connection('invoice_id')->encode($invoice->id);

        $clientHawksmoor = Client::create([
            'client_id' => Hashids::connection('client_id')->encode(20),
            'client_name' => 'Hawksmoor',
            'client_address' => 'Colchester'
        ]);

        $clientSametErpik = Client::create([
            'client_id' => Hashids::connection('client_id')->encode(21),
            'client_name' => 'Samet Erpik',
            'client_address' => 'Hove'
        ]);

        $clientAdamPatel = Client::create([
            'client_id' => Hashids::connection('client_id')->encode(22),
            'client_name' => 'Adam Patel',
            'client_address' => 'Brighton'
        ]);

        $hcs1 = Invoice::create([
            'invoice_id' => Hashids::connection('invoice_id')->encode(20),
            'client_id' => $clientHawksmoor->client_id
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(20),
            'invoice_id' => $hcs1->invoice_id,
            'description' => 'Corporate rebranding',
            'rate' => 200000,
            'quantity' => 1
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(21),
            'invoice_id' => $hcs1->invoice_id,
            'description' => 'Website consultation and initial work',
            'rate' => 300000,
            'quantity' => 1
        ]);

        $sam1 = Invoice::create([
            'invoice_id' => Hashids::connection('invoice_id')->encode(21),
            'client_id' => $clientSametErpik->client_id
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(22),
            'invoice_id' => $sam1->invoice_id,
            'description' => 'Return flight to Amsterdam',
            'rate' => 7200,
            'quantity' => 1
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(23),
            'invoice_id' => $sam1->invoice_id,
            'description' => 'Apartment',
            'rate' => 9000,
            'quantity' => 1
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(24),
            'invoice_id' => $sam1->invoice_id,
            'description' => 'Parking',
            'rate' => 1300,
            'quantity' => 1
        ]);

        $hcs2 = Invoice::create([
            'invoice_id' => Hashids::connection('invoice_id')->encode(22),
            'client_id' => $clientHawksmoor->client_id
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(25),
            'invoice_id' => $hcs2->invoice_id,
            'description' => 'Vehicle signage design',
            'rate' => 250000,
            'quantity' => 1
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(26),
            'invoice_id' => $hcs2->invoice_id,
            'description' => 'Google apps',
            'rate' => 600,
            'quantity' => 40
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(27),
            'invoice_id' => $hcs2->invoice_id,
            'description' => 'Technical Support',
            'rate' => 2000,
            'quantity' => 75
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(28),
            'invoice_id' => $hcs2->invoice_id,
            'description' => 'Website development',
            'rate' => 2000,
            'quantity' => 20
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(29),
            'invoice_id' => $hcs2->invoice_id,
            'description' => 'Website domain and hosting',
            'rate' => 20000,
            'quantity' => 1
        ]);

        // Hawksmoor Invoice 7 Jan 2016

        $hcs3 = Invoice::create([
            'invoice_id' => Hashids::connection('invoice_id')->encode(23),
            'client_id' => $clientHawksmoor->client_id
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(30),
            'invoice_id' => $hcs3->invoice_id,
            'description' => 'Technical Support',
            'rate' => 2000,
            'quantity' => 5
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(31),
            'invoice_id' => $hcs3->invoice_id,
            'description' => 'Google apps',
            'rate' => 600,
            'quantity' => 90
        ]);

        // Hawksmoor Invoice 22 Jan 2016

        $hcs4 = Invoice::create([
            'invoice_id' => Hashids::connection('invoice_id')->encode(24),
            'client_id' => $clientHawksmoor->client_id
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(32),
            'invoice_id' => $hcs4->invoice_id,
            'description' => 'Stationery',
            'rate' => 3500,
            'quantity' => 4
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(33),
            'invoice_id' => $hcs4->invoice_id,
            'description' => 'Email Accounts',
            'rate' => 2500,
            'quantity' => 7
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(34),
            'invoice_id' => $hcs4->invoice_id,
            'description' => 'Tech Support',
            'rate' => 2500,
            'quantity' => 1
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(35),
            'invoice_id' => $hcs4->invoice_id,
            'description' => 'Business Cards',
            'rate' => 2500,
            'quantity' => 6
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(36),
            'invoice_id' => $hcs4->invoice_id,
            'description' => 'Vehicle Signage Design',
            'rate' => 3500,
            'quantity' => 3
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(37),
            'invoice_id' => $hcs4->invoice_id,
            'description' => 'Training',
            'rate' => 3500,
            'quantity' => 4
        ]);

        // Hawksmoor Invoice 12 Feb 2016
        $hcs5 = Invoice::create([
            'invoice_id' => Hashids::connection('invoice_id')->encode(25),
            'client_id' => $clientHawksmoor->client_id
        ]);

        //Google Apps 108
        //Trackers (friday) 9 x 25
        //Tech support (sat) 10 x 15
        //Tuesday (design) 6 x 25
        //Wednesday
        //
        //Friday and Saturday policies 9 x 25
        //Monday morning (today) trackers  signage 2 x 25
        //Wednesday 10th 6hrs 5 x 25
        //Thursday 11th 4hrs 3 x 25
        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(38),
            'invoice_id' => $hcs5->invoice_id,
            'description' => 'Google Apps',
            'rate' => 600,
            'quantity' => 18
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(39),
            'invoice_id' => $hcs5->invoice_id,
            'description' => 'Website Design & Development',
            'rate' => 2500,
            'quantity' => 34
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(40),
            'invoice_id' => $hcs5->invoice_id,
            'description' => 'Admin & Tech Support',
            'rate' => 1500,
            'quantity' => 10
        ]);

        // Hawksmoor Invoice 25 Feb 2016
        $hcs6 = Invoice::create([
            'invoice_id' => Hashids::connection('invoice_id')->encode(26),
            'client_id' => $clientHawksmoor->client_id
        ]);

        //Previous 2 x £25 added to Wednesday and Thursday
        //Tuesday (back from Yorkshire) 7 x £15
        //Wednesday (all day) 13 x £25
        //Thursday (all day) 13 x £25
        //Friday (morning) 4 x £15
        //Sunday 21st 11:00-22:00 11 x £25
        //Wed 24th 09:00-13:00 4 x £15
        //Wed 24th 13:00-23:00 8 x £25
        //Thu 25 09:00-18:00 9 x £25
        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(41),
            'invoice_id' => $hcs6->invoice_id,
            'description' => 'Admin & Tech Support',
            'rate' => 1500,
            'quantity' => 15
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(42),
            'invoice_id' => $hcs6->invoice_id,
            'description' => 'Website Design & Development',
            'rate' => 2500,
            'quantity' => 54
        ]);

        // Hawksmoor Invoice 2 Mar 2016
        $hcs7 = Invoice::create([
            'invoice_id' => Hashids::connection('invoice_id')->encode(27),
            'client_id' => $clientHawksmoor->client_id
        ]);

        //// Fri 26th 08:30-00:00
        //15.5 x £25
        //
        //// Saturday 27th 07:30 - 10:00
        //3 x £15
        //
        //// Sunday
        //7 x £25
        //
        //// Monday 29th Feb
        //0
        //
        //// Tuesday 1st Mar
        //1 x £15
        //
        //// Phone calls
        //£50
        //
        //// Google Apps
        //£108
        //
        //// Wednesday 2nd Mar
        //11 x £25
        //
        //// Thursday 3rd Mar
        //0
        //
        //// Fri 4th Mar
        //0
        //
        //// Saturday 5th Mar
        //0
        //
        //// Sunday 6th Mar
        //3 x £25

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(43),
            'invoice_id' => $hcs7->invoice_id,
            'description' => 'Google Apps',
            'rate' => 600,
            'quantity' => 18
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(44),
            'invoice_id' => $hcs7->invoice_id,
            'description' => 'Website Design & Development',
            'rate' => 2500,
            'quantity' => 39.5
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(45),
            'invoice_id' => $hcs7->invoice_id,
            'description' => 'Admin & Tech Support',
            'rate' => 1500,
            'quantity' => 11
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(46),
            'invoice_id' => $hcs7->invoice_id,
            'description' => 'Phone Calls',
            'rate' => 4995,
            'quantity' => 1
        ]);


        // Hawksmoor Invoice 1 Apr 2016
        $hcs8 = Invoice::create([
            'invoice_id' => Hashids::connection('invoice_id')->encode(28),
            'client_id' => $clientHawksmoor->client_id
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(47),
            'invoice_id' => $hcs8->invoice_id,
            'description' => 'Website Design & Development',
            'rate' => 2500,
            'quantity' => 22
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(48),
            'invoice_id' => $hcs8->invoice_id,
            'description' => 'Admin & Tech Support',
            'rate' => 1500,
            'quantity' => 1
        ]);

        // Hawksmoor Invoice Thu 7 Apr iPhone 5s
        $hcs9 = Invoice::create([
            'invoice_id' => Hashids::connection('invoice_id')->encode(29),
            'client_id' => $clientHawksmoor->client_id
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(49),
            'invoice_id' => $hcs9->invoice_id,
            'description' => 'iPhone 5s Out of Warranty Screen Replacement',
            'rate' => 9900,
            'quantity' => 1
        ]);

        // Hawksmoor Invoice NW93XN93 15 Apr 2016 (hcs_timesheet_5.soulver)
        $hcs10 = Invoice::create([
            'invoice_id' => Hashids::connection('invoice_id')->encode(30),
            'client_id' => $clientHawksmoor->client_id
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(50),
            'invoice_id' => $hcs10->invoice_id,
            'description' => 'Website Design & Development',
            'rate' => 2500,
            'quantity' => 100
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(51),
            'invoice_id' => $hcs10->invoice_id,
            'description' => 'Google Apps',
            'rate' => 600,
            'quantity' => 18
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(52),
            'invoice_id' => $hcs10->invoice_id,
            'description' => 'Admin & Tech Support',
            'rate' => 1500,
            'quantity' => 2
        ]);

        // Hawksmoor Invoice NW93XN93 TBC (hcs_timesheet_6.soulver)
        $hcs11 = Invoice::create([
            'invoice_id' => Hashids::connection('invoice_id')->encode(31),
            'client_id' => $clientHawksmoor->client_id
        ]);

        Job::create([
            'job_id' => Hashids::connection('job_id')->encode(53),
            'invoice_id' => $hcs11->invoice_id,
            'description' => 'Website Design & Development',
            'rate' => 2500,
            'quantity' => 107
        ]);

//        Job::create([
//            'job_id' => Hashids::connection('job_id')->encode(54),
//            'invoice_id' => $hcs11->invoice_id,
//            'description' => 'Admin & Tech Support',
//            'rate' => 1500,
//            'quantity' => 2
//        ]);

//        Job::create([
//            'job_id' => Hashids::connection('job_id')->encode(55),
//            'invoice_id' => $hcs11->invoice_id,
//            'description' => 'Google Apps',
//            'rate' => 600,
//            'quantity' => 18
//        ]);

    }
}
