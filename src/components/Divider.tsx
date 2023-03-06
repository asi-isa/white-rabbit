interface DividerProps {}

const Divider = ({}: DividerProps) => {
  return (
    <div className="h-screen w-[1px] shrink-0 bg-[var(--color)] opacity-10 " />
  );
};

export default Divider;
