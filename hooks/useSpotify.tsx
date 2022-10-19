import SpotifyApi from "lib/spotify";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

function useSpotify() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      if (session.error === "Refresh failed") {
        signIn("spotify", { callbackUrl: "/dashboard" });
      }

      SpotifyApi.setAccessToken((session.user as any).accessToken);
    }
  }, [session]);

  return SpotifyApi;
}

export default useSpotify;
