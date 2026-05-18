import '../../../core/mock/mock_screen_models.dart';
import '../../../core/routing/app_routes.dart';

class ChatMockScreens {
  static const thread = MockScreenSpec(
    route: AppRoutes.chatThread,
    title: 'Chat Thread',
    primaryState: 'Message list for an approved mutual match.',
    sections: [
      'Match header with profile shortcut',
      'Paginated message history placeholder',
      'Delivery and read state labels',
      'Composer',
      'Report and block shortcuts',
    ],
    actions: [
      'Send message',
      'Retry failed message',
      'Open profile',
      'Report message',
      'Block user',
    ],
    emptyState: 'No messages yet.',
    errorState: 'Could not send or refresh messages.',
  );

  static const all = <MockScreenSpec>[
    thread,
  ];
}
