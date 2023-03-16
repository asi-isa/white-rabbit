import { useEffect, useState } from "react";

import { useCtx } from "../ctx";
import { useIncomingFriendRequest } from "../hooks";

import AddFriend from "./AddFriend";
import RevealTxt from "./animated/RevealTxt";
import FriendRequest from "./FriendRequest";

interface MenuProps {}

const Menu = ({}: MenuProps) => {
  const { ctx } = useCtx();

  const [showAddFriend, setShowAddFriend] = useState(false);
  const [incomingFriendRequest, setIncomingFriendRequest] = useState(null);

  const { ip, port } = useIncomingFriendRequest();

  console.log({ incomingFriendRequest });

  useEffect(() => {
    if (ip !== null && port !== null) {
      setIncomingFriendRequest({ ip, port });

      // TODO accept => add ip, port to friend list
    }
  }, [ip, port]);

  return (
    <>
      <div className="flex flex-col gap-8 shrink-0 py-4 px-8">
        <div>
          <RevealTxt txt="white rabbit" />
        </div>

        <div>
          <p>
            {ctx?.ip}:{ctx?.port}
          </p>
          {/* Friends */}
          <p>Venice Base</p>
          <p>Base Venice</p>

          <div
            className="mt-3 cursor-pointer"
            onClick={() => setShowAddFriend(true)}
          >
            <p>+ add friend</p>
          </div>
        </div>

        <div className="mt-auto">
          <p>settings</p>
        </div>
      </div>

      <AddFriend show={showAddFriend} onClose={() => setShowAddFriend(false)} />

      <FriendRequest
        show={incomingFriendRequest !== null}
        onClose={() => setIncomingFriendRequest(null)}
        address={incomingFriendRequest}
      />
    </>
  );
};

export default Menu;
