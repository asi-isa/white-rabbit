interface InputProps {
  title: string;
  autofocus?: boolean;
}

const Input = ({ title, autofocus = false }: InputProps) => {
  return (
    <div className="flex gap-2 justify-between items-center">
      <p className="">{title}:</p>

      <input
        className="bg-[var(--bg-muted)] text-center rounded-md "
        name={title}
        required
        autoFocus={autofocus}
        type="text"
      />
    </div>
  );
};

export default Input;
