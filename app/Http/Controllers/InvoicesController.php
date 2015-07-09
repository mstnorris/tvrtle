<?php

namespace Tvrtle\Http\Controllers;

use Tvrtle\Http\Requests\Request;
use Tvrtle\Invoice;
use Tvrtle\Repositories\InvoiceRepository;

class InvoicesController extends Controller
{

    /**
     * @var InvoiceRepository
     */
    private $repository;

    public function __construct(InvoiceRepository $repository)
    {
        $this->repository = $repository;

    }

    public function index()
    {
        $invoices = $this->repository->getAll();

        return view('invoices.index', compact('invoices'));
    }

    public function show($id)
    {
        return $this->repository->show($id);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $data['name'] = auth()->user()->name;
        $data['email'] = auth()->user()->email;

        Invoice::create($data);
    }
}
