import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { apiService } from '@/lib/api/ApiService';

const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const {
          email,
          password,
          fcmToken,
        } = credentials as { email: string, password: string, fcmToken?: string };

        const { message, value } = await apiService.authenticate({ email, password, fcmToken });
        if (value) {
          return {
            state: 'success',
            id: email,
            token: value.token,
          };
        }
        throw new Error(message);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line no-param-reassign
        token.accessToken = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      // eslint-disable-next-line no-param-reassign
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
