<?php

namespace Tvrtle\Http\Controllers\API;

use Illuminate\Http\Request;

use Tvrtle\Http\Requests;
use Tvrtle\Http\Controllers\Controller;
use Tvrtle\JobCategory;
use Tvrtle\Repositories\JobCategoryRepository;

class JobCategoriesController extends Controller
{
    /**
     * @var JobCategoryRepository
     */
    private $repository;

    public function __construct(JobCategoryRepository $repository)
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

        JobCategory::create($data);
    }
}
