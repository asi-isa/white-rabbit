import Modal from "./Modal";
import Card from "./animated/Card";
import Btn from "./Btn";

interface FriendRequestProps {
  show: boolean;
  onClose: () => void;
  address: { ip: string; port: string };
}

const FriendRequest = ({ show, onClose, address }: FriendRequestProps) => {
  function onAccept() {
    console.log(
      "friend request accepted => put on friend list, send ack, close modal"
    );
  }

  function onDeny() {}
  return (
    <Modal show={show} onBlur={onClose}>
      <Card title="Incoming Friend Request" onClose={onClose}>
        <div className="flex flex-col gap-6">
          <p>
            {address?.ip}:{address?.port} wants to be your friend.
          </p>

          <div className="flex gap-3 self-end">
            <Btn title="Deny" onClick={onDeny} />
            <Btn title="Accept" onClick={onAccept} />
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default FriendRequest;
