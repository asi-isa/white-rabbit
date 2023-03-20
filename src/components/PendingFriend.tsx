import { FriendType, useCtx } from "../ctx";

interface Props {
  friend: FriendType;
}

const PendingFriend = ({ friend }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <p>
        {friend.ip}:{friend.port}
      </p>

      <div className="w-1 aspect-square bg-yellow-300/80 rounded-full" />
    </div>
  );
};

export default PendingFriend;
