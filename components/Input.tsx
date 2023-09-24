type InputProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  type?: string;
  value?: string | number;
};

export default function Input({ handleChange, placeholder, name, type, value}: InputProps) {
  return (
    <input
      className="border-2 rounded-lg p-4 my-8 w-full"
      placeholder={placeholder}
      name={name}
      onChange={handleChange}
      type={type}
      value={value}
    ></input>
  );
}
