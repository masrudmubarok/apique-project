import 'package:flutter/material.dart';

class AddTaskDialog extends StatefulWidget {
  final Function(String) onSubmit;

  const AddTaskDialog({super.key, required this.onSubmit});

  @override
  State<AddTaskDialog> createState() => _AddTaskDialogState();
}

class _AddTaskDialogState extends State<AddTaskDialog> {
  final TextEditingController _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Add Task'),
      content: TextField(
        controller: _controller,
        decoration: const InputDecoration(hintText: 'Enter task title'),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: () {
            widget.onSubmit(_controller.text.trim());
            Navigator.pop(context);
          },
          child: const Text('Add'),
        ),
      ],
    );
  }
}
