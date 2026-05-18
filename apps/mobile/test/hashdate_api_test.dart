import 'package:flutter_test/flutter_test.dart';
import 'package:hashdate_mobile/core/api/api_client.dart';
import 'package:hashdate_mobile/core/api/hashdate_api.dart';

void main() {
  test('HashdateApi maps MVP endpoints and request bodies', () async {
    final client = RecordingApiClient();
    final api = HashdateApi(client);

    await api.devLogin(email: 'preview@hashdate.local');
    await api.saveMyProfile(
      nickname: 'Pablo',
      birthYear: 1993,
      city: 'Seoul',
      occupation: 'Founder',
      tags: ['serious', 'premium'],
      intro: 'Intentional dating.',
    );
    await api.recordSwipe(profileId: 'p_2001', action: 'like');
    await api.unlockProfile('p_2001');
    await api.submitReport(
      targetUserId: 'u_2001',
      targetType: 'profile',
      reasonCode: 'inappropriate_content',
      detail: 'Unsafe content.',
    );

    expect(client.calls.map((call) => call.method), [
      'POST',
      'PUT',
      'POST',
      'POST',
      'POST',
    ]);
    expect(client.calls.map((call) => call.path), [
      '/v1/auth/dev-login',
      '/v1/profiles/me',
      '/v1/discovery/swipes',
      '/v1/profiles/p_2001/unlocks',
      '/v1/reports',
    ]);
    expect(client.calls.first.body, {
      'email': 'preview@hashdate.local',
      'hasProfile': true,
    });
  });
}

class RecordingApiClient implements ApiClient {
  RecordingApiClient({this.responses = const {}});

  final Map<String, ApiResponse> responses;
  final calls = <ApiCall>[];

  @override
  Future<ApiResponse> delete(String path) async {
    calls.add(ApiCall('DELETE', path));
    return responses[path] ?? const ApiResponse(statusCode: 200, body: null);
  }

  @override
  Future<ApiResponse> get(String path, {Map<String, String>? query}) async {
    calls.add(ApiCall('GET', path, query: query));
    return responses[path] ?? const ApiResponse(statusCode: 200, body: null);
  }

  @override
  Future<ApiResponse> patch(String path, {Object? body}) async {
    calls.add(ApiCall('PATCH', path, body: body));
    return responses[path] ?? const ApiResponse(statusCode: 200, body: null);
  }

  @override
  Future<ApiResponse> post(String path, {Object? body}) async {
    calls.add(ApiCall('POST', path, body: body));
    return responses[path] ?? const ApiResponse(statusCode: 200, body: null);
  }

  @override
  Future<ApiResponse> put(String path, {Object? body}) async {
    calls.add(ApiCall('PUT', path, body: body));
    return responses[path] ?? const ApiResponse(statusCode: 200, body: null);
  }
}

class ApiCall {
  const ApiCall(
    this.method,
    this.path, {
    this.query,
    this.body,
  });

  final String method;
  final String path;
  final Map<String, String>? query;
  final Object? body;
}
