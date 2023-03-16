import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type FriendType = { ip: string; port: string };

type GlobalCtxData = {
  ip: string;
  port: string;
  friends: FriendType[];
};

const InitialCtxData = { ip: "", port: "", friends: [] as FriendType[] };

type GlobalCtxType = {
  ctx: GlobalCtxData;
  setCtx: Dispatch<SetStateAction<GlobalCtxData>>;
  addFriend: (friend: FriendType) => void;
};

const GlobalCtx = createContext<GlobalCtxType>(null);

export const useCtx = () => useContext(GlobalCtx);

interface Props {
  children: ReactNode;
}

export default function GlobalCtxProvider({ children }: Props) {
  const [ctx, setCtx] = useState<GlobalCtxData>(InitialCtxData);

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

  return (
    <GlobalCtx.Provider value={{ ctx, setCtx, addFriend }}>
      {children}
    </GlobalCtx.Provider>
  );
}
