<?php namespace Hawksmoor\Mailers;

use Hawksmoor\Message;
use Illuminate\Mail\Mailer;
use Vinkla\Hashids\Facades\Hashids;

class AppMailer
{

    protected $mailer;

    protected $from = 'info@hawksmoorcs.co.uk';

    protected $toEmail;

    protected $toName;

    protected $subject;

    protected $content;

    protected $messageId;

    protected $view;

    protected $data = [];

    /**
     * @param Mailer $mailer
     */
    public function __construct(Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendMessage($request)
    {
        $this->toEmail = $request->email;
        $this->toName  = $request->name;
        $this->subject = $request->subject;
        $this->content = nl2br($request->message);
        $this->view    = 'emails.contact_us';
        $this->data    = compact('request');

        $message = Message::create([
            'name' => $this->toName,
            'email' => $this->toEmail,
            'subject' => $this->subject,
            'message' => $this->content
        ]);
        $message->msg_id = Hashids::connection('msg_id')->encode($message->id);
        $message->save();

        $this->messageId = $message->msg_id;
        $this->data['messageId'] = $this->messageId;

        $this->deliver();
    }

    public function deliver()
    {
        $toEmail = $this->toEmail;
        $toName = $this->toName;
        $subject = $this->subject;

        $messageId = $this->messageId;

        // message to the customer
        $this->mailer->send($this->view, $this->data, function ($message) use ($toEmail, $toName, $subject, $messageId) {
            $message->from('noreply@hawksmoorcs.co.uk', 'Hawksmoor')
                ->sender('noreply@hawksmoorcs.co.uk', 'Hawksmoor')
                ->to($toEmail, $toName)
                ->replyTo('office@hawksmoorcs.co.uk', 'Hawksmoor')
                ->subject($messageId . ": " . $subject);
        });

        // message to the team
        $this->mailer->send('emails.web_form_for_hcs_team', $this->data, function ($message) use ($toEmail, $subject, $messageId) {
            $message->from('noreply@hawksmoorcs.co.uk', 'Hawksmoor Web Form')
                ->sender('noreply@hawksmoorcs.co.uk', 'Hawksmoor Web Form')
                ->to('office@hawksmoorcs.co.uk', 'Hawksmoor')
                ->replyTo($toEmail)
                ->subject($messageId . ": " . $subject);
        });


    }
}