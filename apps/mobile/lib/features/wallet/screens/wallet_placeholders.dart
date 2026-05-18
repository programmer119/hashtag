import '../../../core/mock/mock_screen_models.dart';
import '../../../core/routing/app_routes.dart';

class WalletMockScreens {
  static const overview = MockScreenSpec(
    route: AppRoutes.wallet,
    title: 'Wallet',
    primaryState: 'Diamond balance and recent transactions.',
    sections: [
      'Current diamond balance',
      'Recent unlocks and purchases',
      'Store entry point',
      'Receipt support note',
    ],
    actions: [
      'Open diamond store',
      'Refresh balance',
      'Open transaction detail',
    ],
    emptyState: 'No wallet activity yet.',
    errorState: 'Could not refresh wallet.',
  );

  static const store = MockScreenSpec(
    route: AppRoutes.walletStore,
    title: 'Diamond Store',
    primaryState: 'Apple/Google IAP product catalog placeholder.',
    sections: [
      'Product package list',
      'Best value marker',
      'Purchase terms',
      'Restore purchase placeholder',
    ],
    actions: [
      'Select product',
      'Restore purchases',
      'Contact support',
    ],
    errorState: 'Product catalog unavailable.',
  );

  static const all = <MockScreenSpec>[
    overview,
    store,
  ];
}
