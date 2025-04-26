import 'package:dio/dio.dart';
import '../models/task.dart';
import '../utils/constants.dart';

class ApiService {
  final Dio _dio = Dio(BaseOptions(baseUrl: baseUrl));

  Future<List<Task>> getTasks() async {
    final response = await _dio.get('/tasks');
    List data = response.data['data'];
    return data.map((task) => Task.fromJson(task)).toList();
  }

  Future<Task> createTask(String title) async {
    final response = await _dio.post(
      '/tasks',
      data: {'title': title, 'status': 'pending'},
    );
    return Task.fromJson(response.data['data']);
  }

  Future<Task> updateTask(int id, String title, String status) async {
    final response = await _dio.put(
      '/tasks/$id',
      data: {'title': title, 'status': status},
    );
    return Task.fromJson(response.data['data']);
  }

  Future<Task> updateTaskStatus(int id, String status) async {
    final response = await _dio.patch(
      '/tasks/$id/status',
      data: {'status': status},
    );
    return Task.fromJson(response.data['data']);
  }

  Future<void> deleteTask(int id) async {
    await _dio.delete('/tasks/$id');
  }
}
