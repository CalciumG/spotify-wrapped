import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const refreshToken = async (token: any) => {
  const res = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`
      ).toString("base64")}`,
    },
    body: `grant_type=refresh_token&refresh_token=${token.refreshToken}`,
  });
  const data = await res.json();
  console.log("refreshed");

  return {
    ...token,
    accessToken: data.access_token,
  };
};

const scope =
  "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative playlist-modify-public playlist-modify-private";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID || "",
      clientSecret: process.env.SPOTIFY_SECRET || "",
      authorization: {
        params: {
          scope,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.id = account.id;
        token.expiresAt = account.expires_at;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;

        return token;
      }

      if (token) {
        if (Math.floor(Date.now()) >= token.expiresAt * 1000) {
          const refreshedToken = await refreshToken(token);

          return refreshedToken;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token;
      // @ts-ignore
      session.id = token.sub;
      // @ts-ignore
      session.accessToken = token.accessToken;
      // @ts-ignore
      session.error = token.error;
      return session;
    },
  },
});
