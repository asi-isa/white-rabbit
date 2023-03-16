import Modal from "./Modal";
import Card from "./animated/Card";
import Btn from "./Btn";
import { useCtx } from "../ctx";

interface FriendRequestProps {
  show: boolean;
  onClose: () => void;
  address: { ip: string; port: string };
}

// TODO rename prop address
const FriendRequest = ({ show, onClose, address }: FriendRequestProps) => {
  const { addFriend } = useCtx();

  function onAccept() {
    addFriend(address);

    // TODO send ack

    onClose();
  }

  return (
    <Modal show={show} onBlur={onClose}>
      <Card title="Incoming Friend Request" onClose={onClose}>
        <div className="flex flex-col gap-6">
          <p>
            {address?.ip}:{address?.port} wants to be your friend.
          </p>

          <div className="flex gap-3 self-end">
            <Btn title="Deny" onClick={onClose} />
            <Btn title="Accept" onClick={onAccept} />
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default FriendRequest;
