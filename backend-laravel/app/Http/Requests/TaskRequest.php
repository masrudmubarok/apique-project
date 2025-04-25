<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\TaskStatus;

class TaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'status' => ['nullable', Rule::enum(TaskStatus::class)],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The task title is required.',
            'title.max' => 'The task title must not exceed 255 characters.',
            'status.enum' => 'The task status is invalid.',
        ];        
    }

    protected function prepareForValidation(): void
    {
        if ($this->isMethod('post') && !$this->has('status')) {
            $this->merge([
                'status' => TaskStatus::PENDING->value,
            ]);
        }

        if ($this->has('status') && is_string($this->status)) {
            try {
                $statusEnum = TaskStatus::fromString($this->status);
                $this->merge(['status' => $statusEnum->value]);
            } catch (\InvalidArgumentException $e) {
            }
        }
    }
}