<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    public function run()
    {
        Task::factory()->create([
            'title' => 'Learn Laravel'
        ]);

        Task::factory()->create([
            'title' => 'Create Backend API'
        ]);
    }
}