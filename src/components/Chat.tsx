import { useState, useEffect } from "react";
import { listen } from "@tauri-apps/api/event";

import RevealTxt from "./animated/RevealTxt";
import MessageInput from "./MessageInput";

interface ChatProps {}

const Chat = ({}: ChatProps) => {
  const [msgs, setMsgs] = useState<string[]>(["Wake up", "Nice"]);

  useEffect(() => {
    const unlisten = listen("rcv", (e) => {
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
          // animate last element
          if (i === msgs.length - 1) {
            return <RevealTxt key={i} txt={msg} />;
          }

          return <p key={i}>{msg}</p>;
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default Chat;
