import '../../../core/mock/mock_screen_models.dart';
import '../../../core/routing/app_routes.dart';

class ReviewPendingMockScreen {
  static const spec = MockScreenSpec(
    route: AppRoutes.reviewPending,
    title: 'Review Pending',
    primaryState: 'Submitted member waiting for admin approval.',
    sections: [
      'Approval status banner',
      'Estimated review timing',
      'Submitted profile summary',
      'Support and policy links',
    ],
    actions: [
      'Refresh status',
      'Edit submitted profile',
      'Contact support',
      'Log out',
    ],
    emptyState: 'No submitted profile found; return to onboarding.',
    errorState: 'Could not refresh approval state.',
  );
}
