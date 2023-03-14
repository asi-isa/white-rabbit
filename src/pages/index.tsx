import { useEffect } from "react";

import Chat from "../components/Chat";
import Divider from "../components/Divider";
import Menu from "../components/Menu";
import { useIncomingFriendRequest, useRequestOwnIpPort } from "../hooks";

function App() {
  useRequestOwnIpPort();

  const incomingFriendRequest = useIncomingFriendRequest();

  useEffect(() => {
    const { ip, port } = incomingFriendRequest;

    if (ip !== null && port !== null) {
      console.log("got friend request from ", incomingFriendRequest);
      console.log("show popup");
    }
  }, [incomingFriendRequest]);

  return (
    <div className="flex">
      <Menu />

      <Divider />

      <Chat />
    </div>
  );
}

export default App;
