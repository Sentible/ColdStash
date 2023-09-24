export const COLD_STASH_CONTRACTS = {
  goerli: '0x1c2a6375d981E25DaEd017A7C66d6C8E50D451C7',
  arbi: '0x060f7b972ae0196a82626ce2367b55693d9e656b'
} as const;

export const getShortenName = (address?: string) => {
  if (address) {
    const pod1 = address.slice(0, 6);
    const pod2 = address.slice(address.length - 4);
    return `${pod1}...${pod2}`;
  }
  return "";
};