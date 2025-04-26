class Task {
  final int id;
  final String title;
  final String status;
  final DateTime createdAt;

  Task({
    required this.id,
    required this.title,
    required this.status,
    required this.createdAt,
  });

  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      id: json['id'],
      title: json['title'],
      status: json['status'],
      createdAt: DateTime.parse(json['created_at']),
    );
  }

  Map<String, dynamic> toJson() {
    return {'title': title, 'status': status};
  }
}
