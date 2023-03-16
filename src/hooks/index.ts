import { useEffect, useState } from "react";
import { emit, listen } from "@tauri-apps/api/event";

import { useCtx } from "../ctx";

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