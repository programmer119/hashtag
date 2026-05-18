# Wallet Feature

Owns diamond balance, transaction list, product catalog placeholder, purchase confirmation handoff, and profile unlock cost confirmation.

First screens:

- `WalletScreen`
- `DiamondStoreScreen`
- `UnlockConfirmationSheet`

State:

- `WalletController`
- `PurchaseController`
- `WalletRepository`

API:

- `GET /wallet`
- `GET /wallet/transactions`
- `GET /payments/products`
- `POST /payments/purchase/confirm`
