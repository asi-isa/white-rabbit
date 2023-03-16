import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type GlobalCtxData = {
  ip: string;
  port: string;
};

type GlobalCtxType = {
  ctx: GlobalCtxData;
  setCtx: Dispatch<SetStateAction<GlobalCtxData>>;
};

const GlobalCtx = createContext<GlobalCtxType>(null);

export const useCtx = () => useContext(GlobalCtx);

interface Props {
  children: ReactNode;
}

export default function GlobalCtxProvider({ children }: Props) {
  const [ctx, setCtx] = useState<GlobalCtxData>(null);

  return (
    <GlobalCtx.Provider value={{ ctx, setCtx }}>{children}</GlobalCtx.Provider>
  );
}
