import '../core/mock/mock_screen_models.dart';
import '../features/auth/screens/auth_placeholders.dart';
import '../features/chat/screens/chat_placeholders.dart';
import '../features/discovery/screens/discovery_placeholders.dart';
import '../features/matches/screens/matches_placeholders.dart';
import '../features/profile/screens/onboarding_profile_placeholders.dart';
import '../features/profile/screens/review_pending_placeholder.dart';
import '../features/safety/screens/report_block_placeholders.dart';
import '../features/settings/screens/settings_placeholders.dart';
import '../features/wallet/screens/wallet_placeholders.dart';

/// Single handoff point for the first generated Flutter mock flow.
class MockAppSkeleton {
  static const screens = <MockScreenSpec>[
    ...AuthMockScreens.all,
    ...OnboardingProfileMockScreens.all,
    ReviewPendingMockScreen.spec,
    ...DiscoveryMockScreens.all,
    ...MatchesMockScreens.all,
    ...ChatMockScreens.all,
    ...WalletMockScreens.all,
    ...SettingsMockScreens.all,
    ...ReportBlockMockScreens.all,
  ];

  static List<String> get routes =>
      screens.map((screen) => screen.route).toList(growable: false);
}
