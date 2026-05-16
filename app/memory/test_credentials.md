"# Test Credentials (YesWeCode Platform)

All app users live in MongoDB collection `users`. Auth supports both:
1. JWT email/password (`/api/auth/login`)
2. Emergent Google OAuth (`/api/auth/session`)

## Admin
- Email: `admin@yeswecode.org`
- Password: `admin@2026`
- Role: `admin`

## Demo Instructor
- Email: `instructor@yeswecode.org`
- Password: `Instructor@2026`
- Role: `instructor`
- Display name: Maya Chen

Secondary instructor: 
- Email: `ravi.instructor@yeswecode.org`
- Password: `Student@2026`
- Role: `student`

## Key auth endpoints
- `POST /api/auth/register` (email, password, name, role)
- `POST /api/auth/login`
- `GET  /api/auth/me`
- `POST /api/auth/logout`
- `POST /api/auth/session` (Emergent Google OAuth — body: `{session_id}`)

Cookies used: `access_token` (JWT, 7d), `session_token` (Emergent, 7d). Both are httpOnly, Secure, SameSite=None.
"
