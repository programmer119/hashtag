enum RepositoryMode {
  mock,
  rest,
}

extension RepositoryModeLabel on RepositoryMode {
  String get label => switch (this) {
        RepositoryMode.mock => 'Mock data',
        RepositoryMode.rest => 'REST preview',
      };
}
