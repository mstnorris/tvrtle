<?php namespace Tvrtle;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{

    protected $fillable = [
        'salutation',
        'first_name',
        'middle_name',
        'last_name',
        'nick_name',
        'date_of_birth',
        'address_line_1',
        'address_line_2',
        'address_line_3',
        'address_line_4',
        'address_city',
        'address_county',
        'address_postcode',
        'private_email_address',
        'telephone_number',
        'mobile_number',
        'emergency_contact_name',
        'emergency_contact_relationship',
        'emergency_contact_number',
        'team_listing_priority',
        'profile_photo_url',
        'job_title',
        'bio',
        'company_start_date'
    ];

    protected $dates = [
        'date_of_birth',
        'company_start_date'
    ];

    protected $address = '';

    public function user()
    {
        return $this->belongsTo('Whiteboard\User');
    }

    public function age()
    {
        return $this->user->profile->date_of_birth->age;
    }

    public function dateOfBirth()
    {
        return $this->user->profile->date_of_birth->format('j F Y');
    }

    public function address()
    {
        if ($this->user->profile->address_line_1) {
            $this->address = $this->user->profile->address_line_1;
        }
        if ($this->user->profile->address_line_2) {
            $this->address = $this->address . "<br />" . $this->user->profile->address_line_2;
        }
        if ($this->user->profile->address_line_3) {
            $this->address = $this->address . "<br />" . $this->user->profile->address_line_3;
        }
        if ($this->user->profile->address_line_4) {
            $this->address = $this->address . "<br />" . $this->user->profile->address_line_4;
        }
        if ($this->user->profile->address_city) {
            $this->address = $this->address . "<br />" . $this->user->profile->address_city;
        }
        if ($this->user->profile->address_county) {
            $this->address = $this->address . "<br />" . $this->user->profile->address_county;
        }
        if ($this->user->profile->address_postcode) {
            $this->address = $this->address . "<br />" . $this->user->profile->address_postcode;
        }
        return $this->address;
    }
}
