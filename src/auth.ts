import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {loginSchema} from "./feature/user/schema/userSchema";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";
import {PrismaAdapter} from "@auth/prisma-adapter";
import type {Adapter} from "next-auth/adapters";
import authConfig from "./auth.config";

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  ...authConfig,
  providers: [
    ...authConfig.providers.filter((p) => p.id !== "credentials"),
    Credentials({
      credentials: {},
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) return null;

        const {email, password} = parsed.data;

        const user = await prisma.user.findUnique({
          where: {email},
        });

        if (!user || !user.password) return null;

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) return null;

        if (user.isActive === false) {
          throw new Error("USER_BANNED");
        }

        return {
          id: user.id,
          role: user.role ?? "USER",
          name: user.name ?? user.username,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  // callbacks: {
  //   async signIn({user}) {
  //     const dbUser = await prisma.user.findUnique({
  //       where: {email: user.email as string},
  //       select: {isActive: true},
  //     });

  //     if (dbUser && dbUser.isActive === false) {
  //       throw new Error("USER_BANNED");
  //     }
  //     return true;
  //   },
  // },
});
