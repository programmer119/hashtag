import '../../../core/mock/mock_app_data.dart';
import '../../../core/repositories/hashdate_repository.dart';

class SessionController {
  const SessionController(this._repository);

  final HashdateRepository _repository;

  MockSession restoreSession() => _repository.restoreSession();
}
