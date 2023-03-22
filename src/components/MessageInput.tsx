import { FormEvent, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { isIPv6 } from "is-ip";
import { TbSend } from "react-icons/tb";

import { useCtx } from "../ctx";

interface MessageInputProps {}

const MessageInput = ({}: MessageInputProps) => {
  const { ctx, addMsg } = useCtx();

  const [msg, setMsg] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let { ip, port } = ctx.currentChatFriend;
    // TODO abstract with IP type
    ip = isIPv6(ip) ? `[${ip}]` : ip;

    const to = { ip, port };
    const from = { ip: ctx.ip, port: ctx.port };

    invoke("send", { msg, to, from })
      .then(() => {
        addMsg(`${from.ip}:${from.port}::${msg}`, to);
        setMsg("");
      })
      .catch((e) => {
        console.log(e);

        console.log("error while sending msg");
      });
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
