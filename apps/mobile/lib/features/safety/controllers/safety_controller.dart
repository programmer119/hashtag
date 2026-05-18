import '../../../core/mock/mock_app_data.dart';
import '../../../core/repositories/hashdate_repository.dart';

class SafetyController {
  SafetyController(this._repository);

  final HashdateRepository _repository;

  bool _reportSubmitted = false;

  bool get reportSubmitted => _reportSubmitted;

  List<MockSafetyCase> get cases => _repository.fetchSafetyCases();

  String submitReport() {
    _reportSubmitted = true;
    return 'Safety report queued for admin review.';
  }
}
