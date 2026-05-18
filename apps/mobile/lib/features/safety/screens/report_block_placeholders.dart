import '../../../core/mock/mock_screen_models.dart';
import '../../../core/routing/app_routes.dart';

class ReportBlockMockScreens {
  static const reportUser = MockScreenSpec(
    route: AppRoutes.reportUser,
    title: 'Report User',
    primaryState: 'Structured report flow launched from profile or match detail.',
    sections: [
      'Reported profile summary',
      'Reason picker',
      'Optional details',
      'Evidence/photo placeholder',
      'Block after reporting toggle',
    ],
    actions: [
      'Submit report',
      'Submit and block',
      'Cancel',
    ],
    errorState: 'Report submission failed or missing reason.',
  );

  static const reportMessage = MockScreenSpec(
    route: AppRoutes.reportMessage,
    title: 'Report Message',
    primaryState: 'Message-specific report flow launched from chat.',
    sections: [
      'Reported message preview',
      'Conversation context note',
      'Reason picker',
      'Optional details',
    ],
    actions: [
      'Submit report',
      'Submit and block sender',
      'Cancel',
    ],
    errorState: 'Report submission failed or missing reason.',
  );

  static const blockUser = MockScreenSpec(
    route: AppRoutes.blockUser,
    title: 'Block User',
    primaryState: 'Confirmation sheet before hiding a member and ending contact.',
    sections: [
      'Blocked profile summary',
      'Visibility and chat impact explanation',
      'Optional report handoff',
    ],
    actions: [
      'Block user',
      'Report instead',
      'Cancel',
    ],
    errorState: 'Block submission failed.',
  );

  static const blockedUsers = MockScreenSpec(
    route: AppRoutes.blockedUsers,
    title: 'Blocked Users',
    primaryState: 'Settings-owned list of blocked profiles.',
    sections: [
      'Blocked profile rows',
      'Date blocked',
      'Unblock confirmation',
    ],
    actions: [
      'Unblock user',
      'Open support',
    ],
    emptyState: 'No blocked users.',
    errorState: 'Could not load blocked users.',
  );

  static const all = <MockScreenSpec>[
    reportUser,
    reportMessage,
    blockUser,
    blockedUsers,
  ];
}
