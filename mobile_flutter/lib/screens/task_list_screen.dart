import 'package:flutter/material.dart';
import '../models/task.dart';
import '../services/api_service.dart';
import '../widgets/task_item.dart';
import '../widgets/add_task_dialog.dart';

class TaskListScreen extends StatefulWidget {
  const TaskListScreen({super.key});

  @override
  State<TaskListScreen> createState() => _TaskListScreenState();
}

class _TaskListScreenState extends State<TaskListScreen> {
  final ApiService _apiService = ApiService();
  List<Task> _tasks = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadTasks();
  }

  Future<void> _loadTasks() async {
    setState(() => _isLoading = true);
    try {
      final tasks = await _apiService.getTasks();
      setState(() => _tasks = tasks);
    } catch (e) {
      debugPrint('Error loading tasks: $e');
      _showError('Failed to load tasks');
    }
    setState(() => _isLoading = false);
  }

  Future<void> _addTask(String title) async {
    try {
      await _apiService.createTask(title);
      _loadTasks();
    } catch (e) {
      _showError('Failed to add task');
    }
  }

  Future<void> _editTask(Task task) async {
    TextEditingController controller = TextEditingController(text: task.title);

    await showDialog(
      context: context,
      builder:
          (_) => AlertDialog(
            title: const Text('Edit Task'),
            content: TextField(
              controller: controller,
              decoration: const InputDecoration(hintText: 'Enter task title'),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('Cancel'),
              ),
              ElevatedButton(
                onPressed: () async {
                  try {
                    await _apiService.updateTask(
                      task.id,
                      controller.text.trim(),
                      task.status,
                    );
                    Navigator.pop(context);
                    _loadTasks();
                  } catch (e) {
                    _showError('Failed to update task');
                  }
                },
                child: const Text('Save'),
              ),
            ],
          ),
    );
  }

  Future<void> _toggleTaskStatus(Task task, bool? value) async {
    String newStatus = value == true ? 'done' : 'pending';
    try {
      await _apiService.updateTaskStatus(task.id, newStatus);
      _loadTasks();
    } catch (e) {
      _showError('Failed to update task status');
    }
  }

  Future<void> _deleteTask(Task task) async {
    try {
      await _apiService.deleteTask(task.id);
      _loadTasks();
    } catch (e) {
      _showError('Failed to delete task');
    }
  }

  void _showError(String message) {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(SnackBar(content: Text(message)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'My Tasks',
          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
        ),
        centerTitle: true,
        backgroundColor: Colors.deepPurple,
      ),
      body:
          _isLoading
              ? const Center(child: CircularProgressIndicator())
              : _tasks.isEmpty
              ? const Center(
                child: Text(
                  'No tasks yet.\nTap + to add one!',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
              )
              : RefreshIndicator(
                onRefresh: _loadTasks,
                child: ListView.separated(
                  padding: const EdgeInsets.all(8),
                  itemCount: _tasks.length,
                  itemBuilder: (context, index) {
                    final task = _tasks[index];
                    return TaskItem(
                      task: task,
                      onToggle: (value) => _toggleTaskStatus(task, value),
                      onEdit: () => _editTask(task),
                      onDelete: () => _deleteTask(task),
                    );
                  },
                  separatorBuilder: (_, __) => const SizedBox(height: 10),
                ),
              ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
        onPressed:
            () => showDialog(
              context: context,
              builder: (_) => AddTaskDialog(onSubmit: _addTask),
            ),
        child: const Icon(Icons.add),
      ),
    );
  }
}
