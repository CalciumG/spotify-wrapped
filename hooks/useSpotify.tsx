import SpotifyApi from "lib/spotify";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function useSpotify() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      SpotifyApi.setAccessToken((session.user as any).accessToken);
    }
  }, [session]);

  return SpotifyApi;
}

export default useSpotify;
