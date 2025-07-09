import 'express-session';

declare module 'express-session' {
  interface SessionData {
    spotify_auth_state?: string;
  }
}
