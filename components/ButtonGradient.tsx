type ButtonGradientProps = {
  text?: string;
};

export default function ButtonGradient({ text }: ButtonGradientProps) {
  return (
    <button
      className="bg-black hover:bg-gradient-to-r from-lime-200 via-yellow-200 to-purple-200 hover:text-black text-white rounded-full py-4 px-10 w-full"
      type="button"
    >
      {text}
    </button>
  );
}
