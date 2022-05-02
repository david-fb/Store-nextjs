import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import endPoints from '@services/api';
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const userData = {
          email: credentials.email,
          password: credentials.password,
        };
        try {
          const res = await axios.post(endPoints.auth.login, userData);
          const user = res.data;
          // If no error and we have user data, return it
          if (user) {
            return user;
          }
        } catch (error) {
          console.log(error.message);
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 15 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user: data }) {
      if (data?.user?.role !== 'customer') return false;
      return true;
    },
    async jwt({ token, user: data }) {
      // Persist the OAuth access_token to the token right after signin
      if (data) {
        try {
          token.user = data.user;
          token.accessToken = data.token;
        } catch (error) {
          console.log(error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      const { data: customer } = await axios(endPoints.users.getCustomer(token.user.id));
      session.user = customer;
      session.token = token.accessToken;
      return session;
    },
  },
});
