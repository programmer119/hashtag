import 'package:flutter_test/flutter_test.dart';
import 'package:hashdate_mobile/core/api/api_client.dart';
import 'package:hashdate_mobile/core/api/hashdate_api.dart';
import 'package:hashdate_mobile/core/mock/mock_hashdate_repository.dart';
import 'package:hashdate_mobile/core/repositories/hashdate_repository.dart';
import 'package:hashdate_mobile/core/repositories/rest_hashdate_repository.dart';
import 'package:hashdate_mobile/core/repositories/rest_repository_hydrator.dart';

import 'hashdate_api_test.dart';

void main() {
  test('MockHashdateRepository satisfies the repository contract', () {
    const HashdateRepository repository = MockHashdateRepository();

    expect(repository.restoreSession().nickname, 'Pablo');
    expect(repository.fetchDiscoveryDeck(), isNotEmpty);
    expect(repository.fetchMatchMessages(), isNotEmpty);
    expect(repository.fetchWalletEntries(), isNotEmpty);
    expect(repository.fetchSafetyCases(), isNotEmpty);
  });

  test('RestHashdateRepository keeps the typed API boundary attached', () {
    final api = HashdateApi(RecordingApiClient());
    final repository = RestHashdateRepository(api);

    expect(repository.api, same(api));
    expect(
      () => repository.restoreSession(),
      throwsA(isA<RestRepositoryNotHydrated>()),
    );
  });

  test('RestHashdateRepository maps hydrated preview payloads', () {
    final repository = RestHashdateRepository(
      HashdateApi(RecordingApiClient()),
      snapshot: const RestRepositorySnapshot(
        currentUser: {
          'user': {
            'nickname': 'Mina',
            'status': 'approved',
          },
          'onboardingState': 'approved',
        },
        swipeDeck: {
          'candidates': [
            {
              'nickname': 'Joon',
              'age': 34,
              'city': 'Bundang',
              'intro': 'Founder, tennis on Sundays.',
              'unlockCost': 10,
            },
          ],
        },
        walletLedger: {
          'entries': [
            {
              'reason': 'Profile detail unlock',
              'amount': -10,
            },
          ],
        },
        chatMessages: {
          'messages': [
            {
              'sender': 'match',
              'text': 'Nice to meet you here.',
            },
          ],
        },
        latestReport: {
          'reasonCode': 'inappropriate_content',
          'status': 'open',
        },
      ),
    );

    expect(repository.restoreSession().nickname, 'Mina');
    expect(repository.fetchDiscoveryDeck().single.alias, 'Joon');
    expect(repository.fetchWalletEntries().single.amount, -10);
    expect(
        repository.fetchMatchMessages().single.body, 'Nice to meet you here.');
    expect(repository.fetchSafetyCases().single.status, 'open');
  });

  test('RestRepositoryHydrator builds snapshot from typed API responses',
      () async {
    final client = RecordingApiClient(
      responses: const {
        '/v1/users/me': ApiResponse(
          statusCode: 200,
          body: {
            'user': {
              'nickname': 'Mina',
              'status': 'approved',
            },
            'onboardingState': 'approved',
          },
        ),
        '/v1/discovery/swipe-deck': ApiResponse(
          statusCode: 200,
          body: {
            'candidates': [
              {
                'nickname': 'Joon',
                'age': 34,
                'city': 'Bundang',
                'intro': 'Founder, tennis on Sundays.',
                'unlockCost': 10,
              },
            ],
          },
        ),
        '/v1/wallet/ledger': ApiResponse(
          statusCode: 200,
          body: {
            'entries': [
              {
                'reason': 'Profile detail unlock',
                'amount': -10,
              },
            ],
          },
        ),
        '/v1/chat/rooms/room_m_3001/messages': ApiResponse(
          statusCode: 200,
          body: {
            'messages': [
              {
                'sender': 'match',
                'text': 'Nice to meet you here.',
              },
            ],
          },
        ),
      },
    );

    final snapshot =
        await RestRepositoryHydrator(HashdateApi(client)).hydratePreview();
    final repository =
        RestHashdateRepository(HashdateApi(client), snapshot: snapshot);

    expect(client.calls.map((call) => call.path), [
      '/v1/users/me',
      '/v1/discovery/swipe-deck',
      '/v1/wallet/ledger',
      '/v1/chat/rooms/room_m_3001/messages',
    ]);
    expect(repository.restoreSession().nickname, 'Mina');
    expect(repository.fetchDiscoveryDeck().single.alias, 'Joon');
    expect(repository.fetchWalletEntries().single.amount, -10);
    expect(
        repository.fetchMatchMessages().single.body, 'Nice to meet you here.');
  });
}
