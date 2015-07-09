<?php namespace Tvrtle\Repositories;

use Illuminate\Http\Request;

interface JobCategoryRepository
{
    public function getAll();

    public function show($id);

    public function store(Request $request);
}