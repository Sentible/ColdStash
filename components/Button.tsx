type ButtonProps = {
  disabled?: boolean;
  onClick?: () => void;
  text?: string;
  opaque?: boolean;
};

export default function Button({
  onClick,
  disabled,
  text,
  opaque = false,
}: ButtonProps) {
  return opaque ? (
    <button
      className="bg-purple-400 opacity-75 hover:bg-white hover:text-black text-white rounded-full py-4 px-10"
      type="submit"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  ) : (
    <button
      className="bg-black hover:bg-white hover:text-black text-white rounded-full py-4 px-10"
      type="submit"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
