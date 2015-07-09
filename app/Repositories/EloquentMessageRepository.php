<?php namespace Tvrtle\Repositories;

use Illuminate\Http\Request;
use Tvrtle\Message;

class EloquentMessageRepository implements MessageRepository
{
    public function getAll()
    {
        return Message::all();
    }

    public function show($id)
    {
        return Message::find($id);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $data['name'] = auth()->user()->name;
        $data['email'] = auth()->user()->email;

        Message::create($data);

    }
}