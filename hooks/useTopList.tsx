import { TopListProps } from "components/ListWithImage";
import { useSpotifyOptionsContext } from "context/spotifyOptionsContext";
import { useSession } from "next-auth/react";
import { useState, useMemo } from "react";
import { ISession } from "types/ISession";
import useSpotify from "./useSpotify";

export const useTopList = () => {
  const { period } = useSpotifyOptionsContext();
  const [topArtists, setTopArtists] = useState<TopListProps>();
  const [topTracks, setTopTracks] = useState<TopListProps>();
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession() as unknown as ISession;
  const spotifyApi = useSpotify();

  const fetchAritsts = async () => {
    const result = await spotifyApi.getMyTopArtists({
      time_range: period.timeframe,
    });
    let trimmed: TopListProps = {
      title: "Top Artists",
      data: result.body.items.map((item: any) => {
        return {
          imageUrl: item.images[2].url,
          name: item.name,
        };
      }),
    };
    setTopArtists(trimmed);
  };

  const fetchTracks = async () => {
    const result = await spotifyApi.getMyTopTracks({
      time_range: period.timeframe,
    });
    let trimmed: TopListProps = {
      title: "Top Tracks",
      data: result.body.items.map((item) => {
        return {
          imageUrl: item.album.images[0].url,
          name: item.name,
        };
      }),
    };
    setTopTracks(trimmed);
  };

  useMemo(() => {
    if (!session.data) return;
    spotifyApi.setAccessToken(session.data.user.accessToken);
    fetchAritsts().catch((err) => console.log(err));
    fetchTracks()
      .catch((err) => console.log(err))
      .then(() => setIsLoading(false));
  }, [session.data, period]);

  return { topArtists, topTracks, isLoading };
};
