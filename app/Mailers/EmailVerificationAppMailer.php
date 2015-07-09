<?php namespace Hawksmoor\Mailers;

use Illuminate\Mail\Mailer;

class EmailVerificationAppMailer
{

    protected $mailer;

    /**
     * @param Mailer $mailer
     */
    public function __construct(Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendMessage()
    {
        $toEmail = auth()->user()->email;
        $toName  = auth()->user()->name;
        $subject = 'Please verify your email address';
        $view    = 'emails.verify_email';

        $data = [];
        $data['user'] = auth()->user()->toArray();
        //dd($data['user'] = auth()->user()->toArray());

        $this->mailer->send($view, $data, function ($message) use ($toEmail, $toName, $subject) {
            $message->from('office@hawksmoorcs.co.uk', 'Hawksmoor')
                ->sender('office@hawksmoorcs.co.uk', 'Hawksmoor')
                ->to($toEmail, $toName)
                ->replyTo('office@hawksmoorcs.co.uk', 'Hawksmoor')
                ->subject($subject);
        });
    }
}