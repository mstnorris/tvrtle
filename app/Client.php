<?php

namespace Tvrtle;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{

    protected $fillable = [
        'client_id',
        'client_name',
        'client_address'
    ];

    public $timestamps = true;



    // public function setClientIdAttribute()
    // {

    // }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }
}
