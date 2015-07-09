<?php namespace Tvrtle\Http\Controllers;

use Illuminate\Http\Request;
use Tvrtle\Http\Requests;
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
        $JobCategories = $this->repository->getAll();

        return view('job_categories.index', compact('JobCategories'));
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

        JobCategory::create($data);
    }
}
