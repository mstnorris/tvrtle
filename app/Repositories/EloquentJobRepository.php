<?php namespace Tvrtle\Repositories;

use Illuminate\Http\Request;
use Tvrtle\Job;

class EloquentJobRepository implements JobRepository
{

    public function getAll()
    {
        return Job::all();
    }

    public function show($id)
    {
        return Job::find($id);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        //$data['name'] = auth()->user()->name;
        //$data['email'] = auth()->user()->email;

        Job::create($data);

    }


}
