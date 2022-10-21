import { useQueries } from "@tanstack/react-query";
import { useSpotifyOptionsContext } from "context/spotifyOptionsContext";
import useSpotify from "hooks/useSpotify";
import { useMemo } from "react";

export const useTopArtists = () => {
  const spotifyApi = useSpotify();
  const { period } = useSpotifyOptionsContext();

  const results = useQueries({
    queries: [
      {
        queryKey: ["topArtists", "short_term"],
        queryFn: async () => {
          const res = await spotifyApi.getMyTopArtists({
            time_range: "short_term",
          });
          return {
            time: "short_term",
            ...res.body,
          };
        },
      },
      {
        queryKey: ["topArtists", "medium_term"],
        queryFn: async () => {
          const res = await spotifyApi.getMyTopArtists({
            time_range: "medium_term",
          });
          return {
            time: "medium_term",
            ...res.body,
          };
        },
      },
      {
        queryKey: ["topArtists", "long_term"],
        queryFn: async () => {
          const res = await spotifyApi.getMyTopArtists({
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

  const resultInPeriod = results.find(
    (result) => result.data?.time === period.timeframe
  )?.data;

  return useMemo(
    () => ({
      isLoading,
      resultInPeriod,
    }),
    [isLoading, resultInPeriod]
  );
};
