import '../api/api_client.dart';
import '../api/hashdate_api.dart';
import 'rest_hashdate_repository.dart';

class RestRepositoryHydrator {
  const RestRepositoryHydrator(this._api);

  final HashdateApi _api;

  Future<RestRepositorySnapshot> hydratePreview({
    String chatRoomId = 'room_m_3001',
    Map<String, Object?> latestReport = const {
      'reasonCode': 'profile_report',
      'status': 'not_loaded',
    },
  }) async {
    final currentUser = await _mapResponse(_api.getMe());
    final swipeDeck = await _mapResponse(_api.getSwipeDeck());
    final walletLedger = await _mapResponse(_api.getWalletLedger());
    final chatMessages = await _mapResponse(_api.getChatMessages(chatRoomId));

    return RestRepositorySnapshot(
      currentUser: currentUser,
      swipeDeck: swipeDeck,
      walletLedger: walletLedger,
      chatMessages: chatMessages,
      latestReport: latestReport,
    );
  }

  Future<Map<String, Object?>> _mapResponse(
      Future<ApiResponse> responseFuture) async {
    final response = await responseFuture;
    if (!response.isSuccess) {
      throw RestHydrationException(
          'Request failed with status ${response.statusCode}');
    }
    final body = response.body;
    if (body is Map<String, Object?>) return body;
    if (body is Map) return body.map((key, value) => MapEntry('$key', value));
    throw const RestHydrationException('Response body is not a JSON object');
  }
}

class RestHydrationException implements Exception {
  const RestHydrationException(this.message);

  final String message;

  @override
  String toString() => 'REST hydration failed: $message';
}
