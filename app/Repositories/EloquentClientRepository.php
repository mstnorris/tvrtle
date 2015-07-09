<?php namespace Tvrtle\Repositories;

use Illuminate\Http\Request;
use Tvrtle\Client;

class EloquentClientRepository implements ClientRepository
{
    public function getAll()
    {
        return Client::all();
    }

    public function show($id)
    {
        return Client::find($id);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        //$data['name'] = auth()->user()->name;
        //$data['email'] = auth()->user()->email;

        Client::create($data);

    }
}
