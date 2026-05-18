import '../../../core/mock/mock_app_data.dart';
import '../../../core/repositories/hashdate_repository.dart';

class ChatController {
  ChatController(HashdateRepository repository)
      : _messages = List<MockChatMessage>.of(repository.fetchMatchMessages());

  final List<MockChatMessage> _messages;

  List<MockChatMessage> get messages => List.unmodifiable(_messages);

  String sendMessage(String body) {
    final trimmed = body.trim();
    if (trimmed.isEmpty) return 'Message is empty.';
    _messages.add(MockChatMessage(sender: 'Me', body: trimmed));
    return 'Message sent.';
  }
}
