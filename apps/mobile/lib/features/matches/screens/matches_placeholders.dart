import '../../../core/mock/mock_screen_models.dart';
import '../../../core/routing/app_routes.dart';

class MatchesMockScreens {
  static const list = MockScreenSpec(
    route: AppRoutes.matches,
    title: 'Matches',
    primaryState: 'Mutual matches ordered by latest activity.',
    sections: [
      'New match highlights',
      'Active conversations',
      'Profile summary rows',
      'Unread indicators',
    ],
    actions: [
      'Open match detail',
      'Open chat thread',
      'Refresh matches',
    ],
    emptyState: 'No mutual matches yet.',
    errorState: 'Could not load matches.',
  );

  static const detail = MockScreenSpec(
    route: AppRoutes.matchDetail,
    title: 'Match Detail',
    primaryState: 'Mutual match profile summary before chat entry.',
    sections: [
      'Matched profile header',
      'Shared interests',
      'Recent activity',
      'Safety shortcuts',
    ],
    actions: [
      'Start chat',
      'View full profile',
      'Report user',
      'Block user',
    ],
  );

  static const all = <MockScreenSpec>[
    list,
    detail,
  ];
}
