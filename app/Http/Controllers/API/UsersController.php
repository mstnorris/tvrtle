<?php

namespace Tvrtle\Http\Controllers\API;

use Illuminate\Http\Request;

use Tvrtle\Http\Requests;
use Tvrtle\Http\Controllers\Controller;
use Tvrtle\Repositories\UserRepository;
use Tvrtle\User;

class UsersController extends Controller
{
    /**
     * @var UserRepository
     */
    private $repository;

    public function __construct(UserRepository $repository)
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

        User::create($data);
    }
}
