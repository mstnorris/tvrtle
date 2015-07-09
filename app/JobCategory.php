<?php

namespace Tvrtle;

use Illuminate\Database\Eloquent\Model;

class JobCategory extends Model
{
    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}
