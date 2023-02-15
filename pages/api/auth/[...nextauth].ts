import NextAuth, { Session } from "next-auth";
import CredentialsProvider, {CredentialsConfig} from "next-auth/providers/credentials";

const credentialsProviderOption: CredentialsConfig<{}> = {
    type: "credentials",
    id: "login-credentials",
    name: "login-credentials",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials: Record<string, unknown> | undefined) { //type authorize
      if (credentials && credentials.username === "admin" 
            && credentials.password === "admin") {
        return {
          id: "1",
          login: "admin",
          name: "관리자",
          email: "",
          image: "",
        };
      }
  
      return null;
    },
  };

  export default NextAuth({ //모듈화 하고자 하는 개체
   /* pages: {
      signIn: "/login",
      verifyRequest: "/login?verify=1",
      error: "/login",
    }, */
    providers: [
      CredentialsProvider(credentialsProviderOption),
    //  GoogleProvider(googleProviderOption),
    //  GithubProvider(githubProviderOption),
    ],
    callbacks: {
        
      jwt({ token, user }) {
        if (user) {
          token.id = (user as Session["user"]).id;
          token.login = (user as Session["user"]).login;
        }
        return token;
      },
      session({ session, token }) {
        session.user = { ...session.user, id: token.id as string, login: token.login as string };
        return session;
      },
    },
  });