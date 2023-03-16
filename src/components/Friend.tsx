import { FriendType, useCtx } from "../ctx";

interface FriendProps {
  friend: FriendType;
}

const Friend = ({ friend }: FriendProps) => {
  const { updateCtx } = useCtx();

  function setCurrentChatFriend() {
    updateCtx({ currentChatFriend: friend });
  }

  return (
    <div className="cursor-pointer" onClick={setCurrentChatFriend}>
      <p>
        {friend.ip}:{friend.port}
      </p>
    </div>
  );
};

export default Friend;
