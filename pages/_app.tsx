import "../styles/global.css";
import type { AppProps } from "next/app";
import { getRoll, RoomProvider } from "../src/store";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveList } from "@liveblocks/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RoomProvider
      id="my-room-id"
      initialPresence={{
        name: "Unknown",
      }}
      initialStorage={{
        rolls: new LiveList([
          getRoll(),
          getRoll(),
          getRoll(),
          getRoll(),
          getRoll(),
          getRoll(),
        ]),
        roller: null,
      }}
    >
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => <Component {...pageProps} />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
