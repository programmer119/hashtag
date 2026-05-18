import '../../../core/mock/mock_screen_models.dart';
import '../../../core/routing/app_routes.dart';

class SettingsMockScreens {
  static const home = MockScreenSpec(
    route: AppRoutes.settings,
    title: 'Settings',
    primaryState: 'Approved or pending member managing account preferences.',
    sections: [
      'Account summary',
      'Notifications',
      'Privacy and safety',
      'Wallet support',
      'Legal links',
    ],
    actions: [
      'Open account settings',
      'Open safety center',
      'Log out',
    ],
  );

  static const account = MockScreenSpec(
    route: AppRoutes.settingsAccount,
    title: 'Account Settings',
    primaryState: 'Contact, login, logout, and deletion request entry.',
    sections: [
      'Login identifiers',
      'Session controls',
      'Account deletion request',
    ],
    actions: [
      'Update contact placeholder',
      'Log out',
      'Request account deletion',
    ],
  );

  static const safety = MockScreenSpec(
    route: AppRoutes.settingsSafety,
    title: 'Safety Center',
    primaryState: 'Safety resources and report history placeholder.',
    sections: [
      'Community guidelines',
      'Report history',
      'Blocked users entry',
      'Support contact',
    ],
    actions: [
      'Open report history',
      'Open blocked users',
      'Contact support',
    ],
    emptyState: 'No report history yet.',
  );

  static const all = <MockScreenSpec>[
    home,
    account,
    safety,
  ];
}
