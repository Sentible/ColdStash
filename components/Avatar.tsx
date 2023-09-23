type AvatarProps = {
  url?: string;
};

export default function Avatar({ url }: AvatarProps) {
  const fallbackUrl = "/cold-stash.png";
  return (
    <img
      className="h-20 w-20 rounded-full ring-4 ring-white mt-8 mb-4"
      src={url || fallbackUrl}
      alt="avatar"
    />
  );
}
