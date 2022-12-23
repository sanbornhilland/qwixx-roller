import { LiveList } from "@liveblocks/client";
import Head from "next/head";
// import OpenProps from "open-props";
import { Die } from "../components/die";
import {
  getRoll,
  useMutation,
  useOthers,
  useSelf,
  useStorage,
  useUpdateMyPresence,
} from "../src/store";

export default function Home() {
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
      storage.set("roller", self.presence.name);

      setTimeout(() => {
        storage.set("roller", null);
      }, 5000);
    },
    [self.presence.name]
  );
  const roller = useStorage(({ roller }) => roller);
  const updateMyPresence = useUpdateMyPresence();

  // const colors = [
  //   "white",
  //   "white",
  //   OpenProps["--red-9"],
  //   OpenProps["--yellow-4"],
  //   OpenProps["--green-9"],
  //   OpenProps["--blue-9"],
  // ];

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Qwixx Roller" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
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
      </form>
      <h2>Users</h2>
      <ul>
        <li>{self.presence.name}</li>
        {others.map((other) => {
          return <li key={other.id}>{other.presence.name}</li>;
        })}
      </ul>
      <h2>Data</h2>
      <p>{roller ? roller : "No one"} is rolling</p>
      <button
        onClick={() => {
          roll();
        }}
      >
        Roll
      </button>
      <ul>
        {rolls.map((roll, i) => {
          return (
            <li key={i}>
              {roll[0]}, {roll[1]}
            </li>
          );
        })}
      </ul>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
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
    </>
  );
}
