import 'mock_app_data.dart';
import '../repositories/hashdate_repository.dart';

class MockHashdateRepository implements HashdateRepository {
  const MockHashdateRepository();

  @override
  MockSession restoreSession() => MockAppData.session;

  @override
  List<MockProfile> fetchDiscoveryDeck() => MockAppData.profiles;

  @override
  List<MockChatMessage> fetchMatchMessages() => MockAppData.messages;

  @override
  List<MockWalletEntry> fetchWalletEntries() => MockAppData.walletEntries;

  @override
  List<MockSafetyCase> fetchSafetyCases() => MockAppData.safetyCases;
}
