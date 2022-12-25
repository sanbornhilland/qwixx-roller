import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import ShortUniqueId from "short-unique-id";
import globalStyles from "../styles/global.module.css";

const uid = new ShortUniqueId({ length: 4 });
uid.setDictionary("alpha_upper");

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  return (
    <>
      <Head>
        <title>Qwixx Roller</title>
        <meta name="description" content="Qwixx Roller" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${globalStyles.main} ${globalStyles.vFlex}`}>
        <div className={globalStyles.hFlex}>
          <form
            className={globalStyles.vFlex}
            onSubmit={(event) => {
              event.preventDefault();
              router.push(`/${uid()}?name=${name}`);
            }}
          >
            <label>
              Name
              <input
                value={name}
                onInput={(event) => {
                  event.preventDefault();

                  setName(event.currentTarget.value.trim());
                }}
              ></input>
            </label>
            <button disabled={name === ""}>Create Game</button>
          </form>
        </div>
      </main>
    </>
  );
}
