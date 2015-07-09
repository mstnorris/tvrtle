<?php namespace Hawksmoor\Http\Middleware;

use Closure;
use Auth;

class OfficeBased {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
        if ( Auth::check() && Auth::user()->isOfficeBased())
        {
            return $next($request);
        }

        $statusStyle = "";
        $statusHeading = "Permission Denied";
        $statusIcon = "lock";
        $statusMessage = 'You do not have access to this resource.';
        return view('users.account_status', compact('statusHeading', 'statusIcon', 'statusMessage'));
	}

}
