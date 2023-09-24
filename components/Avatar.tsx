import Blockies from "@/utils/blockies";
import { useEffect, useMemo, useState } from "react";

type AvatarProps = {
  address?: string | null;
  url?: string;
};

export default function Avatar({ address, url }: AvatarProps) {
  const [blockieCanvas, setBlockieCanvas] = useState<any>(null);
  const [disable, setDisable] = useState(false);
  const fallbackUrl = "/cold-stash.png";

  useEffect(() => {
    if (address) {
      const blockie = new Blockies(address);
      const canvas = blockie.createCanvas(5);
      setBlockieCanvas(canvas);
      setDisable(false);
    }
  }, [address]);

  const _url = useMemo(() => {
    if (!address) {
      return fallbackUrl;
    } else if (disable && address) {
      return blockieCanvas?.toDataURL();
    }
    return url;
  }, [address, blockieCanvas, disable, url]);

  return (
    <img
      className="h-20 w-20 rounded-full ring-4 ring-white mt-8 mb-4"
      src={_url || fallbackUrl}
      // style={{
      //   backgroundImage: `url(${url}) center center / cover no-repeat`,
      // }}
      alt=""
      onError={() => setDisable(true)}
    />
  );
}
