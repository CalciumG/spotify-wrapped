import { TimePeriodSelectProps } from "components/TimePeriodSelect";
import { createContext, useContext, useState } from "react";
import { ItemsOf } from "utils/utilityTypes";

export const timeRange = ["short_term", "medium_term", "long_term"] as const;
export type TimeRange = ItemsOf<typeof timeRange>;

export type SpotifyOptionsContextProps = {
  period: TimePeriodSelectProps;
  setPeriod: (period: TimePeriodSelectProps) => void;
};

export type SpotifyOptionsProviderProps = {
  children: React.ReactNode;
};

export const SpotifyOptionsContext = createContext<
  SpotifyOptionsContextProps | undefined
>(undefined);

export const SpotifyOptionsProvider: React.FC<SpotifyOptionsProviderProps> = ({
  children,
}) => {
  const [period, setPeriod] = useState<TimePeriodSelectProps>({
    label: "Last 4 weeks",
    timeframe: "short_term",
  });

  return (
    <SpotifyOptionsContext.Provider value={{ period, setPeriod }}>
      {children}
    </SpotifyOptionsContext.Provider>
  );
};

export const useSpotifyOptionsContext = () => {
  const context = useContext(SpotifyOptionsContext);
  if (context === undefined) {
    throw new Error(
      "useSpotifyOptions must be used within a SpotifyOptionsProvider"
    );
  }
  return context;
};
