import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
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
  List<Task> _filteredTasks = [];
  bool _isLoading = true;

  // filters
  String _statusFilter = 'All';
  DateTime _dateFilter = DateTime.now();

  @override
  void initState() {
    super.initState();
    _loadTasks();
  }

  Future<void> _loadTasks() async {
    setState(() => _isLoading = true);
    try {
      final tasks = await _apiService.getTasks();
      setState(() {
        _tasks = tasks;
        _applyFilters();
      });
    } catch (e) {
      debugPrint('Error loading tasks: \$e');
      _showError('Failed to load tasks');
    }
    setState(() => _isLoading = false);
  }

  void _applyFilters() {
    setState(() {
      _filteredTasks =
          _tasks.where((task) {
              final created = task.createdAt;
              final sameDay =
                  created.year == _dateFilter.year &&
                  created.month == _dateFilter.month &&
                  created.day == _dateFilter.day;
              final statusMatch =
                  _statusFilter == 'All' ||
                  task.status == _statusFilter.toLowerCase();
              return sameDay && statusMatch;
            }).toList()
            ..sort((a, b) => a.id.compareTo(b.id));
    });
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _dateFilter,
      firstDate: DateTime(2000),
      lastDate: DateTime.now(),
    );
    if (picked != null) {
      setState(() => _dateFilter = picked);
      _applyFilters();
    }
  }

  Future<void> _addTask(String title) async {
    try {
      final added = await _apiService.createTask(title);
      _tasks.add(added);
      _applyFilters();
    } catch (e) {
      _showError('Failed to add task');
    }
  }

  Future<void> _editTask(Task task) async {
    final ctl = TextEditingController(text: task.title);
    await showDialog(
      context: context,
      builder:
          (_) => AlertDialog(
            title: const Text('Edit Task'),
            content: TextField(controller: ctl),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('Cancel'),
              ),
              ElevatedButton(
                onPressed: () async {
                  try {
                    final updated = await _apiService.updateTask(
                      task.id,
                      ctl.text.trim(),
                      task.status,
                    );
                    final idx = _tasks.indexWhere((t) => t.id == task.id);
                    _tasks[idx] = updated;
                    _applyFilters();
                    Navigator.pop(context);
                  } catch (_) {
                    _showError('Failed to update task');
                  }
                },
                child: const Text('Save'),
              ),
            ],
          ),
    );
  }

  Future<void> _toggleTaskStatus(Task task, bool? checked) async {
    final newStatus = checked == true ? 'done' : 'pending';
    try {
      final updated = await _apiService.updateTaskStatus(task.id, newStatus);
      final idx = _tasks.indexWhere((t) => t.id == task.id);
      _tasks[idx] = updated;
      _applyFilters();
    } catch (_) {
      _showError('Failed to update status');
    }
  }

  Future<void> _deleteTask(Task task) async {
    try {
      await _apiService.deleteTask(task.id);
      _tasks.removeWhere((t) => t.id == task.id);
      _applyFilters();
    } catch (_) {
      _showError('Failed to delete task');
    }
  }

  void _showError(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  @override
  Widget build(BuildContext context) {
    final dateLabel = DateFormat.yMMMd().format(_dateFilter);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Task Management'),
        centerTitle: true,
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
            child: Row(
              children: [
                Expanded(
                  child: InputDecorator(
                    decoration: InputDecoration(
                      labelText: 'Status',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      contentPadding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 4,
                      ),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: _statusFilter,
                        isDense: true,
                        onChanged: (v) {
                          setState(() => _statusFilter = v!);
                          _applyFilters();
                        },
                        items: const [
                          DropdownMenuItem(value: 'All', child: Text('All')),
                          DropdownMenuItem(value: 'done', child: Text('Done')),
                          DropdownMenuItem(
                            value: 'pending',
                            child: Text('Pending'),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: _pickDate,
                    icon: const Icon(Icons.calendar_today),
                    label: Text(dateLabel),
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          // Task list
          Expanded(
            child:
                _isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : _filteredTasks.isEmpty
                    ? const Center(
                      child: Text(
                        'No tasks for this date/status.',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.grey),
                      ),
                    )
                    : RefreshIndicator(
                      onRefresh: _loadTasks,
                      child: ListView.separated(
                        padding: const EdgeInsets.all(8),
                        itemCount: _filteredTasks.length,
                        separatorBuilder: (_, __) => const SizedBox(height: 6),
                        itemBuilder: (ctx, i) {
                          final t = _filteredTasks[i];
                          return TaskItem(
                            task: t,
                            onToggle: (v) => _toggleTaskStatus(t, v),
                            onEdit: () => _editTask(t),
                            onDelete: () => _deleteTask(t),
                          );
                        },
                      ),
                    ),
          ),
        ],
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
