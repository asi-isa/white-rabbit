import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { isIPv6 } from "is-ip";

import HashMap from "../util/HashMap";

// TODO FriendType { addr: Address, name: string }
// TODO Address: {ip: IP, port: Port}
// no strings
export type FriendType = { ip: string; port: string };

function friendTypeHashFn(friend: FriendType) {
  if (!friend) return "";

  const ip = isIPv6(friend.ip) ? `[${friend.ip}]` : friend.ip;

  return ip + friend.port;
}

type CtxData = {
  ip: string;
  port: string;
  friends: FriendType[];
  pendingFriends: FriendType[];
  currentChatFriend: FriendType | null;
  // TODO cleary show, who the sender/author of the msg is
  // TODO HashMap<FriendType, { author: FriendType, msg: string }[]>
  // TODO update fn accordingly
  chat: HashMap<FriendType, string[]>;
};

const InitialCtxData: CtxData = {
  ip: "",
  port: "",
  friends: [] as FriendType[],
  pendingFriends: [] as FriendType[],
  currentChatFriend: null,
  chat: new HashMap(friendTypeHashFn),
};

type CtxType = {
  ctx: CtxData;
  setCtx: Dispatch<SetStateAction<CtxData>>;
  updateCtx: (partialCtx: Partial<CtxData>) => void;
  addFriend: (friend: FriendType) => void;
  addMsg: (msg: string, friend: FriendType) => void;
};

const Ctx = createContext<CtxType>(null);

export const useCtx = () => useContext(Ctx);

interface Props {
  children: ReactNode;
}

export default function CtxProvider({ children }: Props) {
  const [ctx, setCtx] = useState<CtxData>(InitialCtxData);

  console.log(ctx);

  function addFriend(friend: FriendType) {
    // save friend in localstorage
    // const friendsStr = window.localStorage.getItem("friends") ?? "[]";

    // const friends: typeof address[] = JSON.parse(friendsStr);

    // friends.push(address);

    // window.localStorage.setItem("friends", JSON.stringify(friends));

    setCtx((currentCtx) => {
      currentCtx.friends.push(friend);

      return currentCtx;
    });
  }

  function updateCtx(partialCtx: Partial<CtxData>) {
    setCtx((currentCtx) => ({
      ...currentCtx,
      ...partialCtx,
    }));
  }

  function addMsg(msg: string, friend: FriendType) {
    if (!ctx.chat.has(friend)) {
      ctx.chat.set(friend, [msg]);
    } else {
      ctx.chat.set(friend, [...ctx.chat.get(friend), msg]);
    }

    updateCtx({ chat: ctx.chat });
  }

  return (
    <Ctx.Provider value={{ ctx, setCtx, updateCtx, addFriend, addMsg }}>
      {children}
    </Ctx.Provider>
  );
}
