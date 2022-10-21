import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SpotifyOptionsProvider } from "context/spotifyOptionsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SessionProvider session={pageProps.session}>
        <SpotifyOptionsProvider>
          <Component {...pageProps} />
        </SpotifyOptionsProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default App;
