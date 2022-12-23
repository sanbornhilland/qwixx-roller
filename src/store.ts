import { createClient, LiveList } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVE_BLOCKS_KEY,
});

export type Presence = {
  name: string;
};

export type Storage = {
  rolls: LiveList<Roll>;
  roller: string | null;
};

export function getRandom(max = 24, min = 1) {
  return (Math.floor(Math.random() * (max - min)) + min) * 90;
}

export type Roll = [number, number];

export function getRoll(): Roll {
  return [getRandom(), getRandom()];
}

export const {
  suspense: {
    RoomProvider,
    useOthers,
    useSelf,
    useUpdateMyPresence,
    useStorage,
    useMutation,
  },
} = createRoomContext<Presence, Storage>(client);
