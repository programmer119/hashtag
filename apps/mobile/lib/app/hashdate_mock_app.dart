import 'package:flutter/material.dart';

import '../core/mock/mock_app_data.dart';
import '../core/mock/mock_hashdate_repository.dart';
import '../core/repositories/repository_mode.dart';
import 'app_runtime.dart';
import 'hashdate_mock_controller.dart';

class HashdateMockApp extends StatelessWidget {
  const HashdateMockApp({
    super.key,
    this.runtime,
  });

  final AppRuntime? runtime;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hashdate',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF1F6FEB),
          brightness: Brightness.light,
        ),
        scaffoldBackgroundColor: const Color(0xFFF6F7F9),
        useMaterial3: true,
      ),
      home: HashdateMockHome(runtime: runtime),
    );
  }
}

class HashdateAppRoot extends StatelessWidget {
  const HashdateAppRoot({
    super.key,
    this.config,
  });

  final AppRuntimeConfig? config;

  @override
  Widget build(BuildContext context) {
    final effectiveConfig = config ?? AppRuntimeConfig.fromEnvironment();

    if (!effectiveConfig.usesRest) {
      return HashdateMockApp(
        runtime: AppRuntime(
          config: effectiveConfig,
          repository: const MockHashdateRepository(),
          status: 'Running with local mock data.',
        ),
      );
    }

    return FutureBuilder<AppRuntime>(
      future: AppRuntime.load(effectiveConfig),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return HashdateMockApp(runtime: snapshot.requireData);
        }

        if (snapshot.hasError) {
          return HashdateRuntimeStatusApp(
            title: 'REST preview unavailable',
            message:
                'Could not hydrate from ${effectiveConfig.apiBaseUrl}. ${snapshot.error}',
            mode: effectiveConfig.mode,
          );
        }

        return HashdateRuntimeStatusApp(
          title: 'Loading Hashdate',
          message: 'Hydrating REST preview from ${effectiveConfig.apiBaseUrl}.',
          mode: effectiveConfig.mode,
          loading: true,
        );
      },
    );
  }
}

class HashdateRuntimeStatusApp extends StatelessWidget {
  const HashdateRuntimeStatusApp({
    super.key,
    required this.title,
    required this.message,
    required this.mode,
    this.loading = false,
  });

  final String title;
  final String message;
  final RepositoryMode mode;
  final bool loading;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hashdate',
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: SafeArea(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (loading) const CircularProgressIndicator(),
                  if (loading) const SizedBox(height: 20),
                  Text(
                    title,
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          fontWeight: FontWeight.w800,
                        ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    mode.label,
                    style: Theme.of(context).textTheme.labelLarge,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    message,
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class HashdateMockHome extends StatefulWidget {
  const HashdateMockHome({
    super.key,
    this.runtime,
  });

  final AppRuntime? runtime;

  @override
  State<HashdateMockHome> createState() => _HashdateMockHomeState();
}

class _HashdateMockHomeState extends State<HashdateMockHome> {
  late final HashdateMockController _controller;
  bool _authenticated = false;

  @override
  void initState() {
    super.initState();
    final runtime = widget.runtime;
    _controller = HashdateMockController(
      repository: runtime?.repository ?? const MockHashdateRepository(),
      runtimeStatus: runtime?.status ?? 'Running with local mock data.',
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_authenticated) {
      return HashdateAuthGate(
        onAuthenticated: () => setState(() => _authenticated = true),
      );
    }

    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        final pages = [
          _DiscoveryPage(
            session: _controller.session,
            profileSubmitted: _controller.profileSubmitted,
            profile: _controller.currentProfile,
            detailUnlocked: _controller.detailUnlocked,
            lastAction: _controller.lastAction,
            onLike: _controller.like,
            onPass: _controller.pass,
            onUnlock: _controller.unlockProfile,
            onSubmitProfile: _controller.submitProfile,
          ),
          _MatchesPage(
            messages: _controller.messages,
            onSend: _controller.sendMessage,
          ),
          _WalletPage(
            diamonds: _controller.diamonds,
            entries: _controller.walletEntries,
            onGrant: _controller.grantTestDiamonds,
          ),
          _SafetyPage(
            cases: _controller.safetyCases,
            reportSubmitted: _controller.reportSubmitted,
            onSubmitReport: _controller.submitSafetyReport,
          ),
          const _MorePage(),
        ];

        return Scaffold(
          appBar: AppBar(
            title: const Text('Hashdate'),
            actions: [
              Padding(
                padding: const EdgeInsets.only(right: 16),
                child: Center(
                  child: Text('${_controller.diamonds} DIA',
                      style: const TextStyle(fontWeight: FontWeight.w700)),
                ),
              ),
            ],
          ),
          body: SafeArea(
            child: Column(
              children: [
                _RuntimeBanner(text: _controller.runtimeStatus),
                Expanded(child: pages[_controller.tab]),
              ],
            ),
          ),
          bottomNavigationBar: NavigationBar(
            selectedIndex: _controller.tab,
            onDestinationSelected: _controller.selectTab,
            destinations: const [
              NavigationDestination(
                  icon: Icon(Icons.auto_awesome), label: '추천'),
              NavigationDestination(
                  icon: Icon(Icons.favorite_border), label: '매칭'),
              NavigationDestination(
                  icon: Icon(Icons.diamond_outlined), label: '지갑'),
              NavigationDestination(
                  icon: Icon(Icons.shield_outlined), label: '안전'),
              NavigationDestination(icon: Icon(Icons.menu), label: '메뉴'),
            ],
          ),
        );
      },
    );
  }
}

class HashdateAuthGate extends StatefulWidget {
  const HashdateAuthGate({
    super.key,
    required this.onAuthenticated,
  });

