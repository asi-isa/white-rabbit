import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type FriendType = { ip: string; port: string };

type CtxData = {
  ip: string;
  port: string;
  friends: FriendType[];
  currentChatFriend: FriendType | null;
};

const InitialCtxData: CtxData = {
  ip: "",
  port: "",
  friends: [] as FriendType[],
  currentChatFriend: null,
};

type CtxType = {
  ctx: CtxData;
  setCtx: Dispatch<SetStateAction<CtxData>>;
  updateCtx: (partialCtx: Partial<CtxData>) => void;
  addFriend: (friend: FriendType) => void;
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

  return (
    <Ctx.Provider value={{ ctx, setCtx, updateCtx, addFriend }}>
      {children}
    </Ctx.Provider>
  );
}
