<?php namespace Tvrtle\Http\Controllers;


use Tvrtle\Repositories\ClientRepository;

class ClientsController extends Controller
{
    /**
     * @var ClientRepository
     */
    private $repository;

    public function __construct(ClientRepository $repository)
    {
        $this->repository = $repository;

    }

    public function index()
    {
        return view('clients.index');
    }
}
