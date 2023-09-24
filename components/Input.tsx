type InputProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function Input({ handleChange, placeholder }: InputProps) {
  return (
    <input
      className="border-2 rounded-lg p-4 my-8 w-full"
      placeholder={placeholder}
      name="coldWallet"
      onChange={handleChange}
    ></input>
  );
}
