<?php

namespace Tvrtle;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}
