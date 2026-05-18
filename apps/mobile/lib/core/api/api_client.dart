/// Boundary for backend communication.
///
/// Keep widgets and feature controllers behind this interface so the first app
/// can run with mock data, then swap in REST calls as endpoints become stable.
abstract interface class ApiClient {
  Future<ApiResponse> get(String path, {Map<String, String>? query});

  Future<ApiResponse> post(String path, {Object? body});

  Future<ApiResponse> put(String path, {Object? body});

  Future<ApiResponse> patch(String path, {Object? body});

  Future<ApiResponse> delete(String path);
}

class ApiResponse {
  const ApiResponse({
    required this.statusCode,
    required this.body,
  });

  final int statusCode;
  final Object? body;

  bool get isSuccess => statusCode >= 200 && statusCode < 300;
}
