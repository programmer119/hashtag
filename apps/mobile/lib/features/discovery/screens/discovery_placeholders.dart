import '../../../core/mock/mock_screen_models.dart';
import '../../../core/routing/app_routes.dart';

class DiscoveryMockScreens {
  static const swipeDeck = MockScreenSpec(
    route: AppRoutes.discovery,
    title: 'Discovery Swipe',
    primaryState: 'Approved member browsing the active recommendation deck.',
    sections: [
      'Photo-first profile card',
      'Age, region, intent, and shared tags',
      'Locked premium detail teaser',
      'Deck position and refresh status',
    ],
    actions: [
      'Pass',
      'Like',
      'Open profile detail',
      'Undo placeholder',
    ],
    emptyState: 'No more profiles in the current deck.',
    errorState: 'Deck fetch failed; retry or open support.',
  );

  static const profileDetail = MockScreenSpec(
    route: AppRoutes.profileDetail,
    title: 'Profile Detail',
    primaryState: 'Expanded profile view with free and locked sections.',
    sections: [
      'Photo carousel',
      'Public profile facts',
      'Introduction and shared tags',
      'Locked premium fields',
      'Safety actions',
    ],
    actions: [
      'Like',
      'Pass',
      'Unlock profile',
      'Report user',
      'Block user',
    ],
  );

  static const unlockSheet = MockScreenSpec(
    route: AppRoutes.walletUnlock,
    title: 'Unlock Profile',
    primaryState: 'Diamond confirmation before revealing premium detail.',
    sections: [
      'Target profile summary',
      'Unlock cost',
      'Current diamond balance',
      'Post-unlock benefit list',
    ],
    actions: [
      'Confirm unlock',
      'Open diamond store',
      'Cancel',
    ],
    errorState: 'Insufficient balance or duplicate unlock submission.',
  );

  static const all = <MockScreenSpec>[
    swipeDeck,
    profileDetail,
    unlockSheet,
  ];
}
