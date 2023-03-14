import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { invoke } from "@tauri-apps/api/tauri";
import { isIP, isIPv6 } from "is-ip";

import Modal from "./Modal";
import Input from "./Input";
import { useCtx } from "../ctx";
import { isPort } from "../util";

interface AddFriendProps {
  show: boolean;
  onClose: () => void;
}

const AddFriend = ({ show, onClose }: AddFriendProps) => {
  const { ctx } = useCtx();

  const [error, setError] = useState({ ip: false, port: false });
  const [requestStatus, setRequestStatus] = useState({ error: false, msg: "" });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const elements = Array.from(e.currentTarget.elements) as HTMLInputElement[];
    // exlude submit button. i.e. last element
    const values = elements.slice(0, -1).map((field) => {
      return field.value;
    });

    let [ip, port] = values;

    const isValidIP = isIP(ip);
    const isValidPort = isPort(port);

    setError({ ip: !isValidIP, port: !isValidPort });

    if (!isValidIP || !isValidPort) {
      return;
    }

    // add [] to IPv6 addresses
    ip = isIPv6(ip) ? `[${ip}]` : ip;

    const from = { ip: ctx.ip, port: ctx.port };
    const to = { ip, port };

    // TODO close AddFriend, show success or error
    // TODO rename send_friend_request
    invoke("friend_request", { from, to })
      .then(() => {
        setRequestStatus({ error: false, msg: "Successfully sent request" });
      })
      .catch((e) => {
        setRequestStatus({ error: true, msg: "Something went wrong" });
      });
  }

  return (
    <>
      <Modal
        show={show}
        onBlur={() => {
          setError({ ip: false, port: false });
          setRequestStatus({ error: false, msg: "" });
          onClose();
        }}
      >
        {!requestStatus.msg && (
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="absolute flex flex-col gap-3 border border-white/10 rounded-md p-4 bg-[var(--bg)] drop-shadow-[0_1px_4px_rgba(255,255,255,0.16)]"
          >
            <Input title="IP" autofocus />
            {error.ip && <p>please provide a valid ip.</p>}

            <Input title="Port" />
            {error.port && <p>please provide a valid port.</p>}

            <input
              type="submit"
              value="Request"
              className="border border-[var(--color-muted)] hover:bg-[var(--color-muted)] transition-colors cursor-pointer px-4 py-1 rounded-md"
            />
          </motion.form>
        )}

        {requestStatus.msg && (
          // TODO extract to Card Component
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="absolute flex flex-col gap-3 border border-white/10 rounded-md p-4 bg-[var(--bg)] drop-shadow-[0_1px_4px_rgba(255,255,255,0.16)]"
          >
            {/* TODO if error try again or close btn */}
            {/* TODO else close btn */}
            {/* TODO lottiefiles */}
            <p>{requestStatus.msg}</p>
          </motion.div>
        )}
      </Modal>
    </>
  );
};

export default AddFriend;
