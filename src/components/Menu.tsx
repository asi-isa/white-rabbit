import { useEffect, useState } from "react";

import { useCtx } from "../ctx";
import { useIncomingFriendRequest } from "../hooks";

import AddFriend from "./AddFriend";
import RevealTxt from "./animated/RevealTxt";
import Friend from "./Friend";
import FriendRequest from "./FriendRequest";

interface MenuProps {}

const Menu = ({}: MenuProps) => {
  const { ctx } = useCtx();

  const [showAddFriend, setShowAddFriend] = useState(false);
  const [incomingFriendRequest, setIncomingFriendRequest] = useState(null);

  // TODO ip, port, name
  const { ip, port } = useIncomingFriendRequest();

  useEffect(() => {
    if (ip !== null && port !== null) {
      setIncomingFriendRequest({ ip, port });
    }
  }, [ip, port]);

  return (
    <>
      <div className="flex flex-col gap-8 shrink-0 py-4 px-8">
        <div>
          <RevealTxt txt="white rabbit" />
        </div>

        <div className="flex flex-col gap-3">
          <p>
            {ctx.ip}:{ctx.port}
          </p>

          <div className="flex flex-col gap-2">
            {ctx.friends.map((friend, i) => {
              return <Friend key={friend.port + i} friend={friend} />;
            })}
          </div>

          <div
            className="cursor-pointer"
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
