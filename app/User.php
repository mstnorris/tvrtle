<?php

namespace Tvrtle;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'email', 'password'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function roleNames()
    {
        return $this->roles()->lists('name');
    }

    public function assignRole($role)
    {
        return $this->roles->attach($role);
    }

    public function revokeRole($role)
    {
        return $this->roles()->detach($role);
    }

    public function isA($roleName)
    {
        foreach ($this->roles()->get() as $role) {
            if ($role->name == $roleName) {
                return true;
            }
        }

        return false;
    }

    public function accessLevel()
    {
        $accessLevel = 0;
        foreach ($this->roles()->get() as $role) {
            //var_dump($role->name);
            foreach ($role->permissions()->get() as $permission) {
                //var_dump($permission->level);
                ( $permission->level > $accessLevel) ? $accessLevel = $permission->level : null;
                //var_dump('current access level: ' . $accessLevel);
            }
        }
        return $accessLevel;
    }

    public function activity()
    {
        return $this->hasMany(Activity::class)->with(['user', 'subject'])->latest();
    }

    public function recordActivity($name, $related)
    {
        if (! method_exists($related, 'recordActivity')) {
            throw new \Exception('..');
        }
        return $related->recordActivity($name);
    }

    public function clients()
    {
        return $this->belongsToMany(Client::class);
    }
}
