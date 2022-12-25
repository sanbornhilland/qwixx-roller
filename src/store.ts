import {
  BaseUserMeta,
  createClient,
  LiveList,
  Others,
  User,
} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVE_BLOCKS_KEY,
});

export type Presence = {
  name: string;
  id: number;
  avatarColor: string;
};

export type Storage = {
  rolls: LiveList<Roll>;
  roller: number | null;
};

export function rand(max: number, min: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandom(max = 24, min = 1) {
  return (Math.floor(Math.random() * (max - min)) + min) * 90;
}

export type Roll = [number, number];

export function getRoll(): Roll {
  return [getRandom(), getRandom()];
}

export function getRandomHsl() {
  return `${rand(365, 0)} ${rand(100, 0)}% ${rand(100, 0)}%`;
}

export function getRollerName(
  id: number,
  self: User<Presence, BaseUserMeta>,
  others: Others<Presence, BaseUserMeta>
) {
  return (
    [self.presence, ...others.map((other) => other.presence)].find(
      (presence) => presence.id === id
    )?.name ?? null
  );
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
