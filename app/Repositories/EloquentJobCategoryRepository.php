<?php namespace Tvrtle\Repositories;

use Illuminate\Http\Request;
use Tvrtle\JobCategory;

class EloquentJobCategoryRepository implements JobCategoryRepository
{
    public function getAll()
    {
        return JobCategory::all();
    }

    public function show($id)
    {
        return JobCategory::find($id);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        //$data['name'] = auth()->user()->name;
        //$data['email'] = auth()->user()->email;

        JobCategory::create($data);

    }
}
