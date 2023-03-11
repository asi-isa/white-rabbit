import { listen, emit } from "@tauri-apps/api/event";
import { useEffect } from "react";
import Chat from "../components/Chat";
import Divider from "../components/Divider";
import Menu from "../components/Menu";
import { useCtx } from "../ctx";

function App() {
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

    const unlistenFriendRequestReponse = listen(
      "friendRequest",
      (event: { payload: { ip: string; port: string } }) => {
        // TODO show friend request, accept, block deny
        // accept => add ip, port to friend list
        let { ip, port } = event.payload;
        console.log(
          "received friend request, forewarded to frontend",
          ip,
          port
        );
      }
    );

    return () => {
      unlistenIpPortRequest.then((unlisten) => unlisten());
      unlistenFriendRequestReponse.then((unlisten) => unlisten());
    };
  }, []);

  return (
    <div className="flex">
      <Menu />

      <Divider />

      <Chat />
    </div>
  );
}

export default App;
