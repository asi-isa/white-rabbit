interface DividerProps {
  direction?: "horizontal" | "vertical";
}

const Divider = ({ direction = "vertical" }: DividerProps) => {
  return (
    <div
      className={`${
        direction === "vertical" ? "h-screen w-[1px]" : "w-full h-[1px]"
      } shrink-0 bg-[var(--color)] opacity-10`}
    />
  );
};

export default Divider;
