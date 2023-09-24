type ButtonProps = {
  disabled?: boolean;
  text?: string;
};

export default function Button({ disabled, text }: ButtonProps) {
  return (
    <button disabled={disabled} className="bg-black hover:bg-white hover:text-black text-white rounded-full p-4 w-1/5" type='submit'>
      {text}
    </button>
  );
}
