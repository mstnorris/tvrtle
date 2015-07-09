<?php

namespace Tvrtle\Http\Controllers\API;

use Tvrtle\Job;
use Illuminate\Http\Request;
use Tvrtle\Http\Controllers\Controller;
use Tvrtle\Repositories\JobRepository;

class JobsController extends Controller
{

    /**
     * @var JobRepository
     */
    private $repository;

    public function __construct(JobRepository $repository)
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

        Job::create($data);
    }
}
