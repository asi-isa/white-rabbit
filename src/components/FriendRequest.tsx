import Modal from "./Modal";
import Card from "./animated/Card";
import Btn from "./Btn";
import { useCtx } from "../ctx";
import { invoke } from "@tauri-apps/api/tauri";
import { isIPv6 } from "is-ip";

interface FriendRequestProps {
  show: boolean;
  onClose: () => void;
  address: { ip: string; port: string };
}

// TODO rename prop address
const FriendRequest = ({ show, onClose, address }: FriendRequestProps) => {
  const { ctx, addFriend } = useCtx();

  function onAccept() {
    addFriend(address);

    let { ip, port } = address;
    // add [] to IPv6 addresses
    ip = isIPv6(ip) ? `[${ip}]` : ip;

    invoke("accept_friend_request", {
      from: { ip: ctx.ip, port: ctx.port },
      to: { ip, port },
    })
      .then(() => {
        console.log("be sent friend req ack");
      })
      .catch((e) => {
        console.log(e);

        console.log("something went wrong while sending friend request ack");
      });

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
