import { useState } from "react";
import { useCtx } from "../ctx";

import AddFriend from "./AddFriend";
import RevealTxt from "./animated/RevealTxt";

interface MenuProps {}

const Menu = ({}: MenuProps) => {
  const { ctx } = useCtx();
  const [showAddFriend, setShowAddFriend] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-8 shrink-0 py-4 px-8">
        <div>
          <RevealTxt txt="white rabbit" />
        </div>

        {/* Friends */}
        <div>
          <p>
            {ctx?.ip}:{ctx?.port}
          </p>
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
    </>
  );
};

export default Menu;
