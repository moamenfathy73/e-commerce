import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from 'jwt-decode';


export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
       authorize:async function (credentials) {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),

          headers: { "Content-Type": "application/json" },
        });

        const payload = await res.json();

        console.log(payload);

        if (payload.message === "success") {
          const { id }: { id: string } = jwtDecode(payload.token);

          return {
            id,
            user: payload.user,
            token: payload.token,
          };
        }

        throw new Error(payload.message || "Login failed");
      },
    }),
  ],


  callbacks: {

    async session({ session , token }) {

      if (token ){

        session.user = token?.user
      }
        


      return session
    },
    async jwt({ token, user }) {


      if (user) {
        token.user = user?.user 
        token.token = user?.token
      }
      return token
    }
  }


};
