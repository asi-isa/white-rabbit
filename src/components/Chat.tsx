import { useListenForMsgs } from "../hooks";

import RevealTxt from "./animated/RevealTxt";
import MessageInput from "./MessageInput";

interface ChatProps {}

const Chat = ({}: ChatProps) => {
  const msgs = useListenForMsgs();

  return (
    <div className="h-screen w-full flex flex-col justify-end gap-4 p-3">
      {msgs && (
        <div>
          {msgs.map((msg, i) => {
            // animate last element
            if (i === msgs.length - 1) {
              return <RevealTxt key={i} txt={msg} />;
            }

            return <p key={i}>{msg}</p>;
          })}
        </div>
      )}

      <MessageInput />
    </div>
  );
};

export default Chat;
