import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hashdate_mobile/app/hashdate_mock_app.dart';

void main() {
  Future<void> pumpAndLogin(WidgetTester tester) async {
    await tester.binding.setSurfaceSize(const Size(900, 1100));
    await tester.pumpWidget(const HashdateMockApp());

    expect(find.text('회원 가입하기'), findsOneWidget);
    await tester.tap(find.text('이미 계정이 있어요'));
    await tester.pumpAndSettle();

    expect(find.text('로그인'), findsOneWidget);
    expect(find.widgetWithText(TextField, 'test1'), findsNWidgets(2));
    await tester.tap(find.text('다음'));
    await tester.pumpAndSettle();
  }

  testWidgets('Hashdate auth gate supports test1 login and signup conditions',
      (tester) async {
    await tester.binding.setSurfaceSize(const Size(900, 1300));
    await tester.pumpWidget(const HashdateMockApp());

    expect(find.text('회원 가입하기'), findsOneWidget);
    await tester.tap(find.text('회원 가입하기'));
    await tester.pumpAndSettle();

    expect(find.text('남성 가입조건 (택 1)'), findsOneWidget);
    expect(find.text('안정된 회사에 재직중인 남성'), findsOneWidget);
    expect(find.text('전문직에 종사하는 남성'), findsOneWidget);

    await tester.tap(find.text('여성'));
    await tester.pumpAndSettle();

    expect(find.text('여성 가입조건 (택 1)'), findsOneWidget);
    expect(find.text('프로필을 입력한 여성'), findsOneWidget);

    await tester.tap(find.text('가입하기'));
    await tester.pumpAndSettle();

    expect(find.text('추천'), findsOneWidget);
    expect(find.text('Pablo'), findsOneWidget);
  });

  testWidgets('Hashdate start screen defaults to Korean and offers English',
      (tester) async {
    await tester.binding.setSurfaceSize(const Size(900, 1100));
    await tester.pumpWidget(const HashdateMockApp());

    expect(find.text('한'), findsOneWidget);
    expect(find.text('EN'), findsOneWidget);
    expect(find.text('회원 가입하기'), findsOneWidget);

    await tester.tap(find.text('EN'));
    await tester.pumpAndSettle();

    expect(find.text('Create account'), findsOneWidget);
  });

  testWidgets('Hashdate menu lists benchmark mock screens', (tester) async {
    await pumpAndLogin(tester);

    await tester.tap(find.byIcon(Icons.menu));
    await tester.pumpAndSettle();

    expect(find.text('전체 메뉴'), findsOneWidget);
    expect(find.text('가입/검증'), findsOneWidget);
    expect(find.text('매칭'), findsWidgets);
    await tester.drag(find.byType(ListView), const Offset(0, -700));
    await tester.pumpAndSettle();
    expect(find.text('고객센터'), findsOneWidget);
  });

  testWidgets('Hashdate mock app opens discovery and unlocks once',
      (tester) async {
    await pumpAndLogin(tester);

    expect(find.text('Hashdate'), findsOneWidget);
    expect(find.text('추천'), findsOneWidget);
    expect(find.text('Pablo'), findsOneWidget);
    expect(find.text('프로필 입력 준비'), findsOneWidget);
    expect(find.text('40 DIA'), findsOneWidget);

    await tester.tap(find.text('제출'));
    await tester.pumpAndSettle();

    expect(find.text('프로필 심사 제출 완료'), findsOneWidget);

    await tester.ensureVisible(find.text('10 다이아로 열람'));
    await tester.tap(find.text('10 다이아로 열람'));
    await tester.pumpAndSettle();

    expect(find.text('30 DIA'), findsOneWidget);
    expect(find.text('열람 완료'), findsOneWidget);
  });

  testWidgets('Hashdate mock app switches to wallet', (tester) async {
    await pumpAndLogin(tester);

    await tester.tap(find.byIcon(Icons.diamond_outlined));
    await tester.pumpAndSettle();

    expect(find.text('지갑'), findsWidgets);
    expect(find.text('현재 보유 다이아'), findsOneWidget);

    await tester.tap(find.text('다이아 20개 충전'));
    await tester.pumpAndSettle();

    expect(find.text('60 DIA'), findsWidgets);
  });

  testWidgets('Hashdate mock app sends chat message', (tester) async {
    await pumpAndLogin(tester);

    await tester.tap(find.byIcon(Icons.favorite_border));
    await tester.pumpAndSettle();

    await tester.tap(find.text('메시지 보내기'));
    await tester.pumpAndSettle();

    expect(find.text('Can we talk after work?'), findsOneWidget);
  });

  testWidgets('Hashdate mock app submits safety report', (tester) async {
    await pumpAndLogin(tester);

    await tester.tap(find.byIcon(Icons.shield_outlined));
    await tester.pumpAndSettle();

    expect(find.text('Spam or solicitation'), findsOneWidget);
    await tester.tap(find.text('선택 회원 신고'));
    await tester.pumpAndSettle();

    expect(find.text('신고가 관리자 검토 대기열에 등록되었습니다.'), findsOneWidget);
    expect(find.text('신고 접수됨'), findsOneWidget);
  });
}
