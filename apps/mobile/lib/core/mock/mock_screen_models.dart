/// Dependency-free contracts for mock screens.
///
/// These classes are intentionally plain Dart so the skeleton can be reviewed
/// before the generated Flutter project and package dependencies land.
class MockScreenSpec {
  const MockScreenSpec({
    required this.route,
    required this.title,
    required this.primaryState,
    required this.sections,
    required this.actions,
    this.emptyState,
    this.errorState,
  });

  final String route;
  final String title;
  final String primaryState;
  final List<String> sections;
  final List<String> actions;
  final String? emptyState;
  final String? errorState;
}

class MockEntity {
  const MockEntity({
    required this.id,
    required this.label,
    required this.fields,
  });

  final String id;
  final String label;
  final Map<String, Object> fields;
}
