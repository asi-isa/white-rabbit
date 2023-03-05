import { FormEvent, useState } from "react";
import { TbSend } from "react-icons/tb";

interface MessageInputProps {}

const MessageInput = ({}: MessageInputProps) => {
  const [msg, setMsg] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("msg", msg);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-3 p-1 bg-[var(--bg-muted)] rounded-md"
    >
      <input
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.currentTarget.value)}
        className="w-full bg-transparent outline-none p-1"
      />

      <button className="px-3">
        <TbSend />
      </button>
    </form>
  );
};

export default MessageInput;