  final VoidCallback onAuthenticated;

  @override
  State<HashdateAuthGate> createState() => _HashdateAuthGateState();
}

class _HashdateAuthGateState extends State<HashdateAuthGate> {
  AuthGateStep _step = AuthGateStep.entry;
  AppLanguage _language = AppLanguage.ko;

  void _go(AuthGateStep step) {
    setState(() => _step = step);
  }

  @override
  Widget build(BuildContext context) {
    return switch (_step) {
      AuthGateStep.entry => _SignupEntryScreen(
          language: _language,
          onLanguageChanged: (language) => setState(() => _language = language),
          onLogin: () => _go(AuthGateStep.login),
          onSignup: () => _go(AuthGateStep.signupConditions),
        ),
      AuthGateStep.login => _LoginScreen(
          onBack: () => _go(AuthGateStep.entry),
          onAuthenticated: widget.onAuthenticated,
        ),
      AuthGateStep.signupConditions => _SignupConditionsScreen(
          onBack: () => _go(AuthGateStep.entry),
          onComplete: widget.onAuthenticated,
        ),
    };
  }
}

enum AuthGateStep {
  entry,
  login,
  signupConditions,
}

enum AppLanguage {
  ko('한', '회원 가입하기', '이미 계정이 있어요'),
  en('EN', 'Create account', 'I already have an account');

  const AppLanguage(this.button, this.signupLabel, this.loginLabel);

  final String button;
  final String signupLabel;
  final String loginLabel;
}

class _AuthHeader extends StatelessWidget implements PreferredSizeWidget {
  const _AuthHeader({
    required this.title,
    this.onBack,
  });

  final String title;
  final VoidCallback? onBack;

  @override
  Size get preferredSize => const Size.fromHeight(64);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: const Color(0xFF6043AD),
      foregroundColor: Colors.white,
      centerTitle: true,
      title: Text(
        title,
        style: const TextStyle(fontWeight: FontWeight.w800),
      ),
      leading: IconButton(
        onPressed: onBack,
        icon: const Icon(Icons.chevron_left, size: 34),
      ),
    );
  }
}

class _SignupEntryScreen extends StatelessWidget {
  const _SignupEntryScreen({
    required this.language,
    required this.onLanguageChanged,
    required this.onLogin,
    required this.onSignup,
  });

