import { TopListProps } from "components/ListWithImage";
import { useSpotifyOptionsContext } from "context/spotifyOptionsContext";
import { useSession } from "next-auth/react";
import { useState, useMemo, useEffect } from "react";
import { ISession } from "types/ISession";
import useSpotify from "./useSpotify";
import Router from "next/router";

export const useTopList = () => {
  const { period } = useSpotifyOptionsContext();
  const [topArtists, setTopArtists] = useState<TopListProps>();
  const [topTracks, setTopTracks] = useState<TopListProps>();
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession() as unknown as ISession;
  const spotifyApi = useSpotify();
  const [error, setError] = useState(false);
  // TODO store all periods to avoid unnecessary fetches

  useEffect(() => {
    if (window.location.href.includes("error=OAuthCallback")) {
      console.log("have I been hit");
      setError(true);
      Router.push("/error");
    }
  }, []);

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
      title: "Top Songs",
      data: result.body.items.map((item: any) => {
        return {
          imageUrl: item.album.images[2].url,
          name: item.name,
        };
      }),
    };
    setTopTracks(trimmed);
  };

  useMemo(() => {
    if (!session.data) return;
    spotifyApi.setAccessToken(session.data.user.accessToken);
    if (!error)
      Promise.all([fetchAritsts(), fetchTracks()]).then(() => {
        setIsLoading(false);
      });
  }, [session.data, period]);

  return { topArtists, topTracks, isLoading };
};
