import {NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Credentials({
      credentials: {},
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.picture = user.image;
        token.name = user.name;
      }
      return token;
    },
    async session({session, token}) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token?.role as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