  final AppLanguage language;
  final ValueChanged<AppLanguage> onLanguageChanged;
  final VoidCallback onLogin;
  final VoidCallback onSignup;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const _AuthHeader(title: '회원가입'),
      body: Column(
        children: [
          Expanded(
            child: Container(
              width: double.infinity,
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFF6043AD), Color(0xFF4B26A6)],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.fromLTRB(24, 80, 24, 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Align(
                      alignment: Alignment.centerRight,
                      child: SegmentedButton<AppLanguage>(
                        style: SegmentedButton.styleFrom(
                          backgroundColor: const Color(0x332D185F),
                          foregroundColor: Colors.white,
                          selectedBackgroundColor: Colors.white,
                          selectedForegroundColor: const Color(0xFF4B26A6),
                        ),
                        segments: AppLanguage.values
                            .map((item) => ButtonSegment(
                                  value: item,
                                  label: Text(item.button),
                                ))
                            .toList(),
                        selected: {language},
                        onSelectionChanged: (value) =>
                            onLanguageChanged(value.single),
                      ),
                    ),
                    const Spacer(),
                    const Chip(
                      label: Text(
                        'Hashdate',
                        style: TextStyle(color: Colors.white),
                      ),
                      backgroundColor: Color(0xFF3D277A),
                    ),
                    const SizedBox(height: 16),
                    TextButton.icon(
                      onPressed: onSignup,
                      style: TextButton.styleFrom(
                        foregroundColor: Colors.white,
                        padding: EdgeInsets.zero,
                      ),
                      iconAlignment: IconAlignment.end,
                      icon: const Icon(Icons.keyboard_double_arrow_right),
                      label: Text(
                        language.signupLabel,
                        style: const TextStyle(
                          fontSize: 34,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ),
                    const SizedBox(height: 32),
                    const Divider(color: Color(0x55FFFFFF)),
                    const SizedBox(height: 16),
                    Align(
                      alignment: Alignment.centerRight,
                      child: TextButton.icon(
                        onPressed: onLogin,
                        style: TextButton.styleFrom(
                          foregroundColor: const Color(0xFFFFD166),
                        ),
                        iconAlignment: IconAlignment.end,
                        icon: const Icon(Icons.chevron_right),
                        label: Text(
                          language.loginLabel,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(18),
            child: Column(
              children: [
                _AuthInfoTile(
                  label: '소개팅 기능은 어떤 서비스 인가요?',
                  icon: Icons.chevron_right,
                  onTap: () {},
                ),
                const SizedBox(height: 12),
                _AuthInfoTile(
                  label: 'Hashdate의 지인 차단 기능',
                  icon: Icons.verified_user,
                  onTap: () {},
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _LoginScreen extends StatefulWidget {
  const _LoginScreen({
    required this.onBack,
    required this.onAuthenticated,
  });

  final VoidCallback onBack;
  final VoidCallback onAuthenticated;

  @override
  State<_LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<_LoginScreen> {
  final _id = TextEditingController(text: 'test1');
  final _password = TextEditingController(text: 'test1');
  bool _showPassword = false;
  String? _error;

  @override
  void dispose() {
    _id.dispose();
    _password.dispose();
    super.dispose();
  }

  void _submit() {
    if (_id.text.trim() == 'test1' && _password.text == 'test1') {
      widget.onAuthenticated();
      return;
    }
    setState(() => _error = '테스트 계정은 test1 / test1 입니다.');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _AuthHeader(title: '로그인', onBack: widget.onBack),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(24, 180, 24, 24),
        children: [
          const Text(
            '아이디',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 10),
          TextField(
            controller: _id,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              hintText: '이메일 주소 또는 아이디',
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            '비밀번호',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 10),
          TextField(
            controller: _password,
            obscureText: !_showPassword,
            decoration: InputDecoration(
              border: const OutlineInputBorder(),
              hintText: '비밀번호를 입력하세요',
              suffixIcon: IconButton(
                onPressed: () => setState(() => _showPassword = !_showPassword),
                icon: Icon(_showPassword
                    ? Icons.visibility_off_outlined
                    : Icons.visibility_outlined),
              ),
            ),
          ),
          if (_error != null) ...[
            const SizedBox(height: 12),
            Text(_error!, style: const TextStyle(color: Color(0xFFC2410C))),
          ],
          const SizedBox(height: 48),
          FilledButton(
            onPressed: _submit,
            style: FilledButton.styleFrom(
              backgroundColor: const Color(0xFFFF6B63),
              minimumSize: const Size.fromHeight(58),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            child: const Text(
              '다음',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
            ),
          ),
          const SizedBox(height: 36),
          Center(
            child: TextButton(
              onPressed: () {},
              child: const Text('아이디 또는 패스워드를 잊으셨나요?'),
            ),
          ),
          const SizedBox(height: 180),
          const Center(
            child: Text(
              'HASHDATE',
              style: TextStyle(
                color: Color(0xFF9CA3AF),
                letterSpacing: 6,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _SignupConditionsScreen extends StatefulWidget {
  const _SignupConditionsScreen({
    required this.onBack,
    required this.onComplete,
  });

  final VoidCallback onBack;
  final VoidCallback onComplete;

  @override
  State<_SignupConditionsScreen> createState() =>
      _SignupConditionsScreenState();
}

class _SignupConditionsScreenState extends State<_SignupConditionsScreen> {
  Gender _gender = Gender.male;

  @override
  Widget build(BuildContext context) {
    final cards = _gender == Gender.male
        ? const [
            _ConditionCardData(
              title: '안정된 회사에 재직중인 남성',
              body: '대기업, 공기업, 외국계기업, 국가기관, 언론사, 교사, 주요 스타트업',
            ),
            _ConditionCardData(
              title: '전문직에 종사하는 남성',
              body: '의사, 변호사, 변리사, 회계사, 약사, 수의사, 세무사 등',
            ),
            _ConditionCardData(
              title: '명문 대학 재학·졸업한 남성',
              body: '국내외 주요 대학 재학, 졸업, 대학원, 전문대학원',
            ),
          ]
        : const [
            _ConditionCardData(
              title: '프로필을 입력한 여성',
              body: '직장인 또는 프리랜서, 취준생 등이라면 누구나',
            ),
            _ConditionCardData(
              title: '학교나 전공을 입력한 여성',
              body: '모든 대학생·대학원생 등이라면 누구나',
            ),
          ];

    return Scaffold(
      appBar: _AuthHeader(title: '회원가입', onBack: widget.onBack),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              padding: const EdgeInsets.fromLTRB(24, 34, 24, 100),
              children: [
                Center(
                  child: SegmentedButton<Gender>(
                    segments: const [
                      ButtonSegment(
                          value: Gender.male,
                          label: Text('남성'),
                          icon: Icon(Icons.man)),
                      ButtonSegment(
                          value: Gender.female,
                          label: Text('여성'),
                          icon: Icon(Icons.woman)),
                    ],
                    selected: {_gender},
                    onSelectionChanged: (value) =>
                        setState(() => _gender = value.single),
                  ),
                ),
                const SizedBox(height: 32),
                Icon(
                  _gender == Gender.male ? Icons.checkroom : Icons.face_3,
                  color: const Color(0xFF6043AD),
                  size: 84,
                ),
                const SizedBox(height: 24),
                Text(
                  '${_gender.label} 가입조건 (택 1)',
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  '다음 중 하나에 해당하는 ${_gender.label}',
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    color: Color(0xFF6B7280),
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 10),
                const Text(
                  '· 구체적인 가입 기준은 내부 정책에 따라 변경될 수 있습니다.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Color(0xFFB6BBC5)),
                ),
                const SizedBox(height: 32),
                for (var index = 0; index < cards.length; index++) ...[
                  _SignupConditionCard(data: cards[index]),
                  if (index != cards.length - 1) const _OrDivider(),
                ],
              ],
            ),
          ),
          SafeArea(
            top: false,
            child: SizedBox(
              width: double.infinity,
              height: 70,
              child: FilledButton(
                onPressed: widget.onComplete,
                style: FilledButton.styleFrom(
                  backgroundColor: const Color(0xFFFF6B63),
                  shape: const RoundedRectangleBorder(),
                ),
                child: const Text(
                  '가입하기',
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

enum Gender {
  male('남성'),
  female('여성');

  const Gender(this.label);

  final String label;
}

class _ConditionCardData {
  const _ConditionCardData({
    required this.title,
    required this.body,
  });

  final String title;
  final String body;
}

class _SignupConditionCard extends StatelessWidget {
  const _SignupConditionCard({required this.data});

  final _ConditionCardData data;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFFF5F6F8),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(Icons.verified, color: Color(0xFFA99CF5), size: 32),
          const SizedBox(height: 18),
          Text(
            data.title,
            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 12),
          Text(
            data.body,
            style: const TextStyle(
              color: Color(0xFF6B7280),
              fontSize: 17,
              height: 1.45,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}

class _OrDivider extends StatelessWidget {
  const _OrDivider();

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.symmetric(vertical: 22),
      child: Center(
        child: Text(
          'or',
          style: TextStyle(
            fontFamily: 'serif',
            fontStyle: FontStyle.italic,
            fontSize: 28,
            color: Color(0xFF333333),
          ),
        ),
      ),
    );
  }
}

class _AuthInfoTile extends StatelessWidget {
  const _AuthInfoTile({
    required this.label,
    required this.icon,
    required this.onTap,
  });

  final String label;
  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(4),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 20),
        decoration: BoxDecoration(
          color: const Color(0xFFF4F5F7),
          borderRadius: BorderRadius.circular(4),
        ),
        child: Row(
          children: [
            Expanded(
              child: Text(
                label,
                style: const TextStyle(
                  color: Color(0xFF6043AD),
                  fontSize: 17,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            Icon(icon, color: const Color(0xFF8D939E)),
          ],
        ),
      ),
    );
  }
}

class _RuntimeBanner extends StatelessWidget {
  const _RuntimeBanner({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      color: const Color(0xFFEFF6FF),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      child: Text(
        text,
        style: Theme.of(context).textTheme.labelMedium?.copyWith(
              color: const Color(0xFF1D4ED8),
              fontWeight: FontWeight.w700,
            ),
      ),
    );
  }
}

class _DiscoveryPage extends StatelessWidget {
  const _DiscoveryPage({
    required this.session,
    required this.profileSubmitted,
    required this.profile,
    required this.detailUnlocked,
    required this.lastAction,
    required this.onLike,
    required this.onPass,
    required this.onUnlock,
    required this.onSubmitProfile,
  });

  final MockSession session;
  final bool profileSubmitted;
  final MockProfile profile;
  final bool detailUnlocked;
  final String lastAction;
  final VoidCallback onLike;
  final VoidCallback onPass;
  final VoidCallback onUnlock;
  final VoidCallback onSubmitProfile;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _SectionTitle(title: '오늘의 추천'),
        _SessionSummary(session: session),
        const SizedBox(height: 12),
        _ProfileSubmissionCard(
          submitted: profileSubmitted,
          onSubmitProfile: onSubmitProfile,
        ),
        const SizedBox(height: 12),
        _StatusBanner(text: lastAction),
        const SizedBox(height: 12),
        _ProfileCard(
          profile: profile,
          detailUnlocked: detailUnlocked,
          onUnlock: onUnlock,
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: onPass,
                icon: const Icon(Icons.close),
                label: const Text('패스'),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: FilledButton.icon(
                onPressed: onLike,
                icon: const Icon(Icons.favorite),
                label: const Text('좋아요'),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _ProfileCard extends StatelessWidget {
  const _ProfileCard({
    required this.profile,
    required this.detailUnlocked,
    required this.onUnlock,
  });

  final MockProfile profile;
  final bool detailUnlocked;
  final VoidCallback onUnlock;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 260,
              decoration: BoxDecoration(
                color: const Color(0xFFE5E7EB),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Center(
                child: Text(
                  profile.alias,
                  style: Theme.of(context)
                      .textTheme
                      .headlineMedium
                      ?.copyWith(fontWeight: FontWeight.w800),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              '${profile.age} / ${profile.region}',
              style: Theme.of(context)
                  .textTheme
                  .titleLarge
                  ?.copyWith(fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 4),
            Text(profile.intent),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: profile.tags
                  .map((tag) => Chip(label: Text('#$tag')))
                  .toList(),
            ),
            const Divider(height: 28),
            Text(
                detailUnlocked ? profile.lockedDetail : '프리미엄 상세 정보가 잠겨 있습니다.'),
            const SizedBox(height: 12),
            FilledButton.tonalIcon(
              onPressed: detailUnlocked ? null : onUnlock,
              icon: const Icon(Icons.lock_open),
              label: Text(detailUnlocked ? '열람 완료' : '10 다이아로 열람'),
            ),
          ],
        ),
      ),
    );
  }
}

class _MatchesPage extends StatelessWidget {
  const _MatchesPage({required this.messages, required this.onSend});

  final List<MockChatMessage> messages;
  final ValueChanged<String> onSend;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _SectionTitle(title: '매칭/채팅'),
        for (final message in messages)
          ListTile(
            leading: const CircleAvatar(child: Icon(Icons.person)),
            title: Text(message.sender),
            subtitle: Text(message.body),
            trailing: const Icon(Icons.chevron_right),
          ),
        const SizedBox(height: 12),
        FilledButton.icon(
          onPressed: () => onSend('Can we talk after work?'),
          icon: const Icon(Icons.send),
          label: const Text('메시지 보내기'),
        ),
      ],
    );
  }
}

class _ProfileSubmissionCard extends StatelessWidget {
  const _ProfileSubmissionCard({
    required this.submitted,
    required this.onSubmitProfile,
  });

  final bool submitted;
  final VoidCallback onSubmitProfile;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      child: ListTile(
        leading: const Icon(Icons.fact_check_outlined),
        title: Text(submitted ? '프로필 심사 제출 완료' : '프로필 입력 준비'),
        subtitle: Text(
          submitted ? '관리자 심사 대기 상태입니다.' : '프로필과 검증 정보를 입력하고 심사에 제출합니다.',
        ),
        trailing: FilledButton.tonal(
          onPressed: submitted ? null : onSubmitProfile,
          child: Text(submitted ? '제출됨' : '제출'),
        ),
      ),
    );
  }
}

class _WalletPage extends StatelessWidget {
  const _WalletPage({
    required this.diamonds,
    required this.entries,
    required this.onGrant,
  });

  final int diamonds;
  final List<MockWalletEntry> entries;
  final VoidCallback onGrant;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _SectionTitle(title: '다이아 지갑'),
        Card(
          elevation: 0,
          child: ListTile(
            title: const Text('현재 보유 다이아'),
            subtitle: const Text('인앱 결제 상품'),
            trailing: Text('$diamonds DIA',
                style: const TextStyle(fontWeight: FontWeight.w800)),
          ),
        ),
        const SizedBox(height: 12),
        FilledButton.tonalIcon(
          onPressed: onGrant,
          icon: const Icon(Icons.add_card),
          label: const Text('다이아 20개 충전'),
        ),
        const SizedBox(height: 12),
        for (final entry in entries)
          ListTile(
            title: Text(entry.label),
            trailing:
                Text(entry.amount > 0 ? '+${entry.amount}' : '${entry.amount}'),
          ),
      ],
    );
  }
}

class _SafetyPage extends StatelessWidget {
  const _SafetyPage({
    required this.cases,
    required this.reportSubmitted,
    required this.onSubmitReport,
  });

  final List<MockSafetyCase> cases;
  final bool reportSubmitted;
  final VoidCallback onSubmitReport;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _SectionTitle(title: '안전/신고'),
        _StatusBanner(
          text: reportSubmitted
              ? '신고가 관리자 검토 대기열에 등록되었습니다.'
              : '신고와 차단 접수 후 운영팀이 검토합니다.',
        ),
        const SizedBox(height: 12),
        for (final item in cases)
          ListTile(
            leading: const Icon(Icons.verified_user_outlined),
            title: Text(item.reason),
            subtitle: Text(item.status),
          ),
        const SizedBox(height: 12),
        FilledButton.icon(
          onPressed: reportSubmitted ? null : onSubmitReport,
          icon: const Icon(Icons.report),
          label: Text(reportSubmitted ? '신고 접수됨' : '선택 회원 신고'),
        ),
        const SizedBox(height: 8),
        OutlinedButton.icon(
          onPressed: null,
          icon: const Icon(Icons.block),
          label: const Text('선택 회원 차단'),
        ),
      ],
    );
  }
}

class _MorePage extends StatelessWidget {
  const _MorePage();

  static const sections = [
    _MockScreenGroup(
      title: '가입/검증',
      rows: [
        _MockScreenRow('회원가입 진입', '보라색 진입 화면, 한/영 토글, 로그인/가입 분기'),
        _MockScreenRow('로그인', '아이디/비밀번호 입력, test1/test1 테스트 계정'),
        _MockScreenRow('남성 가입조건', '회사, 전문직, 명문대 조건 카드'),
        _MockScreenRow('여성 가입조건', '프로필 입력, 학교/전공 입력 조건 카드'),
        _MockScreenRow('프로필 작성', '닉네임, 지역, 직업, 태그, 소개 입력'),
        _MockScreenRow('심사 대기', '서류/프로필 검토 대기와 반려 후 재제출 상태'),
      ],
    ),
    _MockScreenGroup(
      title: '매칭',
      rows: [
        _MockScreenRow('오늘의 추천', '승인 회원에게 카드형 추천 프로필 노출'),
        _MockScreenRow('프로필 상세', '잠긴 정보와 10 다이아 열람 확인'),
        _MockScreenRow('좋아요/패스', '관심/패스 액션과 다음 카드 이동'),
        _MockScreenRow('받은 호감', '상대가 보낸 호감과 프리미엄 호감 표시'),
        _MockScreenRow('매칭 목록', '상호 호감 성사 목록과 미확인 배지'),
      ],
    ),
    _MockScreenGroup(
      title: '커뮤니케이션',
      rows: [
        _MockScreenRow('1:1 채팅', '매칭된 상대와 메시지 주고받기'),
        _MockScreenRow('채팅 신고', '채팅방에서 신고/차단 진입'),
        _MockScreenRow('알림함', '매칭, 메시지, 심사, 결제 알림'),
        _MockScreenRow('공지사항', '서비스 공지, 점검, 정책 변경 안내'),
      ],
    ),
    _MockScreenGroup(
      title: '결제/운영',
      rows: [
        _MockScreenRow('다이아 지갑', '잔액, 구매 상품, 사용 내역'),
        _MockScreenRow('열람 내역', '프로필 열람과 중복 과금 방지 상태'),
        _MockScreenRow('계정 설정', '비밀번호, 알림, 언어, 로그아웃'),
        _MockScreenRow('지인 차단', '연락처 기반 차단 안내와 권한 설명'),
        _MockScreenRow('고객센터', '문의, 약관, 개인정보, 계정 삭제'),
      ],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const _SectionTitle(title: '전체 메뉴'),
        const _StatusBanner(
          text: '회원가입부터 매칭, 채팅, 결제, 고객센터까지 주요 기능을 한곳에서 확인할 수 있습니다.',
        ),
        const SizedBox(height: 12),
        for (final section in sections) _MockScreenSection(section: section),
      ],
    );
  }
}

class _MockScreenGroup {
  const _MockScreenGroup({required this.title, required this.rows});

  final String title;
  final List<_MockScreenRow> rows;
}

class _MockScreenRow {
  const _MockScreenRow(this.title, this.description);

  final String title;
  final String description;
}

class _MockScreenSection extends StatelessWidget {
  const _MockScreenSection({required this.section});

  final _MockScreenGroup section;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 12),
      child: ExpansionTile(
        initiallyExpanded: true,
        title: Text(
          section.title,
          style: const TextStyle(fontWeight: FontWeight.w900),
        ),
        children: [
          for (final row in section.rows)
            ListTile(
              leading: const Icon(Icons.check_circle_outline),
              title: Text(row.title),
              subtitle: Text(row.description),
              trailing: const Icon(Icons.chevron_right),
            ),
        ],
      ),
    );
  }
}

class _SessionSummary extends StatelessWidget {
  const _SessionSummary({required this.session});

  final MockSession session;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      child: ListTile(
        leading: const CircleAvatar(child: Icon(Icons.person_outline)),
        title: Text(session.nickname),
        subtitle:
            Text('${session.reviewStatus} / ${session.verificationLevel}'),
        trailing: const Icon(Icons.verified_outlined),
      ),
    );
  }
}

class _StatusBanner extends StatelessWidget {
  const _StatusBanner({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFFEAF2FF),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(text),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle({required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Text(
        title,
        style: Theme.of(context)
            .textTheme
            .headlineSmall
            ?.copyWith(fontWeight: FontWeight.w800),
      ),
    );
  }
}
