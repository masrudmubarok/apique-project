<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

// Get All Tasks
Route::get('/tasks', [TaskController::class, 'getAllTasks'])->name('tasks.getAllTasks');

// Get Task By ID
Route::get('/tasks/{task}', [TaskController::class, 'getTask'])->name('tasks.getTask');

// Create New Task
Route::post('/tasks', [TaskController::class, 'createTask'])->name('tasks.createTask');

// Update task
Route::put('/tasks/{task}', [TaskController::class, 'updateTask'])->name('tasks.updateTask');
Route::patch('/tasks/{task}', [TaskController::class, 'updateTask'])->name('tasks.updateTask');

// Delete task
Route::delete('/tasks/{task}', [TaskController::class, 'deleteTask'])->name('tasks.deleteTask');