import { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { invoke } from "@tauri-apps/api/tauri";

import Input from "./Input";
import { useCtx } from "../ctx";

interface AddFriendProps {
  show: boolean;
  onClose: () => void;
}

const AddFriend = ({ show, onClose }: AddFriendProps) => {
  const { ctx } = useCtx();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const elements = Array.from(e.currentTarget.elements) as HTMLInputElement[];
    // exlude submit button. i.e. last element
    const values = elements.slice(0, -1).map((field) => {
      return field.value;
    });

    const [ip, port] = values;

    // TODO validate ip, port import before continuing

    const from = { ip: ctx.ip, port: ctx.port };
    const to = { ip, port };

    // TODO close AddFriend, show success or error
    // TODO rename send_friend_request
    invoke("friend_request", { from, to })
      .then(() => console.log("request sent"))
      .catch((e) =>
        console.error("something went wrong, while invoking friend_request", e)
      );
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="absolute h-screen w-screen flex justify-center items-center"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur"
            onClick={onClose}
          />

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="absolute flex flex-col gap-3 border border-white/10 rounded-md p-4 bg-[var(--bg)] drop-shadow-[0_1px_4px_rgba(255,255,255,0.16)]"
          >
            {/* // TODO custom validation 
                type
                validation={(input: type) => boolean}              
            */}
            <Input title="IP" autofocus />
            <Input title="Port" />
            <input
              type="submit"
              value="Request"
              className="border border-[var(--color-muted)] hover:bg-[var(--color-muted)] transition-colors cursor-pointer px-4 py-1 rounded-md"
            />
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddFriend;
