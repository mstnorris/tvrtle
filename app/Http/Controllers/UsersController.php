<?php namespace Tvrtle\Http\Controllers;

use Carbon\Carbon;
use Session;
use Tvrtle\Mailers\EmailVerificationAppMailer;
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

    public function verify($verify_token)
    {
        if ( ! User::where('verify_token', $verify_token)->count() ) {
            dd('not exist');
        } else {
            $user = User::where('verify_token', $verify_token)->whereVerifiedOn(null)->first();
            $user->verified_on = Carbon::now();
            $user->verify_token = NULL;
            $user->save();
            return view('emails.verified_email');
        }
        return true;
    }

    public function sendVerificationEmail(EmailVerificationAppMailer $mailer)
    {
        $user = auth()->user();
        $user->verify_token = str_random(16);
        $user->save();

        $mailer->sendMessage();

        Session::flash('notification', ['title' => 'Message sent!', 'message' => 'Please check your emails and verify your account.', 'type' => 'success', 'icon' => 'fa fa-paper-plane-o']);

        return redirect()->to('/');
    }
}
