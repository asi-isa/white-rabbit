import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";

import MessageInput from "../components/MessageInput";

function App() {
  const [msgs, setMsgs] = useState<string[]>([]);

  useEffect(() => {
    const unlisten = listen("rcv", (e) => {
      console.log(e);
      console.log(e.payload);
      const author = Math.random() > 0.5 ? "green" : "blue";

      setMsgs((currentMsgs) => {
        const newMsgs = `${author}: ${e.payload}`;
        console.log("newMsgs", newMsgs);

        return [...currentMsgs, `${author}: ${(e.payload as any).message}`];
      });
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return (
    <div className="h-screen flex flex-col justify-end gap-4 p-3">
      <div>
        {msgs.map((msg, i) => {
          return <p key={i}>{msg}</p>;
        })}
      </div>

      <MessageInput />
    </div>
  );
}

export default App;
