<?php namespace Tvrtle\Repositories;

use Illuminate\Http\Request;
use Tvrtle\Invoice;

class EloquentInvoiceRepository implements InvoiceRepository
{
    public function getAll()
    {
        return Invoice::all();
    }

    public function show($id)
    {
        return Invoice::find($id);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        //$data['name'] = auth()->user()->name;
        //$data['email'] = auth()->user()->email;

        Invoice::create($data);

    }
}
