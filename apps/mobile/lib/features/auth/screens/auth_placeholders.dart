import '../../../core/mock/mock_screen_models.dart';
import '../../../core/routing/app_routes.dart';

class AuthMockScreens {
  static const welcome = MockScreenSpec(
    route: AppRoutes.authWelcome,
    title: 'Welcome',
    primaryState: 'Signed out visitor choosing phone or email login.',
    sections: [
      'Brand mark and short promise',
      'Phone login entry point',
      'Email login entry point',
      'Terms, privacy, and safety links',
    ],
    actions: [
      'Continue with phone',
      'Continue with email',
      'Open policy link',
    ],
  );

  static const phoneEntry = MockScreenSpec(
    route: AppRoutes.authPhone,
    title: 'Phone Entry',
    primaryState: 'Identifier capture before verification code request.',
    sections: [
      'Country code selector placeholder',
      'Phone number input',
      'Rate limit and delivery copy',
    ],
    actions: [
      'Request code',
      'Switch to email',
    ],
    errorState: 'Invalid number or temporary rate limit.',
  );

  static const emailEntry = MockScreenSpec(
    route: AppRoutes.authEmail,
    title: 'Email Entry',
    primaryState: 'Email capture before verification code request.',
    sections: [
      'Email input',
      'Delivery and spam-folder helper copy',
    ],
    actions: [
      'Request code',
      'Switch to phone',
    ],
    errorState: 'Invalid email or temporary rate limit.',
  );

  static const codeVerification = MockScreenSpec(
    route: AppRoutes.authCode,
    title: 'Verification Code',
    primaryState: 'OTP verification with retry timer.',
    sections: [
      'Masked destination summary',
      'Six digit code input',
      'Retry countdown',
    ],
    actions: [
      'Verify code',
      'Resend code',
      'Edit destination',
    ],
    errorState: 'Incorrect code, expired code, or too many attempts.',
  );

  static const all = <MockScreenSpec>[
    welcome,
    phoneEntry,
    emailEntry,
    codeVerification,
  ];
}
