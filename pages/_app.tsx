import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SpotifyOptionsProvider } from "context/spotifyOptionsContext";

function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <SpotifyOptionsProvider>
        <Component {...pageProps} />
      </SpotifyOptionsProvider>
    </SessionProvider>
  );
}

export default App;
