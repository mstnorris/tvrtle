<?php namespace Tvrtle\Http\Controllers;

use Tvrtle\Http\Requests\Request;
use Tvrtle\Job;
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
        $Jobs = $this->repository->getAll();

        return view('Jobs.index', compact('Jobs'));
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

        Job::create($data);
    }
}
