import { useQueries } from "@tanstack/react-query";
import { useSpotifyOptionsContext } from "context/spotifyOptionsContext";
import useSpotify from "hooks/useSpotify";
import { useMemo } from "react";

import { TopListProps } from "components/ListWithImage";

export const useTopSongs = () => {
  const spotifyApi = useSpotify();
  const { period } = useSpotifyOptionsContext();

  const results = useQueries({
    queries: [
      {
        queryKey: ["topSongs", "short_term"],
        queryFn: async () => {
          const res = await spotifyApi.getMyTopTracks({
            time_range: "short_term",
          });
          return {
            time: "short_term",
            ...res.body,
          };
        },
      },
      {
        queryKey: ["topSongs", "medium_term"],
        queryFn: async () => {
          const res = await spotifyApi.getMyTopTracks({
            time_range: "medium_term",
          });
          return {
            time: "medium_term",
            ...res.body,
          };
        },
      },
      {
        queryKey: ["topSongs", "long_term"],
        queryFn: async () => {
          const res = await spotifyApi.getMyTopTracks({
            time_range: "long_term",
          });
          return {
            time: "long_term",
            ...res.body,
          };
        },
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);

  const result = results.find(
    (result) => result.data?.time === period.timeframe
  )?.data;

  let topSongsInPeriod: TopListProps = {
    title: "Top Songs",
    data: result?.items.map((item: any) => {
      return {
        imageUrl: item.album.images[2].url,
        name: item.name,
      };
    }),
  };

  return useMemo(
    () => ({
      isLoading,
      topSongsInPeriod,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, result]
  );
};
