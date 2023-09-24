type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="w-auto 2xl:w-2/5 flex flex-col place-items-center shadow-md rounded-3xl py-11 px-7 m-auto bg-gradient-to-r from-lime-200 via-yellow-200 to-purple-200">
      {children}
    </div>
  );
}
