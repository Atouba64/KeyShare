# KeyShare architecture (draft)

## Goals

- Controlled sharing of credentials or access keys between trusted parties
- Audit trail of who accessed what and when
- No plaintext secrets in git

## Layers (sketch)

```
Client → API → Vault backend → Encrypted store
              ↘ Audit log
```

## Open questions

- Self-hosted vs cloud vault?
- End-to-end encryption vs server-side encryption?
- Integration with existing identity (OAuth, passkeys)?

Update this doc as the design solidifies.
