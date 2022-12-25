import { LiveList } from "@liveblocks/client";
import Head from "next/head";
import { Avatar } from "../components/avatar";
import avatarStyles from "../components/avatar.module.css";
import globalStyles from "../styles/global.module.css";
import { Die } from "../components/die";
import {
  getRoll,
  getRollerName,
  RoomProvider,
  useMutation,
  useOthers,
  useSelf,
  useStorage,
  useUpdateMyPresence,
} from "../src/store";
import { GetServerSideProps } from "next";
import { ClientSideSuspense } from "@liveblocks/react";
import { useState } from "react";
import { Invite } from "../components/invite";
import { useRouter } from "next/router";

function Main() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const others = useOthers();
  const self = useSelf();
  const rolls = useStorage(({ rolls }) => rolls);
  const roll = useMutation(
    ({ storage }) => {
      storage.set(
        "rolls",
        new LiveList([
          getRoll(),
          getRoll(),
          getRoll(),
          getRoll(),
          getRoll(),
          getRoll(),
        ])
      );
      storage.set("roller", self.presence.id);

      setTimeout(() => {
        storage.set("roller", null);
      }, 3000);
    },
    [self.presence.name]
  );
  const roller = useStorage(({ roller }) => roller);
  const updateMyPresence = useUpdateMyPresence();

  return (
    <>
      <header className={globalStyles.header}>
        <div
          className={`${globalStyles.content} ${globalStyles.hFlex}`}
          style={{
            ["--justify" as any]: "flex-end",
          }}
        >
          <button onClick={() => setIsInviteOpen(true)}>Invite</button>
        </div>
      </header>
      <main className={`${globalStyles.main} ${globalStyles.vFlex}`}>
        {/* <form
        onSubmit={(event) => {
          event.preventDefault();

          const data = new FormData(event.currentTarget);
          const name = data.get("name");

          if (typeof name !== "string") {
            return;
          }

          updateMyPresence({ name });
        }}
      >
        <label>
          Name
          <input name="name"></input>
        </label>
      </form> */}
        <div
          className={globalStyles.vFlex}
          style={{
            ["--gap" as any]: "var(--size-2)",
          }}
        >
          <ul className={avatarStyles.avatarList}>
            <li>
              <Avatar
                name={self.presence.name}
                isRolling={self.presence.id === roller}
              ></Avatar>
            </li>
            {others.map((other) => {
              return (
                <li key={other.id}>
                  <Avatar
                    name={other.presence.name}
                    isRolling={other.presence.id === roller}
                  ></Avatar>
                </li>
              );
            })}
          </ul>
          <div className={globalStyles.hFlex}>
            <p>
              {!roller ? (
                `No one is rolling`
              ) : (
                <span>
                  <strong>{getRollerName(roller, self, others)}</strong> is
                  rolling{" "}
                </span>
              )}
            </p>
          </div>
        </div>
        <div
          className={globalStyles.hFlex}
          style={{
            ["--justify" as any]: "center",
          }}
        >
          {rolls.map((roll, i) => {
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                }}
              >
                <Die
                  faceColor={`var(--die-${i + 1})`}
                  outlineColor="black"
                  dotColor="black"
                  xRand={roll[0]}
                  yRand={roll[1]}
                />
              </div>
            );
          })}
        </div>
        <div className={globalStyles.hFlex}>
          <button
            className={globalStyles.rollButton}
            disabled={!!roller}
            onClick={() => {
              roll();
            }}
          >
            Roll
          </button>
        </div>
      </main>
      {isInviteOpen ? (
        <Invite
          onClose={() => {
            setIsInviteOpen(false);
          }}
        />
      ) : null}
    </>
  );
}

type HomeProps = {
  name: string;
  roomId: string;
};

export default function Home(props: HomeProps) {
  const router = useRouter();
  const { roomId } = router.query;

  if (typeof roomId !== "string") {
    return null;
  }

  return (
    <>
      <Head>
        <title>Qwixx Roller</title>
        <meta name="description" content="Qwixx Roller" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoomProvider
        id={roomId}
        initialPresence={{
          name: props.name,
          id: Math.floor(Math.random() * 1000),
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
          {() => <Main />}
        </ClientSideSuspense>
      </RoomProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  let { roomId, name } = context.query;

  if (typeof roomId !== "string") {
    roomId = "";
  }
  if (typeof name !== "string") {
    name = "Unknown";
  }

  return {
    props: {
      roomId,
      name,
    },
  };
};
