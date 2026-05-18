import '../../../core/mock/mock_app_data.dart';
import '../../../core/repositories/hashdate_repository.dart';

class DiscoveryController {
  DiscoveryController(this._repository);

  final HashdateRepository _repository;

  int _deckIndex = 0;
  bool _detailUnlocked = false;

  bool get detailUnlocked => _detailUnlocked;

  MockProfile get currentProfile {
    final profiles = _repository.fetchDiscoveryDeck();
    return profiles[_deckIndex % profiles.length];
  }

  String like() => _nextProfile('Like sent. Match sync queued.');

  String pass() => _nextProfile('Passed. Next recommendation loaded.');

  UnlockResult unlock({required int currentDiamonds, int cost = 10}) {
    if (_detailUnlocked) {
      return const UnlockResult(
        diamondsDelta: 0,
        message: 'Already unlocked. No duplicate charge.',
      );
    }
    if (currentDiamonds < cost) {
      return const UnlockResult(
        diamondsDelta: 0,
        message: 'Not enough diamonds.',
      );
    }
    _detailUnlocked = true;
    return UnlockResult(
      diamondsDelta: -cost,
      message: 'Premium detail unlocked for $cost diamonds.',
    );
  }

  String _nextProfile(String action) {
    final profiles = _repository.fetchDiscoveryDeck();
    _deckIndex = (_deckIndex + 1) % profiles.length;
    _detailUnlocked = false;
    return action;
  }
}

class UnlockResult {
  const UnlockResult({
    required this.diamondsDelta,
    required this.message,
  });

  final int diamondsDelta;
  final String message;
}
