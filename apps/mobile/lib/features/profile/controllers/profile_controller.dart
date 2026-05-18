import '../../../core/mock/mock_app_data.dart';
import '../../../core/repositories/hashdate_repository.dart';

class ProfileController {
  ProfileController(this._repository);

  final HashdateRepository _repository;

  bool _submitted = false;

  MockSession get session => _repository.restoreSession();

  bool get submitted => _submitted;

  String submitProfile() {
    _submitted = true;
    return 'Profile submitted for admin review.';
  }
}
