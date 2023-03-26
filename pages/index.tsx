import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import ClickCount from "../components/ClickCount";
import styles from "../styles/home.module.css";

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  );
}

async function getServerSideProps() {
  const data = JSON.stringify({ time: new Date() });
  return { props: { data } };
}

function Home({ data }: { data: { time: string } }) {
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    fetch("/api/time")
      .then((res) => res.json())
      .then((json) => setTime(new Date(json.time)));
  }, []);

  const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    setCount((v) => v + 1);
  }, [setCount]);

  useEffect(() => {
    const r = setInterval(() => {
      increment();
    }, 1000);

    return () => {
      clearInterval(r);
    };
  }, [increment]);

  return (
    <main className={styles.main}>
      <h1>初めてのプログラミング！</h1>
      <p>
        time is
        {time &&
          `The time is ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}
      </p>
      <p>
        Fast Refresh is a Next.js feature that gives you instantaneous feedback
        on edits made to your React components, without ever losing component
        state.
      </p>
      <hr className={styles.hr} />
      <div>
        <p>
          Auto incrementing value. The counter won't reset after edits or if
          there are errors.
        </p>
        <p>Current value: {count}</p>
      </div>
      <hr className={styles.hr} />
      <div>
        <p>Component with state.</p>
        <ClickCount />
      </div>
      <hr className={styles.hr} />
      <div>
        <p>
          The button below will throw 2 errors. You'll see the error overlay to
          let you know about the errors but it won't break the page or reset
          your state.
        </p>
        <Button
          onClick={(e) => {
            setTimeout(() => document.parentNode(), 0);
            throwError();
          }}
        >
          Throw an Error
        </Button>
      </div>
      <hr className={styles.hr} />
    </main>
  );
}

export default Home;
