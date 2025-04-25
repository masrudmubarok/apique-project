<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Enums\TaskStatus;
use Exception;

class TaskController extends Controller
{
    
    public function getAllTasks(Request $request): JsonResponse
    {
        try {
            $filters = $request->query('filters', []);
            $tasks = Task::when(!empty($filters), fn($q) => $q->filter($filters), fn($q) => $q)->get();

            if ($tasks->isEmpty()) {
                return response()->json(['success' => false, 'message' => 'Data not found', 'data' => []], 404);
            }

            return response()->json(['success' => true, 'message' => 'Tasks retrieved successfully', 'data' => TaskResource::collection($tasks)], 200);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to retrieve tasks: ' . $e->getMessage(), 'data' => []], 500);
        }
    }

    public function getTask($id): JsonResponse
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return response()->json(['success' => false, 'message' => 'Data not found', 'data' => null], 404);
            }

            return response()->json(['success' => true, 'message' => 'Task retrieved successfully', 'data' => new TaskResource($task)], 200);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to retrieve task: ' . $e->getMessage(), 'data' => null], 500);
        }
    }

    public function createTask(TaskRequest $request): JsonResponse
    {
        try {
            $task = Task::create([
                'title' => $request->input('title'),
                'status' => $request->input('status', TaskStatus::PENDING)->value,
            ]);

            return response()->json(['success' => true, 'message' => 'Task created successfully', 'data' => new TaskResource($task)], 201);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to create task: ' . $e->getMessage(), 'data' => null], 500);
        }
    }

    public function updateTask(TaskRequest $request, $id): JsonResponse
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return response()->json(['success' => false, 'message' => 'Data not found', 'data' => null], 404);
            }

            $task->update(['title' => $request->input('title'), 'status' => $request->input('status')->value]);

            return response()->json(['success' => true,'message' => 'Task updated successfully','data' => new TaskResource($task)], 200);
        } catch (Exception $e) {
            return response()->json(['success' => false,'message' => 'Failed to update task: ' . $e->getMessage(),'data' => null], 500);
        }
    }

    public function deleteTask($id): JsonResponse
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return response()->json(['success' => false, 'message' => 'Data not found', 'data' => null], 404);
            }

            $task->delete();

            return response()->json(['success' => true,'message' => 'Task deleted successfully', 'data' => null], 200);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to delete task: ' . $e->getMessage(), 'data' => null], 500);
        }
    }
}