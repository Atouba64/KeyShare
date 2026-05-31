# KeyShare Web App

## Live data setup

KeyShare now uses a real PostgreSQL database and JWT session auth. No placeholder marketplace or dashboard data.

### 1. Create a free PostgreSQL database

Recommended: [Neon](https://neon.tech) (free tier)

1. Create a project
2. Copy the connection string
3. Add it to `web/.env` as `DATABASE_URL`

### 2. Configure environment variables

Copy `web/.env.example` to `web/.env` and set:

```bash
DATABASE_URL="postgresql://..."
JWT_SECRET="your-long-random-secret"
ADMIN_EMAIL="your@email.com"   # optional — auto-admin on signup
```

For **Netlify**, add the same variables in:
Site settings → Environment variables

### 3. Initialize the database

```bash
cd web
npm install
npm run db:push
npm run dev
```

### 4. User flow (real data)

1. **Sign up** at `/register` → account saved to PostgreSQL
2. **Pick a role** at `/onboarding` → Renter, Provider, or Both
3. **Providers** publish listings at `/list-account` → appear on `/marketplace`
4. **Renters** click **Rent Access** → creates a real rental + escrow transaction
5. **Dashboard** shows live stats, active rentals, and your listings
6. **Admin** (`ADMIN_EMAIL` user) manages users at `/admin`

### Roles

| Role | Can rent | Can list |
|------|----------|----------|
| RENTER | Yes | No |
| PROVIDER | No | Yes |
| BOTH | Yes | Yes |
| ADMIN | Yes | Yes + `/admin` |

### Notes

- Stripe payouts are tracked in escrow but not yet connected — rentals and transactions are real in the DB
- Session bridge launch is the next infrastructure milestone
- Run `npm run db:studio` to inspect live data locally
