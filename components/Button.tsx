type ButtonProps = {
  disabled?: boolean;
  text?: string;
};

export default function Button({ disabled, text }: ButtonProps) {
  return (
    <button
      className="bg-black hover:bg-white hover:text-black text-white rounded-full py-4 px-10"
      type="submit"
      disabled={disabled}
    >
      {text}
    </button>
  );
}
