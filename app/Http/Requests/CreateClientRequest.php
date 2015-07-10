<?php

namespace Tvrtle\Http\Requests;

use Tvrtle\Http\Requests\Request;

class CreateClientRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'client_name' => 'required|min:3',
            'client_address' => 'required|min:3'
        ];
    }
}
