import '../mock/mock_app_data.dart';

abstract interface class HashdateRepository {
  MockSession restoreSession();

  List<MockProfile> fetchDiscoveryDeck();

  List<MockChatMessage> fetchMatchMessages();

  List<MockWalletEntry> fetchWalletEntries();

  List<MockSafetyCase> fetchSafetyCases();
}
