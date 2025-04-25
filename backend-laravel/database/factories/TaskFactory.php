<?php

namespace Database\Factories;

use App\Constants\TaskConstants;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{

    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'status' => TaskConstants::STATUS_PENDING,
        ];
    }
}
