<?php

namespace Tvrtle\Http\Controllers\API;

use Tvrtle\Client;
use Tvrtle\Http\Controllers\Controller;
use Tvrtle\Http\Requests\CreateClientRequest;
use Tvrtle\Repositories\ClientRepository;
use Vinkla\Hashids\Facades\Hashids;

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
        return $this->repository->getAll();
    }

    public function show($id)
    {
        return $this->repository->show($id);
    }

    public function store(CreateClientRequest $request)
    {
        return $this->createClient($request);
    }

    private function createClient(CreateClientRequest $request)
    {
        $data              = $request->all();
        $client            = Client::create($data);
        $client->client_id = Hashids::connection('client_id')->encode($client->id);
        $client->save();

        return $client;
    }
}
