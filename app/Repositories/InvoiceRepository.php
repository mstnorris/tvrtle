<?php namespace Tvrtle\Repositories;

use Illuminate\Http\Request;

interface InvoiceRepository
{
    public function getAll();

    public function show($id);

    public function store(Request $request);
}