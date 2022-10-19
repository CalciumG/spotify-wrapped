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
    <div className="flex h-screen items-center justify-center bg-painful-blue">
      <button
        className="rounded-full border-2 border-black bg-green-600 p-4 px-12 text-2xl font-bold text-white hover:bg-green-500 active:bg-green-500"
        type="button"
        onClick={() => signIn("spotify", { callbackUrl: "/dashboard" })}
        disabled={session.status === "loading"}
      >
        Sign in
      </button>
    </div>
  );
};
