import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { invoke } from "@tauri-apps/api/tauri";
import { isIP, isIPv6 } from "is-ip";

import Modal from "./Modal";
import Input from "./Input";
import { useCtx } from "../ctx";
import { isPort } from "../util";
import Result, { ResultType } from "./Result";

interface AddFriendProps {
  show: boolean;
  onClose: () => void;
}

const AddFriend = ({ show, onClose }: AddFriendProps) => {
  const { ctx, updateCtx } = useCtx();

  // TODO formState => convinience(prefill form when tryAgain or when closed accidentaly), validate while typing
  const [error, setError] = useState({ ip: false, port: false });
  const initialResponseResult: ResultType = { error: false, msg: "" };
  const [responseResult, setResponseResult] = useState<ResultType>(
    initialResponseResult
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // TODO abstract to util::form.getValues(e) function
    // getFormElements(e) => []
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

    // TODO rename send_friend_request
    invoke("send_friend_request", { from, to })
      .then(() => {
        // add pending friend = friend request sent but not yet accepted
        const pendingFriends = ctx.pendingFriends.slice(); // copy
        pendingFriends.push(to);
        updateCtx({ pendingFriends });

        setResponseResult({ error: false, msg: "Successfully sent request." });
      })
      .catch((e) => {
        setResponseResult({ error: true, msg: "Something went wrong." });
      });
  }

  function _onClose() {
    setError({ ip: false, port: false });
    setResponseResult(initialResponseResult);
    onClose();
  }

  return (
    <>
      <Modal show={show} onBlur={_onClose}>
        {!responseResult.msg && (
          // TODO add title
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

            {/* TODO loading indicator */}
            <input
              type="submit"
              value="Request"
              className="border border-[var(--color-muted)] hover:bg-[var(--color-muted)] transition-colors cursor-pointer px-4 py-1 rounded-md"
            />
          </motion.form>
        )}

        {responseResult.msg && (
          <Result
            result={responseResult}
            onClose={_onClose}
            onTryAgain={() => setResponseResult(initialResponseResult)}
          />
        )}
      </Modal>
    </>
  );
};

export default AddFriend;
