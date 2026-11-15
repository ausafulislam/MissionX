# Mission mentor and API

[Documentation index](README.md)

## Local first

`mentorAdvice()` in `src/game/engine/mentor.ts` supplies deterministic recommendations. `MentorPanel` requests optional advice only after a button action, posting to same-origin `/api/mentor`. No remote service is required for simulation or local advice. This is not a generic chat endpoint.

## Request and response

`POST /api/mentor`, JSON body:

```json
{"design":{"missionId":"moon","partIds":[],"rocketId":"swift","orbitId":"lunar"},"seed":5}
```

This is a schema illustration, not a launch-ready design. Use actual catalog IDs; duplicate/unknown IDs fail validation. Seed is optional, integer 0–4294967295. The server recomputes a result only for a ready design with a supplied seed; it does not trust a client-supplied result.

- Success: `{ "advice": "...", "source": "local" }` or source `ai`, with `Cache-Control: no-store`.
- 400: malformed JSON, absent/invalid design or invalid seed.
- 413: body above 12,000 bytes, including streamed enforcement rather than trusting Content-Length alone.
- Provider failure/timeout: local advice, not a broken game screen.

## Optional provider configuration

`MENTOR_API_KEY` stays server-only. `MENTOR_MODEL` defaults to `gpt-4o-mini`. The implemented destination is fixed to `https://api.openai.com/v1/chat/completions`; there is no configurable provider base URL. Request timeout is eight seconds, token limit 220, returned advice trimmed to 2,000 characters. Availability/model compatibility depends on the provider account.

The payload includes sanitized design, recomputed checks/result and fallback advice, **not commander identity or browser history**. Provider terms/data handling apply to those submitted fields. Rendering uses plain text. No rate limiter/authentication is implemented; deployments should consider abuse/cost controls before enabling a paid key.

`NEXT_PUBLIC_SITE_URL` is present in `.env.example` but unused; it is not needed for this API. Never use a NEXT_PUBLIC variable for secrets. Do not commit `.env.local` or keys. See [security](../SECURITY.md) and `tests/mentor-api.test.ts`.
