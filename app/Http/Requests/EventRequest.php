<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
            'title' => 'required|max:255',
            'address' => 'required',
            'starts_at'=>'required|date',
            'ends_at'=>'required|date|after:starts_at',
            'description'=>'nullable|max:500',
            'type_id' => 'required'
        ];
    }

    /**
    * Get the error messages for the defined validation rules.
    *
    * @return array
    */
    public function messages()
    {
        return [
            'title.required' => 'Name field is required',
            'address.required'  => 'Address field is required',
            'address.unique' => 'Address needs to be unique. Event already exists',
            'starts_at.required' => 'Start date is required',
            'ends_at.required' => 'End date is required',
            'description.max' => 'Too many characters, 500 max',
            'type_id.required' => 'Chose category for this event'
        ];
    }
}
