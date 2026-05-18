/// Route names for the Hashtag mobile MVP.
///
/// This file is dependency-free on purpose. After Flutter generation, map these
/// names into go_router route definitions.
class AppRoutes {
  static const splash = '/splash';

  static const authWelcome = '/auth/welcome';
  static const authPhone = '/auth/phone';
  static const authEmail = '/auth/email';
  static const authCode = '/auth/code';

  static const onboardingProfile = '/onboarding/profile';
  static const onboardingPhotos = '/onboarding/photos';
  static const onboardingTags = '/onboarding/tags';
  static const onboardingSubmit = '/onboarding/submit';
  static const reviewPending = '/review/pending';

  static const appRoot = '/app';
  static const discovery = '/app/discovery';
  static const matches = '/app/matches';
  static const wallet = '/app/wallet';
  static const settings = '/app/settings';

  static const profileDetail = '/profile/:userId';
  static const matchDetail = '/matches/:matchId';
  static const chatThread = '/chat/:threadId';
  static const walletStore = '/wallet/store';
  static const walletUnlock = '/wallet/unlock';
  static const settingsAccount = '/settings/account';
  static const settingsSafety = '/settings/safety';
  static const reportUser = '/report/user/:userId';
  static const reportMessage = '/report/message/:messageId';
  static const blockUser = '/block/user/:userId';
  static const blockedUsers = '/settings/safety/blocked-users';
}
