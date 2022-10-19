import { TopListProps } from "components/ListWithImage";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ISession } from "types/ISession";
import { ItemsOf } from "utils/utilityTypes";
import useSpotify from "./useSpotify";

export const timeRange = ["short_term", "medium_term", "long_term"] as const;
export type TimeRange = ItemsOf<typeof timeRange>;

export const useTopArtists = (timeRange: TimeRange) => {
  const [isTopAristListLoaded, setTopAristListLoaded] = useState(false);
  const [topArtists, setTopArtists] = useState<TopListProps>();
  const [isTopTracksListLoaded, setTopTracksListLoaded] = useState(false);
  const [topTracks, setTopTracks] = useState<TopListProps>();
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession() as unknown as ISession;
  const spotifyApi = useSpotify();

  const fetchAritsts = async () => {
    const result = await spotifyApi.getMyTopArtists({
      time_range: "long_term",
    });
    let trimmed: TopListProps = {
      title: "Top Artists",
      data: result.body.items.map((item) => {
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
      time_range: "long_term",
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

  useEffect(() => {
    if (!session.data) return;
    setTopAristListLoaded(false);
    spotifyApi.setAccessToken(session.data.user.accessToken);
    fetchAritsts()
      .then(() => setTopAristListLoaded(true))
      .catch((err) => console.log(err));
    fetchTracks()
      .then(() => setTopTracksListLoaded(true))
      .catch((err) => console.log(err));
    if (!isTopAristListLoaded && !isTopTracksListLoaded) {
      setIsLoading(true);
    }
  }, [session.data]);

  return { topArtists, topTracks, isLoading };
};
