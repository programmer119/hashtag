import 'api_client.dart';

class HashdateApi {
  const HashdateApi(this._client);

  final ApiClient _client;

  Future<ApiResponse> devLogin({
    required String email,
    bool hasProfile = true,
  }) {
    return _client.post(
      '/v1/auth/dev-login',
      body: {
        'email': email,
        'hasProfile': hasProfile,
      },
    );
  }

  Future<ApiResponse> getMe() => _client.get('/v1/users/me');

  Future<ApiResponse> getMyProfile() => _client.get('/v1/profiles/me');

  Future<ApiResponse> saveMyProfile({
    required String nickname,
    required int birthYear,
    required String city,
    required String occupation,
    required List<String> tags,
    required String intro,
  }) {
    return _client.put(
      '/v1/profiles/me',
      body: {
        'nickname': nickname,
        'birthYear': birthYear,
        'city': city,
        'occupation': occupation,
        'tags': tags,
        'intro': intro,
      },
    );
  }

  Future<ApiResponse> getSwipeDeck() => _client.get('/v1/discovery/swipe-deck');

  Future<ApiResponse> recordSwipe({
    required String profileId,
    required String action,
  }) {
    return _client.post(
      '/v1/discovery/swipes',
      body: {
        'profileId': profileId,
        'action': action,
      },
    );
  }

  Future<ApiResponse> unlockProfile(String profileId) {
    return _client.post('/v1/profiles/$profileId/unlocks');
  }

  Future<ApiResponse> getWallet() => _client.get('/v1/wallet');

  Future<ApiResponse> getWalletLedger() => _client.get('/v1/wallet/ledger');

  Future<ApiResponse> getMatches() => _client.get('/v1/matches');

  Future<ApiResponse> getChatRooms() => _client.get('/v1/chat/rooms');

  Future<ApiResponse> getChatMessages(String roomId) {
    return _client.get('/v1/chat/rooms/$roomId/messages');
  }

  Future<ApiResponse> submitReport({
    required String targetUserId,
    required String targetType,
    required String reasonCode,
    required String detail,
  }) {
    return _client.post(
      '/v1/reports',
      body: {
        'targetUserId': targetUserId,
        'targetType': targetType,
        'reasonCode': reasonCode,
        'detail': detail,
      },
    );
  }
}
