import { Account } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: Account.accessToken
  }

  interface User {
    state: string
    id: string
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: Account.accessToken
  }
}
