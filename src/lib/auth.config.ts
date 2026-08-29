import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

const googleClientId = process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || "";
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || "";

const providers: any[] = [];

if (googleClientId && googleClientSecret) {
  providers.push(
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    })
  );
}

// Credentials provider placeholder for Edge config
providers.push(
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize() {
      // Handled in Node runtime auth.ts
      return null;
    }
  })
);

export const authConfig: NextAuthConfig = {
  providers,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "6489370129bcae98410293847291038471928374",
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as string;
        (session.user as any).id = token.id;
      }
      return session;
    }
  }
}
