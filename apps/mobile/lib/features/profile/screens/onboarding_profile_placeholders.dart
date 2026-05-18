import '../../../core/mock/mock_screen_models.dart';
import '../../../core/routing/app_routes.dart';

class OnboardingProfileMockScreens {
  static const basics = MockScreenSpec(
    route: AppRoutes.onboardingProfile,
    title: 'Profile Basics',
    primaryState: 'New member creating the reviewable profile draft.',
    sections: [
      'Nickname, birth year, gender, and region',
      'Occupation and education summary',
      'Short introduction',
      'Required field completion meter',
    ],
    actions: [
      'Save draft',
      'Continue to photos',
    ],
    errorState: 'Missing required fields or policy-sensitive text.',
  );

  static const photos = MockScreenSpec(
    route: AppRoutes.onboardingPhotos,
    title: 'Profile Photos',
    primaryState: 'Local photo selection before signed upload integration.',
    sections: [
      'Primary photo slot',
      'Secondary photo slots',
      'Photo review guidelines',
      'Upload progress placeholders',
    ],
    actions: [
      'Add photo',
      'Reorder photo',
      'Continue to tags',
    ],
    emptyState: 'No photos selected yet.',
  );

  static const tags = MockScreenSpec(
    route: AppRoutes.onboardingTags,
    title: 'Lifestyle Tags',
    primaryState: 'Member choosing interests, lifestyle, and relationship intent.',
    sections: [
      'Interests',
      'Lifestyle',
      'Dating intent',
      'Visibility preview',
    ],
    actions: [
      'Toggle tag',
      'Continue to review checklist',
    ],
  );

  static const submit = MockScreenSpec(
    route: AppRoutes.onboardingSubmit,
    title: 'Submit For Review',
    primaryState: 'Profile draft ready for admin moderation.',
    sections: [
      'Profile completion checklist',
      'Photo readiness checklist',
      'Approval timing explanation',
      'Editable summary',
    ],
    actions: [
      'Submit profile',
      'Edit section',
    ],
    errorState: 'Draft is incomplete or already under review.',
  );

  static const all = <MockScreenSpec>[
    basics,
    photos,
    tags,
    submit,
  ];
}
