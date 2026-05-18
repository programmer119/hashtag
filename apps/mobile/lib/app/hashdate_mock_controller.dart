import 'package:flutter/foundation.dart';

import '../core/mock/mock_app_data.dart';
import '../core/mock/mock_hashdate_repository.dart';
import '../core/repositories/hashdate_repository.dart';
import '../features/chat/controllers/chat_controller.dart';
import '../features/discovery/controllers/discovery_controller.dart';
import '../features/profile/controllers/profile_controller.dart';
import '../features/safety/controllers/safety_controller.dart';
import '../features/wallet/controllers/wallet_controller.dart';

class HashdateMockController extends ChangeNotifier {
  HashdateMockController({
    HashdateRepository repository = const MockHashdateRepository(),
    String runtimeStatus = 'Running with local mock data.',
  })  : _repository = repository,
        _runtimeStatus = runtimeStatus,
        _profile = ProfileController(repository),
        _discovery = DiscoveryController(repository),
        _chat = ChatController(repository),
        _wallet = WalletController(repository),
        _safety = SafetyController(repository);

  final HashdateRepository _repository;
  final String _runtimeStatus;
  final ProfileController _profile;
  final DiscoveryController _discovery;
  final ChatController _chat;
  final WalletController _wallet;
  final SafetyController _safety;

  int _tab = 0;
  String _lastAction = 'Ready for approval-gated discovery.';

  int get tab => _tab;

  String get lastAction => _lastAction;

  String get runtimeStatus => _runtimeStatus;

  MockSession get session => _profile.session;

  bool get profileSubmitted => _profile.submitted;

  MockProfile get currentProfile => _discovery.currentProfile;

  bool get detailUnlocked => _discovery.detailUnlocked;

  int get diamonds => _wallet.diamonds;

  List<MockWalletEntry> get walletEntries => _wallet.entries;

  List<MockChatMessage> get messages => _chat.messages;

  List<MockSafetyCase> get safetyCases => _safety.cases;

  bool get reportSubmitted => _safety.reportSubmitted;

  void selectTab(int tab) {
    _tab = tab;
    notifyListeners();
  }

  void like() {
    _lastAction = _discovery.like();
    notifyListeners();
  }

  void pass() {
    _lastAction = _discovery.pass();
    notifyListeners();
  }

  void unlockProfile() {
    final result = _discovery.unlock(currentDiamonds: _wallet.diamonds);
    _wallet.applyDelta(result.diamondsDelta);
    _lastAction = result.message;
    notifyListeners();
  }

  void grantTestDiamonds() {
    _lastAction = _wallet.grantTestDiamonds();
    notifyListeners();
  }

  void submitProfile() {
    _lastAction = _profile.submitProfile();
    notifyListeners();
  }

  void sendMessage(String body) {
    _lastAction = _chat.sendMessage(body);
    notifyListeners();
  }

  void submitSafetyReport() {
    _lastAction = _safety.submitReport();
    notifyListeners();
  }
}
