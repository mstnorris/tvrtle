<?php namespace Tvrtle\Repositories;

use Illuminate\Http\Request;
use Tvrtle\Client;

class EloquentClientRepository implements ClientRepository
{
    public function getAll()
    {
        return Client::with('users')->get();
    }

    public function show($id)
    {
        return Client::find($id);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        Client::create($data);

    }
}
