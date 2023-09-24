// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { FusionSDK, NetworkEnum } from "@1inch/fusion-sdk";
import { NextResponse } from 'next/server';

export async function GET(req: any, res: NextApiResponse) {
  const fromTokenAddress = req.nextUrl.searchParams.get('fromTokenAddress')
  const toTokenAddress = req.nextUrl.searchParams.get('toTokenAddress')
  const amount = req.nextUrl.searchParams.get('amount')
    console.log(fromTokenAddress, toTokenAddress, amount)

  const sdk = new FusionSDK({
    url: "https://api.1inch.dev/fusion",
    network: NetworkEnum.ARBITRUM,
    authKey: process.env.NEXT_PUBLIC_1INCH_API_KEY,
  });

  try {
    const quote = await sdk.getQuote({
      fromTokenAddress: fromTokenAddress as string,
      toTokenAddress: toTokenAddress as string,
      amount: amount as string,
    })
    return NextResponse.json({ quote})
  } catch (error) {
    console.log(error)
    return NextResponse.json({})
  }
}
