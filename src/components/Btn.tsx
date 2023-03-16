interface BtnProps {
  title: string;
  onClick: () => void;
}

const Btn = ({ title, onClick }: BtnProps) => {
  return (
    <p
      className="border border-white/10 py-1 px-2 rounded-md self-end cursor-pointer"
      onClick={onClick}
    >
      {title}
    </p>
  );
};

export default Btn;
