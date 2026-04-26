# Portal <-> API integration notes

## Cleaner integration pattern
- Portal should call the API for review actions.
- Portal should not make authorization decisions by itself.
- API should validate whether a reviewer can approve, reject, or comment.

## Practical next code step
- add an `Authorization` header from a server-side session bridge
- call `/auth/me` on load for role-aware portal rendering
- centralize API fetch wrappers for portal review actions
