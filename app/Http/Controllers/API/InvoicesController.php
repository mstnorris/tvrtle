<?php

namespace Tvrtle\Http\Controllers\API;

use Illuminate\Http\Request;

use Tvrtle\Http\Requests;
use Tvrtle\Http\Controllers\Controller;
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
        return $this->repository->getAll();
    }

    public function show($id)
    {
        return $this->repository->show($id);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        Invoice::create($data);
    }
}
