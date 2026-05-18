import '../core/api/hashdate_api.dart';
import '../core/api/live_api_client.dart';
import '../core/mock/mock_hashdate_repository.dart';
import '../core/repositories/hashdate_repository.dart';
import '../core/repositories/repository_mode.dart';
import '../core/repositories/rest_hashdate_repository.dart';
import '../core/repositories/rest_repository_hydrator.dart';

class AppRuntimeConfig {
  const AppRuntimeConfig({
    required this.mode,
    required this.apiBaseUrl,
  });

  factory AppRuntimeConfig.fromEnvironment() {
    const rawMode = String.fromEnvironment('HASHDATE_REPOSITORY_MODE');
    const rawApiBaseUrl = String.fromEnvironment(
      'HASHDATE_API_BASE_URL',
      defaultValue: 'http://10.0.2.2:4332',
    );

    return AppRuntimeConfig(
      mode: rawMode == 'rest' ? RepositoryMode.rest : RepositoryMode.mock,
      apiBaseUrl: Uri.parse(rawApiBaseUrl),
    );
  }

  final RepositoryMode mode;
  final Uri apiBaseUrl;

  bool get usesRest => mode == RepositoryMode.rest;
}

class AppRuntime {
  const AppRuntime({
    required this.config,
    required this.repository,
    required this.status,
  });

  final AppRuntimeConfig config;
  final HashdateRepository repository;
  final String status;

  static Future<AppRuntime> load(AppRuntimeConfig config) async {
    if (!config.usesRest) {
      return AppRuntime(
        config: config,
        repository: const MockHashdateRepository(),
        status: 'Running with local mock data.',
      );
    }

    final api = HashdateApi(LiveApiClient(baseUrl: config.apiBaseUrl));
    final snapshot = await RestRepositoryHydrator(api).hydratePreview();
    return AppRuntime(
      config: config,
      repository: RestHashdateRepository(api, snapshot: snapshot),
      status: 'Hydrated from ${config.apiBaseUrl}.',
    );
  }
}
