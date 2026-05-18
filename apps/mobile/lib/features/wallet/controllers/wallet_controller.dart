import '../../../core/mock/mock_app_data.dart';
import '../../../core/repositories/hashdate_repository.dart';

class WalletController {
  WalletController(this._repository);

  final HashdateRepository _repository;

  int _diamonds = 40;

  int get diamonds => _diamonds;

  List<MockWalletEntry> get entries => _repository.fetchWalletEntries();

  void applyDelta(int delta) {
    _diamonds += delta;
  }

  String grantTestDiamonds({int amount = 20}) {
    _diamonds += amount;
    return '$amount test diamonds granted through mock wallet.';
  }
}
