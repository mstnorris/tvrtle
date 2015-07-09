<?php

namespace Tvrtle;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{

    protected $fillable = [
        'job_id',
        'job_number',
        'name',
        'job_category_id'
    ];

    public function category()
    {
        return $this->belongsTo(JobCategory::class);
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
