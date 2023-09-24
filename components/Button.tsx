type ButtonProps = {
  text?: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button className="bg-black hover:bg-white hover:text-black text-white rounded-full p-4 w-1/5" type='submit'>
      {text}
    </button>
  );
}
