import useSpotify from "hooks/useSpotify";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { ISession } from "types/ISession";

export const Login = () => {
  const session = useSession() as unknown as ISession;
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (!session.data) return;
    spotifyApi.setAccessToken(session.data.user.accessToken);
  }, [session.data]);

  return (
    <div>
      <p>
        {/* {session.status === "authenticated" ? (
          <button type="button" onClick={() => signOut()}>
            Sign out {session.data.user?.email}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => signIn("spotify", { callbackUrl: "/" })}
            disabled={session.status === "loading"}
          >
            Sign in
          </button>
        )} */}
        <button
          type="button"
          onClick={() => signIn("spotify", { callbackUrl: "/dashboard" })}
          disabled={session.status === "loading"}
        >
          Sign in
        </button>
      </p>
    </div>
  );
};
