<?php

namespace Tvrtle;

//use Vinkla\Hashids\Facades\Hashids;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{

    protected $fillable = [
        'client_id',
        'client_name',
        'client_address'
    ];

    public $timestamps = true;

    //public function setClientIdAttribute()
    //{
    //    $this->client_id = Hashids::connection('client_id')->encode($this->id);
    //}

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
