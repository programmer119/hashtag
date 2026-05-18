class MockProfile {
  const MockProfile({
    required this.alias,
    required this.age,
    required this.region,
    required this.intent,
    required this.tags,
    required this.lockedDetail,
  });

  final String alias;
  final int age;
  final String region;
  final String intent;
  final List<String> tags;
  final String lockedDetail;
}

class MockChatMessage {
  const MockChatMessage({
    required this.sender,
    required this.body,
  });

  final String sender;
  final String body;
}

class MockWalletEntry {
  const MockWalletEntry({
    required this.label,
    required this.amount,
  });

  final String label;
  final int amount;
}

class MockSession {
  const MockSession({
    required this.nickname,
    required this.reviewStatus,
    required this.verificationLevel,
  });

  final String nickname;
  final String reviewStatus;
  final String verificationLevel;
}

class MockSafetyCase {
  const MockSafetyCase({
    required this.reason,
    required this.status,
  });

  final String reason;
  final String status;
}

class MockAppData {
  static const session = MockSession(
    nickname: 'Pablo',
    reviewStatus: 'Approved',
    verificationLevel: 'Document verified',
  );

  static const profiles = <MockProfile>[
    MockProfile(
      alias: 'Seoul Aurora',
      age: 31,
      region: 'Gangnam',
      intent: 'Serious dating',
      tags: ['founder', 'wine', 'pilates'],
      lockedDetail: 'Verified income and lifestyle documents are hidden.',
    ),
    MockProfile(
      alias: 'Han River Note',
      age: 29,
      region: 'Yeouido',
      intent: 'Slow conversation',
      tags: ['finance', 'running', 'jazz'],
      lockedDetail: 'Premium profile facts unlock for 10 diamonds.',
    ),
    MockProfile(
      alias: 'Studio Blue',
      age: 34,
      region: 'Seongsu',
      intent: 'Marriage-minded',
      tags: ['design', 'travel', 'coffee'],
      lockedDetail: 'Photo and proof status sync across all channels.',
    ),
  ];

  static const messages = <MockChatMessage>[
    MockChatMessage(
        sender: 'Seoul Aurora', body: 'Thanks for the thoughtful like.'),
    MockChatMessage(sender: 'Me', body: 'Your travel tag caught my eye.'),
    MockChatMessage(
        sender: 'Seoul Aurora', body: 'Then ask me about Lisbon first.'),
  ];

  static const walletEntries = <MockWalletEntry>[
    MockWalletEntry(label: 'Profile unlock', amount: -10),
    MockWalletEntry(label: 'Welcome grant', amount: 30),
    MockWalletEntry(label: 'Admin test grant', amount: 20),
  ];

  static const safetyCases = <MockSafetyCase>[
    MockSafetyCase(reason: 'Spam or solicitation', status: 'Ready to submit'),
    MockSafetyCase(reason: 'Profile mismatch', status: 'Operator review mock'),
  ];
}
