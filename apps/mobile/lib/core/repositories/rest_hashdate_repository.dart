import '../api/hashdate_api.dart';
import '../mock/mock_app_data.dart';
import 'hashdate_repository.dart';

class RestHashdateRepository implements HashdateRepository {
  const RestHashdateRepository(
    this._api, {
    RestRepositorySnapshot? snapshot,
  }) : _snapshot = snapshot;

  final HashdateApi _api;
  final RestRepositorySnapshot? _snapshot;

  HashdateApi get api => _api;

  @override
  MockSession restoreSession() {
    final body = _requireSnapshot().currentUser;
    final user = _asMap(body['user']);
    return MockSession(
      nickname: _asString(user['nickname'], fallback: 'Member'),
      reviewStatus: _asString(user['status'], fallback: 'unknown'),
      verificationLevel:
          _asString(body['onboardingState'], fallback: 'pending'),
    );
  }

  @override
  List<MockProfile> fetchDiscoveryDeck() {
    final candidates = _asList(_requireSnapshot().swipeDeck['candidates']);
    return candidates.map((candidate) {
      final map = _asMap(candidate);
      return MockProfile(
        alias: _asString(map['nickname'], fallback: 'Hashdate member'),
        age: _asInt(map['age']),
        region: _asString(map['city'], fallback: 'Seoul'),
        intent: _asString(map['intro'], fallback: 'Intentional dating'),
        tags: const ['verified', 'preview'],
        lockedDetail:
            'Unlock cost: ${_asInt(map['unlockCost'], fallback: 10)} diamonds.',
      );
    }).toList(growable: false);
  }

  @override
  List<MockChatMessage> fetchMatchMessages() {
    final messages = _asList(_requireSnapshot().chatMessages['messages']);
    return messages.map((message) {
      final map = _asMap(message);
      return MockChatMessage(
        sender: _asString(map['sender'], fallback: 'match') == 'me'
            ? 'Me'
            : 'Match',
        body: _asString(map['text'], fallback: ''),
      );
    }).toList(growable: false);
  }

  @override
  List<MockWalletEntry> fetchWalletEntries() {
    final entries = _asList(_requireSnapshot().walletLedger['entries']);
    return entries.map((entry) {
      final map = _asMap(entry);
      return MockWalletEntry(
        label: _asString(map['reason'],
            fallback: _asString(map['type'], fallback: 'Wallet activity')),
        amount: _asInt(map['amount']),
      );
    }).toList(growable: false);
  }

  @override
  List<MockSafetyCase> fetchSafetyCases() {
    final report = _requireSnapshot().latestReport;
    return [
      MockSafetyCase(
        reason: _asString(report['reasonCode'], fallback: 'profile report'),
        status: _asString(report['status'], fallback: 'open'),
      ),
    ];
  }

  RestRepositorySnapshot _requireSnapshot() {
    final snapshot = _snapshot;
    if (snapshot == null) throw const RestRepositoryNotHydrated();
    return snapshot;
  }
}

class RestRepositorySnapshot {
  const RestRepositorySnapshot({
    required this.currentUser,
    required this.swipeDeck,
    required this.walletLedger,
    required this.chatMessages,
    required this.latestReport,
  });

  final Map<String, Object?> currentUser;
  final Map<String, Object?> swipeDeck;
  final Map<String, Object?> walletLedger;
  final Map<String, Object?> chatMessages;
  final Map<String, Object?> latestReport;
}

class RestRepositoryNotHydrated implements Exception {
  const RestRepositoryNotHydrated();

  @override
  String toString() =>
      'REST repository has no hydrated API response snapshot yet.';
}

Map<String, Object?> _asMap(Object? value) {
  if (value is Map<String, Object?>) return value;
  if (value is Map) {
    return value.map((key, entry) => MapEntry('$key', entry));
  }
  return const {};
}

List<Object?> _asList(Object? value) {
  if (value is List<Object?>) return value;
  if (value is List) return List<Object?>.of(value);
  return const [];
}

String _asString(Object? value, {required String fallback}) {
  return value is String && value.isNotEmpty ? value : fallback;
}

int _asInt(Object? value, {int fallback = 0}) {
  if (value is int) return value;
  if (value is num) return value.toInt();
  return fallback;
}
