import 'package:flutter/material.dart';
import 'screens/task_list_screen.dart';

void main() {
  runApp(const TaskManagementApp());
}

class TaskManagementApp extends StatelessWidget {
  const TaskManagementApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Task Management App',
      theme: ThemeData(primarySwatch: Colors.deepPurple),
      home: const TaskListScreen(),
    );
  }
}
