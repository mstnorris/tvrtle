<?php namespace Tvrtle\Http\Controllers;

use Illuminate\Http\Request;
use Tvrtle\Client;
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
        //$Clients = $this->repository->getAll();

        return view('clients.index');
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

        Client::create($data);
    }
}
