import { useState } from "react";

import AddFriend from "./AddFriend";

interface MenuProps {}

const Menu = ({}: MenuProps) => {
  const [showAddFriend, setShowAddFriend] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-8 shrink-0 py-4 px-8">
        <div>
          <p>white rabbit</p>
        </div>

        {/* Friends */}
        <div>
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
