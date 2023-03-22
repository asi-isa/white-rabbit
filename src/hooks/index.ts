import { useEffect, useState } from "react";
import { emit, listen } from "@tauri-apps/api/event";

import { useCtx } from "../ctx";
import { isIPv6 } from "is-ip";

export function useIncomingFriendRequest() {
  const [ipPort, setIpPort] = useState<{ ip: string; port: string }>({
    ip: null,
    port: null,
  });

  useEffect(() => {
    const unlistenFriendRequest = listen(
      "incomingFriendRequest",
      (event: { payload: { ip: string; port: string } }) => {
        setIpPort(event.payload);
      }
    );

    return () => {
      unlistenFriendRequest.then((unlisten) => unlisten());
    };
  }, []);

  return ipPort;
}

// TODO abstract
export function useOnFriendRequestAccepted() {
  const { ctx, updateCtx } = useCtx();

  useEffect(() => {
    const unlistenFriendRequestAccepted = listen(
      "friendRequestAck",
      (event: { payload: { ip: string; port: string } }) => {
        const friend = event.payload;

        // remove friend from pendingFriends
        const pendingFriends = ctx.pendingFriends.filter(
          (pendingFriend) => pendingFriend !== friend
        );

        // add to friends
        const friends = ctx.friends.slice();
        friends.push(friend);

        updateCtx({ pendingFriends, friends });
      }
    );

    return () => {
      unlistenFriendRequestAccepted.then((unlisten) => unlisten());
    };
  }, []);
}

export function useRequestOwnIpPort() {
  const { ctx, setCtx } = useCtx();
  // receive ip, port for
  // a display
  // b invoking friend_request

  useEffect(() => {
    // request ip, port if not set
    if (!ctx?.ip || !ctx?.port) {
      // TODO emits should be camelCase
      // TODO Rename addressReq
      emit("ip_port_req");
    }

    // TODO emits and corresponding responses should
    // have similar names
    // TODO Rename event addressRes
    const unlistenIpPortRequest = listen(
      "address",
      (event: { payload: { ip: string; port: string } }) => {
        const { ip, port } = event.payload;

        setCtx((currentCtx) => ({
          ...currentCtx,
          ip,
          port,
        }));
      }
    );

    return () => {
      unlistenIpPortRequest.then((unlisten) => unlisten());
    };
  }, []);
}

export function useListenForMsgs() {
  const { ctx, addMsg } = useCtx();

  const msgs = ctx.chat.get(ctx.currentChatFriend);

  // TODO abstract
  // TODO useListen(event, handler)
  useEffect(() => {
    const unlisten = listen(
      "rcv",
      (event: { payload: { msg: string; ip: string; port: string } }) => {
        let { ip, port, msg } = event.payload;
        ip = isIPv6(ip) ? `[${ip}]` : ip;

        console.log("recieved from", msg);

        addMsg(`${ip}:${port}:: ${msg}`, { ip, port });
      }
    );

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return msgs;
}
