import 'dart:convert';
import 'dart:io';

import 'api_client.dart';

class LiveApiClient implements ApiClient {
  LiveApiClient({
    required Uri baseUrl,
    HttpClient? httpClient,
  })  : _baseUrl = baseUrl,
        _httpClient = httpClient ?? HttpClient();

  final Uri _baseUrl;
  final HttpClient _httpClient;

  @override
  Future<ApiResponse> get(String path, {Map<String, String>? query}) {
    return _send('GET', path, query: query);
  }

  @override
  Future<ApiResponse> post(String path, {Object? body}) {
    return _send('POST', path, body: body);
  }

  @override
  Future<ApiResponse> put(String path, {Object? body}) {
    return _send('PUT', path, body: body);
  }

  @override
  Future<ApiResponse> patch(String path, {Object? body}) {
    return _send('PATCH', path, body: body);
  }

  @override
  Future<ApiResponse> delete(String path) {
    return _send('DELETE', path);
  }

  Future<ApiResponse> _send(
    String method,
    String path, {
    Map<String, String>? query,
    Object? body,
  }) async {
    final uri = _baseUrl.replace(
      path: _joinPath(_baseUrl.path, path),
      queryParameters: query?.isEmpty ?? true ? null : query,
    );
    final request = await _httpClient.openUrl(method, uri);
    request.headers.set(HttpHeaders.acceptHeader, 'application/json');

    if (body != null) {
      request.headers.set(HttpHeaders.contentTypeHeader, 'application/json');
      request.write(jsonEncode(body));
    }

    final response = await request.close();
    final text = await response.transform(utf8.decoder).join();
    return ApiResponse(
      statusCode: response.statusCode,
      body: text.isEmpty ? null : jsonDecode(text),
    );
  }
}

String _joinPath(String basePath, String path) {
  final normalizedBase = basePath.endsWith('/')
      ? basePath.substring(0, basePath.length - 1)
      : basePath;
  final normalizedPath = path.startsWith('/') ? path : '/$path';
  return '$normalizedBase$normalizedPath';
}
