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

  Future<void> createTask(String title) async {
    await _dio.post('/tasks', data: {'title': title, 'status': 'pending'});
  }

  Future<void> updateTask(int id, String title) async {
    await _dio.put('/tasks/$id', data: {'title': title});
  }

  Future<void> updateTaskStatus(int id, String status) async {
    await _dio.patch('/tasks/$id', data: {'status': status});
  }

  Future<void> deleteTask(int id) async {
    await _dio.delete('/tasks/$id');
  }
}
